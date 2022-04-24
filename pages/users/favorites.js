import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Head from "next/head";
export default function UserBooksPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const id = props.session.user.id;
  useEffect(() => {
    if (result) {
      toast.success(result);
    }

    if (error) {
      toast.error(error);
    }
    if (isLoading) {
      retrieveProfile();
    }
  }, [data, isLoading, result, error]);

  const retrieveProfile = () => {
    fetch("/api/users/profile", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => setError(error))
      .then((data) => {
        setIsLoading(!isLoading);
        setData(data.user);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Head>
        <title>Libros Favoritos</title>
      </Head>
      <h1>Lista de libros del usuario</h1>

      {data.favorites
        ? data.favorites.map((u, index) => (
            <div key={index}>
              <a href={`../books/${u}`}>/books/{u}</a>
            </div>
          ))
        : "No hay libros guardados en favoritos"}
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      props: { session },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
