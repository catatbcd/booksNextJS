import { connectToDatabase, findOneDocument, findOneAndDelete } from "../../../lib/db";
async function handler(req, res) {
  const userId = req.query.userId;
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "conexion a la base de datos fallida." });
    return;
  }
 const usersCollection = client.db().collection("users");
  if (req.method === "PATCH") {
    const id = req.body.id;
  const name = req.body.name;
  const roles = req.body.roles;
  const email = req.body.email;


    const user = await usersCollection.findOne({ id: id });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      client.close();
      return;
    }
    try {
      const result = await usersCollection.updateOne(
        { id: userId },
        { $set: { name: name, email: email, roles: roles } }
      );
    res.status(200).json({ message: "¡usuario actualizado!" });
    }
    catch{
      res.status(500).json({ message: " Error al actualizar datos del usuario." });
    }
  
    
  }
  if(req.method==="DELETE"){
    try {
      const document = await findOneAndDelete(client, "users", userId);
      res.status(200).json({ message: "Usuario Eliminado" });
    } catch {
      res.status(500).json({ message: " Error al eliminar datos del usuario." });
    }

  }
  client.close();
}

export default handler;
