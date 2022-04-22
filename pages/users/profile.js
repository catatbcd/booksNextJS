import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import EditProfile from "../../components/users/edit-profile";
import Profile from "../../components/users/profile";
import ChangePass from "../../components/users/change-pass";

async function changePasswordHandler(passwordData) {
  const response = await fetch("/api/users/change-pass", {
    method: "PATCH",
    body: JSON.stringify(passwordData),
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

async function changeProfileHandler(profileData) {
  const response = await fetch("/api/users/edit-profile", {
    method: "PATCH",
    body: JSON.stringify(profileData),
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

export default function UserPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const id = props.session.user.id;
  
  function handlerShow() {
    setShowEdit(!showEdit);
    setShowChangePass(false);
  }
  
  function handlerShowChangePass() {
    setShowChangePass(!showChangePass);
    setShowEdit(false);
  }
  
  useEffect(() => {
    if (isLoading) {
      retrieveProfile();
    }
  }, [data, isLoading]);

  const retrieveProfile = () => {
    fetch("/api/users/profile", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(!isLoading);
        setData(data.user);
        console.log("Lista de ventas cargada desde la base de datos");
        console.log(data.user);
      }, (error) => {setIsLoading(true)});
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }


  return (
    <div>
      {!showEdit ? (
        <Profile
          user={data}
          button={handlerShow}
          buttonPass={handlerShowChangePass}
          show={showChangePass}
        />
      ) : (
        <EditProfile
          user={data}
          buttonX={handlerShow}
          onChangeProfile={changeProfileHandler}
          showEdit={handlerShow}
          loading={setIsLoading}
          
        />
      )}
      {showChangePass ? (
        <ChangePass
          buttonX={handlerShowChangePass}
          show={showChangePass}
          onChangePassword={changePasswordHandler}
          loading={setIsLoading}
        />
      ) : (
        ""
      )}
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
