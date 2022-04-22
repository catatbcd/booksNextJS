import { connectToDatabase, findOneDocument } from "../../../lib/db";
async function handler(req, res) {
  const bookId = parseInt(req.query.bookId);
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "conexion a la base de datos fallida." });
    return;
  }

  if (req.method === "GET") {
    try {
      const document = await findOneDocument(client, "books", bookId, {
        title: 1,
      });
      res.status(200).json({ book: document, bookId: bookId });
    } catch {
      res.status(500).json({ message: " Error al obtener datos del libro." });
    }
  }
  if (req.method === "PATCH") {
    const title = req.body.title;
    const isbn = req.body.isbn;
    const pageCount = parseInt(req.body.pageCount);
    const publishedDate = req.body.publishedDate;
    const thumbnailUrl = req.body.thumbnailUrl;
    const shortDescription = req.body.shortDescription;
    const longDescription = req.body.longDescription;
    const status = req.body.status;
    const authors = req.body.authors;
    const categories = req.body.categories;

    const booksCollection = client.db().collection("books");

    const book = await booksCollection.findOne({ id: bookId });

    if (!book) {
      res.status(404).json({ message: "Libro no encontrado." });
      client.close();
      return;
    }

    const result = await booksCollection.updateOne(
      { id: bookId },
      {
        $set: {
          title: title,
          isbn: isbn,
          pageCount: pageCount,
          publishedDate: { $date: publishedDate },
          thumbnailUrl: thumbnailUrl,
          shortDescription: shortDescription,
          longDescription: longDescription,
          authors: authors,
          categories: categories

        },
      }
    );

    client.close();
    res.status(200).json({ message: "¡Libro actualizado!" });
    try {
      const document = await findOneDocument(client, "books", bookId);
      res.status(200).json({ book: document, bookId: bookId });
    } catch {
      res.status(500).json({ message: " Error al obtener datos del libro." });
    }
  }
  client.close();
}

export default handler;
