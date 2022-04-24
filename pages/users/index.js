import UsersList from "../../components/users/list-users";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";


export default function UsersPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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
      <ToastContainer></ToastContainer>
      <Head>
        <title>Lista de usuarios</title>
        <meta name="description" content="Lista de usuarios registrados" />
      </Head>
      <h1>Listado de usuarios</h1>
      <UsersList error={setError} result={setResult} data={data} />
    </div>
  );
}
