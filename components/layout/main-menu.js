import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import classes from "../../styles/main-menu.module.css";
import { useState } from "react";

function MainMenu() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  function logoutHandler() {
    signOut();
  }

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <a href="/">
          <Image
            src={"https://namespaceit.com/uploads/post/image/1626089870.jpg"}
            id={classes.img}
            height={40}
            width={100}
            alt="Logo"
          />
          Books
        </a>
      </div>
      <div className={classes.navbar}>
        <div className={classes.iconbar} onClick={handleToggle}>
          <i></i>
          <i></i>
          <i></i>
        </div>

        <ul className={isOpen ? classes.menusShow : ""}>
          <li className={classes.close}>
            <span onClick={handleToggle}>×</span>
          </li>

          {session && session.user.roles === "user" && (
            <>
              <li>
                <Link href="/users/profile">
                  <a>Perfil</a>
                </Link>
              </li>
              <li>
                <Link href="/users/favorites">
                  <a>Mis Libros</a>
                </Link>
              </li>
              <li>
                <Link href="/books/">
                  <a>Libreria</a>
                </Link>
              </li>
            </>
          )}
          {session && session.user.roles === "admin" && (
            <>
              <li>
                <Link href="/users/profile">
                  <a>Perfil</a>
                </Link>
              </li>
              <li>
                <Link href="/users">
                  <a>Usuarios</a>
                </Link>
              </li>
              <li>
                <Link href="/books/">
                  <a>Libreria</a>
                </Link>
              </li>
            </>
          )}
          {session && (
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MainMenu;
