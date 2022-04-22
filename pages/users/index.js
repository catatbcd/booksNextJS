import UsersList from "../../components/users/list-users";
import { useState, useEffect } from "react";

export default function UsersPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      fetch("/api/users")
        .then((response) => response.json())
        .then((data) => {
          setData(data.users);
          setIsLoading(!isLoading);
        });
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  return (
    <div>
      <h1>Listado de usuarios</h1>
      <UsersList data={data} />
    </div>
  );
}
