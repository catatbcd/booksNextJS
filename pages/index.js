import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import Head from "next/head";
import ReactLoading from 'react-loading';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/books");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <ReactLoading type='bubbles' color='blue' />;
  }

  return (
    <>
      {" "}
      <Head>
        <title>Books-Amigos4All</title>
        <meta
          name="description"
          content="Encuentra un gran catalogo de libros"
        />
      </Head>
      <AuthForm />
    </>
  );
}
