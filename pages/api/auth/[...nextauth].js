import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase, findOneDocumentByEmail } from "../../../lib/db";

export default NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      if (token?.roles) session.user.roles = token.roles;

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      if (user?.roles) token.roles = user.roles;
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const user = await findOneDocumentByEmail(
          client,
          "users",
          credentials.email
        );

        if (!user) {
          client.close();
          throw new Error("¡Usuario no encontrado!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("¡Clave incorrecta!. No se pudo iniciar sesión");
        }

        client.close();

        return user;
      },
    }),
  ],
});
