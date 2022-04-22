import { getSession } from "next-auth/react";

import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "¡No autenticado!" });
    return;
  }

  const userId = session.user.id;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const foto = req.body.foto;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ id: userId });

  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado." });
    client.close();
    return;
  }

  const result = await usersCollection.updateOne(
    { id: userId },
    { $set: { name: name, lastName: lastName, email: email, foto: foto } }
  );

  client.close();
  res.status(200).json({ message: "¡Perfil actualizado!" });
}

export default handler;
