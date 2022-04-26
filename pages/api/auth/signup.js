import { hashPassword } from "../../../lib/auth";
import {
  connectToDatabase,
  findOneDocumentByEmail,
  insertOne,
} from "../../../lib/db";
import { uuid } from "uuidv4";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "La contraseña debe tener al menos 7 caracteres.",
    });
    return;
  }

  const client = await connectToDatabase();

  const existingUser = await findOneDocumentByEmail(client, "users", email);

  if (existingUser) {
    res.status(422).json({ message: "El usuario ya existe!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await insertOne(client, "users", {
    id: uuid(),
    email: email,
    password: hashedPassword,
    roles: "user",
  });

  res.status(201).json({ message: "Usuario creado!" });
  client.close();
}

export default handler;
