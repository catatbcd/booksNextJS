import { useEffect, useState } from "react";
import BooksGrid from "../../components/books/books-grid";

function BooksPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      fetch("/api/books")
        .then((response) => response.json())
        .then((data) => {
          setData(data.books);
          setIsLoading(!isLoading);
        });
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Catalogo de libros</h1>
      <BooksGrid books={data} />
    </div>
  );
}

export default BooksPage;
