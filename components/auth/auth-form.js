import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import classes from "./auth-form.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
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
function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      console.log(result);
      if (!result.error) {
        // set some auth state
        toast.success(result.message);
        router.replace("/");
      }else{
        toast.error(result.error);
        
      }
      // log user in
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        
        toast.success(result.message);
        switchAuthModeHandler();
        console.log(result);
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div>
      <div className={classes.container}>
      <ToastContainer></ToastContainer>
        <div className={classes.left}>
          <div className={classes.header}>
            <h2 className={classes.animation} id={classes.a1}>
              {isLogin ? "Bienvenido de nuevo" : "Registrese"}
            </h2>
            <h4 className={classes.animation} id={classes.a2}>
              {isLogin
                ? "Inicie sesión en su cuenta con correo electrónico y contraseña"
                : "Cree su cuenta con correo electrónico y contraseña"}
            </h4>
          </div>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.formfield }>
              
              <input
                type="email"
                id="email"
                className={classes.input}
                required
                ref={emailInputRef}
                placeholder="Correo electrónico"
              />
            </div>
            <div className={classes.formfield }>
              
              <input
                type="password"
                id="password"
                className={classes.input}
                placeholder="Contraseña"
                required
                ref={passwordInputRef}
              />
            </div>
            

            <button className={classes.animation} id={classes.a6}>
              {isLogin ? "Login" : "Crear una cuenta"}
            </button>
            <button
              type="button"
              className={classes.animation} id={classes.a6}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Crear una nueva cuenta" : "Iniciar sesion con una cuenta existente"}
            </button>
          </form>
        </div>
        <div className={classes.right}></div>
      </div>
     
    </div>
  );
}

export default AuthForm;
