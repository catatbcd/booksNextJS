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
  const id= req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const roles = req.body.roles;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ id: userId });

  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado." });
    client.close();
    return;
  }

  const result = await usersCollection.updateOne(
    { id:id },
    { $set: { name: name,  email: email, roles:roles } }
  );

  client.close();
  res.status(200).json({ message: "¡Usuario actualizado!" });
}

export default handler;
