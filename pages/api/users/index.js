import { connectToDatabase, getAllDocuments } from "../../../lib/db";
async function handler(req, res){
    let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "conexion a la base de datos fallida." });
    return;
  }
  if (req.method === "GET") {
    try {
    const documents = await getAllDocuments(client, "users", { _id: -1 });
      res.status(200).json({ users: documents });
    } catch {
      res.status(500).json({ message: " Error al obtener comentarios." });
    }
  }
  client.close();

}

export default handler;