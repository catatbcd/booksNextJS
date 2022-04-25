import { connectToDatabase, getAllDocuments, insertOne } from "../../../lib/db";
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
      const documents = await getAllDocuments(client, "books", { title: 1 });
      res.status(200).json({ books: documents });
    } catch {
      res.status(500).json({ message: " Error al obtener comentarios." });
    }
  }
  if (req.method === "POST") {
    const title = req.body.title;
    const isbn = req.body.isbn;
    const pageCount = parseInt(req.body.pageCount);
    const publishedDate = new Date(req.body.publishedDate);
    const thumbnailUrl = req.body.thumbnailUrl;
    const shortDescription = req.body.shortDescription;
    const longDescription = req.body.longDescription;
    const authors = req.body.authors;
    const categories = req.body.categories;

    const booksCollection = client.db().collection("books");
    let newId = Math.floor(Math.random() * (10000 - 1 + 1) + 1);

    const id = await booksCollection.findOne({ id: newId });
    if (id) {
      newId = Math.floor(Math.random() * (10000 - 1 + 1) + 1);
    }
    const data = {
      id: newId,
      title: title,
      isbn: isbn,
      pageCount: pageCount,
      publishedDate: publishedDate,
      thumbnailUrl: thumbnailUrl,
      shortDescription: shortDescription,
      longDescription: longDescription,
      authors: authors,
      categories: categories,
    };
    try {
      const documents = await insertOne(client, "books", data);

      res
        .status(200)
        .json({ books: documents, id: newId, message: "¡Libro agregado!" });
    } catch {
      res.status(500).json({ message: " Error al agregar libro." });
    }
  }

  client.close();
}

export default handler;
