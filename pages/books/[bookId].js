import { useRouter } from "next/router";
import BookContent from "../../components/books/details/book-content";
import { useState, useEffect } from "react";
import BookEdit from "../../components/books/CRUD/book-edit";
import Modal from "../../components/ui/modal";
import Button from "../../components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function handlerDelete(id) {
  const response = await fetch("/api/books/" + id, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "¡Algo salió mal!");
  }

  return data;
}
async function handlerEdit(bookData) {
  const response = await fetch("/api/books/"+ bookData.id, {
    method: "PATCH",
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

export default function BookPage() {
  const router = useRouter();
  const bookId = router.query.bookId;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editBook, setEditBook] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  

  function handlerModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    if (result) {
      toast.success(result);
    }

    if (error) {
      toast.error(error);
    }
    if (isLoading && bookId) {
      fetch("/api/books/" + bookId)
        .then((response) => response.json())
        .then((data) => {
          setData(data.book);
          setIsLoading(!isLoading);
        });
    }
  }, [data, isLoading, bookId]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  function handlerShowEdit() {
    setEditBook(!editBook);
  }
  return (
    <div>
        <ToastContainer></ToastContainer>
      <Modal
        id={bookId}
        text="borrar"
        color="green"
        buttonX={handlerModal}
        modalTitle="Eliminar Libro"
        modalBody="¿Esta seguro de que desea Eliminar este libro?"
        show={showModal}
        ok={handlerDelete}
        setResult={setResult}
        setError={setError}
      />

      {!editBook ? (
        <div>
          <Button text="Agregar a favoritos" color="green" />
          <Button onClick={handlerModal} text="Eliminar" color="red" />
          <Button onClick={handlerShowEdit} text="Editar" color="blue" />

          <BookContent book={data} />
        </div>
      ) : (
        <BookEdit
          book={data}
          buttonX={handlerShowEdit}
          result={setResult}
          error={setError}
          loading={setIsLoading}
          edit={handlerEdit}
        />
      )}
    </div>
  );
}
