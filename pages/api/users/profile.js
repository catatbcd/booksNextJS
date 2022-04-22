import { connectToDatabase, findOneDocument } from "../../../lib/db";

async function handler(req, res) {
  const userId = req.query.userId;
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "conexion a la base de datos fallida." });
    return;
  }

  if (req.method === "POST") {
    try {
      const data = req.body;

      const { id } = data;
      const document = await findOneDocument(client, "users", id);
      res.status(200).json({ user: document });
    } catch {
      res
        .status(500)
        .json({ message: " Error al obtener los datos de usuario." });
    }
  }

  client.close();
}

export default handler;
