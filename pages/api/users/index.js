import { connectToDatabase, getAllDocuments } from "../../../lib/db";
async function handler(req, res) {
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
      res.status(500).json({ message: " Error al obtener los usuarios." });
    }
  }
  if (req.method === "PATCH") {
    const idBook = req.body.idBook;
    const idUSer = req.body.idUser;
   

    const usersCollection = client.db().collection("users");

  
    try {
    const result = await usersCollection.updateOne(
      { id: idUSer },
      {
        $push: {
          favorites: idBook

        },
      }
    );
    res.status(200).json({ message: "¡Libro añadido a favoritos!" });
    }
    catch{
      res.status(500).json({ message: " Error al añadir a favoritos." });
    }
  
    
  }

  client.close();
}

export default handler;
