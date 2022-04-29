import UsersList from "../../components/users/list-users";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";
import Admin from "../protected";

async function handlerDelete(id) {
  const response = await fetch("/api/users/" + id, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "¡Algo salió mal!");
  }

  return data;
}
async function handlerEdit(userData) {
  const response = await fetch("/api/users/edit-user", {
    method: "PATCH",
    body: JSON.stringify(userData),
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
export default function UsersPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  function loading() {
    setIsLoading(!isLoading);
  }
  useEffect(() => {
    if (result) {
      toast.success(result);
    }

    if (error) {
      toast.error(error);
    }

    if (isLoading) {
      fetch("/api/users")
        .then((response) => response.json())
        .catch((error) => setError(error))
        .then((data) => {
          setData(data.users);
          setIsLoading(!isLoading);
        });
    }
  }, [data, isLoading, result, error]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Admin>
      <ToastContainer></ToastContainer>
      <Head>
        <title>Lista de usuarios</title>
        <meta name="description" content="Lista de usuarios registrados" />
      </Head>
      <h1>Listado de usuarios</h1>
      <UsersList
        error={setError}
        result={setResult}
        data={data}
        delete={handlerDelete}
        edit={handlerEdit}
        isLoading={loading}
      /></Admin>
    </div>
    
  );
}
