import { getSession } from "next-auth/react";

import { hashPassword, verifyPassword } from "../../../lib/auth";
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
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ id: userId });

  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Contraseña incorrecta." });
    client.close();
    return;
  }
  if (!newPassword || newPassword.trim().length < 7) {
    res.status(422).json({
      message: "La contraseña debe tener al menos 7 caracteres.",
    });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { id: userId },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "¡Contraseña actualizada!" });
}

export default handler;
