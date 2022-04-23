import { getSession } from "next-auth/react";
import {useState,useEffect} from 'react';
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
  console.log(data);
    return (
     <div>
       <h1>Lista de libros del usuario</h1>
       {data.favorites.map((u,index) => (
         <div key={index}>
           <a href={`books/${u}`}>/books/{u}</a>
         </div>
       ))}
      </div>
    )
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