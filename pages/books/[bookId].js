import { useRouter } from "next/router";
import BookContent from "../../components/books/details/book-content";
import { useState, useEffect } from "react";
import BookEdit from "../../components/books/CRUD/book-edit";
import Modal from "../../components/ui/modal";
import Button from "../../components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import Head from "next/head";

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
async function handlerFavorite(id) {
  const response = await fetch("/api/users", {
    method: "PATCH",
    body: JSON.stringify(id),
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
async function handlerEdit(bookData) {
  const response = await fetch("/api/books/" + bookData.id, {
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
  const {data: session} = useSession();
  const router = useRouter();
  const bookId = router.query.bookId;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editBook, setEditBook] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [textModal, setTextModal] = useState("");
  const [colorModal, setColorModal] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [bodyModal, setBodyModal] = useState("");
  const [okModal, setOkModal] = useState("");
function handlerLoading(){
  setIsLoading(!isLoading);
}
  function handlerModal() {
    setShowModal(!showModal);
  }
console.log(okModal);
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
  function modalDelete(title) {
    setTextModal("borrar");
    setColorModal("green");
    setTitleModal("Eliminar Libro: " + title);
    setBodyModal("¿Esta seguro de que desea Eliminar este libro?");
    setOkModal("delete");
    handlerModal();
  }
  function modalFavorite(title) {
    setTextModal("ok");
    setColorModal("green");
    setTitleModal("Agregar " + title + " a favoritos");
    setBodyModal("¿Esta seguro de que desea agregar a favoritos este libro?");
    setOkModal("favorite");
    handlerModal();
  }
  if (!data) {
    router.replace("/books");
  } else {
    return (
      <div>
        <ToastContainer></ToastContainer>
        <Head>
          <title>{data.title}</title>
          <meta name="description" content={data.description} />
        </Head>
        {session && (
          <Modal
            id={
              okModal === "delete"
                ? bookId
                : { idBook: bookId, idUser: session.user.id }
            }
            text={textModal}
            color={colorModal}
            buttonX={handlerModal}
            modalTitle={titleModal}
            modalBody={bodyModal}
            show={showModal}
            ok={okModal === "delete" ? handlerDelete : handlerFavorite}
            setResult={setResult}
            setError={setError}
            type={okModal}
            isLoading={handlerLoading}
          />
        )}

        {!editBook ? (
          <div>
            {session && session.user.roles === "admin" ? (
              <div>
                <Button onClick={() => modalDelete(data.title, "/books")} text="Eliminar" color="red" />
                <Button onClick={handlerShowEdit} text="Editar" color="blue" />
              </div>
            ) : (
              <Button
                onClick={() => modalFavorite(data.title, "../users/favorites")}
                text="Agregar a favoritos"
                color="green"
              />
            )}

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
}
