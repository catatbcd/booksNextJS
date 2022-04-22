import UsersList from "../../components/users/list-users";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <h1>Listado de usuarios</h1>
      <UsersList data={data} />
    </div>
  );
}
