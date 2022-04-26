import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BooksGrid from "../../components/books/books-grid";
import BookAdd from "../../components/books/CRUD/book-add";
import Button from "../../components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";

async function handlerAdd(bookData) {
  const response = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify(bookData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "¡Algo salió mal!");
  }

  return data;
}
function BooksPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addBook, setAddBook] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (result) {
      toast.success(result);
    }

    if (error) {
      toast.error(error);
    }
    if (isLoading) {
      fetch("/api/books")
        .then((response) => response.json())
        .then((data) => {
          setData(data.books);
          setIsLoading(!isLoading);
        });
    }
  }, [data, isLoading]);
  function handlerShowAdd() {
    setAddBook(!addBook);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Head>
        <title>Catalogo de libros</title>
      </Head>
      {addBook ? (
        <BookAdd
          result={setResult}
          error={setError}
          loading={setIsLoading}
          buttonX={handlerShowAdd}
          add={handlerAdd}
        />
      ) : (
        <div>
          {" "}
          {session && session.user.roles === "admin" ? (
            <Button
              onClick={handlerShowAdd}
              text="Agregar Libro"
              form="circular"
              color="blue"
              pos="right"
            />
          ) : (
            ""
          )}
          <h1>Catalogo de libros</h1>
          <BooksGrid books={data} />
        </div>
      )}
    </div>
  );
}

export default BooksPage;
