import { useEffect, useState, useRef } from "react";
import classes from "./profile.module.css";
import { FaUser, FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "./avatar";
import Button from "../ui/button";

function EditProfile(props) {
  const { name, lastName, email, foto } = props.user;
  const [selected, setSelected] = useState();
  const [editFoto, setEditFoto] = useState(false);
  const [fotoSrc, setFotoSrc] = useState(props.foto);
  if (!fotoSrc) {
    setFotoSrc("https://randomuser.me/api/portraits/lego/0.jpg");
  } 
    const handleClick = radio => event => {setSelected(radio);
      
      setFotoSrc(radio);
      setEditFoto(!editFoto)
  };
  
useEffect(()=> {
  if(!editFoto){
    setFotoSrc(fotoSrc);
  }
  
}, [editFoto, fotoSrc]);
// page will reload whenever data is updated.

  
 

  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  async function submitHandler(event) {
    
    event.preventDefault();
    const enteredNameRef = nameRef.current.value;
    const enteredLastNameRef = lastNameRef.current.value;
    const enteredEmailRef = emailRef.current.value;

    // optional: Add validation
    try {
      const result = await props.onChangeProfile({
        name: enteredNameRef,
        lastName: enteredLastNameRef,
        email: enteredEmailRef,
        foto: selected
      });

      toast.success(result.message);
      props.loading(true);
      props.showEdit();
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="p-10 flex flex-col items-center justify-center w-full">
      <h1 className="font-bold text-2xl text-gray-900">
        Editar Perfil Del Usuario
      </h1>
      <form onSubmit={submitHandler}>
        <div>
          <div className={classes.c}>
            <div>
              <h1 className={classes.titulo}> Editar Perfil del Usuario </h1>
            </div>
            <hr />
            <div className={classes.c2}>
              <h4 className={classes.blue}>
                <span className={classes.middle}>Datos personales</span>
              </h4>
              <div className={classes.info}>
                <div className={classes.infoRow}>
                  <div className={classes.infoName}>
                    {" "}
                    <FaUser /> Nombre:
                  </div>
                  <div className={classes.infoValue}>
                    <span>
                      <input
                        defaultValue={name}
                        ref={nameRef}
                        name="nombre"
                        type="text"
                        required
                      />
                    </span>
                  </div>
                </div>
                <div className={classes.infoRow}>
                  <div className={classes.infoName}>
                    {" "}
                    <FaUser /> Apellido:
                  </div>
                  <div className={classes.infoValue}>
                    <span>
                      {" "}
                      <input
                        defaultValue={lastName}
                        ref={lastNameRef}
                        name="apellido"
                        type="text"
                        required
                      />
                    </span>
                  </div>
                </div>
                <div className={classes.infoRow}>
                  <div className={classes.infoName}>
                    <FaEnvelope /> Email:{" "}
                  </div>
                  <div className={classes.infoValue}>
                    <span>
                      {" "}
                      <input
                        defaultValue={email}
                        ref={emailRef}
                        name="email"
                        type="email"
                        required
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.c3}>
              <h4 className={classes.blue}>
                <span className={classes.middle}>Avatar</span>
              </h4>
              <div className={classes.info}>
                <div className={classes.infoRow}>
                  {!editFoto ? (
                    <div className="flex flex-col items-center">
                      <Image
                        className={classes.img}
                        src={fotoSrc}
                        alt="Foto de perfil"
                        width={150}
                        height={150}
                      />
                      <Button 
                      text="Cambiar Avatar"
                      color="gray"
                      form="circular"
                        onClick={() => setEditFoto(true)}
                       
                      />
                       
                    </div>
                  ) : (
                    <div>
                      <Avatar
                      onClick={handleClick}
                        class={classes.img}
                        value="https://randomuser.me/api/portraits/lego/0.jpg"
                        src="https://randomuser.me/api/portraits/lego/0.jpg"
                        alt=""
                      />
                      <Avatar
                        onClick={handleClick}
                        class={classes.img}
                        value="https://randomuser.me/api/portraits/lego/1.jpg"
                        src="https://randomuser.me/api/portraits/lego/1.jpg"
                        alt=""
                      />
                      <Avatar
                      onClick={handleClick}
                        class={classes.img}
                        value="https://randomuser.me/api/portraits/lego/2.jpg"
                        src="https://randomuser.me/api/portraits/lego/2.jpg"
                        alt=""
                      />
                      <Avatar
                      onClick={handleClick}
                        class={classes.img}
                        value="https://randomuser.me/api/portraits/lego/3.jpg"
                        src="https://randomuser.me/api/portraits/lego/3.jpg"
                        alt=""
                      />

                      <Avatar
                      onClick={handleClick}
                        class={classes.img}
                        value="https://randomuser.me/api/portraits/lego/4.jpg"
                        src="https://randomuser.me/api/portraits/lego/4.jpg"
                        alt=""
                      />

                      <Avatar
                      onClick={handleClick}
                        class={classes.img}
                        value="https://randomuser.me/api/portraits/lego/5.jpg"
                        src="https://randomuser.me/api/portraits/lego/5.jpg"
                        alt=""
                      />

                      <Avatar
                      onClick={handleClick}
                        class={classes.img}
                        value="https://randomuser.me/api/portraits/lego/6.jpg"
                        src="https://randomuser.me/api/portraits/lego/6.jpg"
                        alt=""
                      />

                      <Avatar
                      onClick={handleClick}
                        class={classes.img}
                        value="https://randomuser.me/api/portraits/lego/7.jpg"
                        src="https://randomuser.me/api/portraits/lego/7.jpg"
                        alt=""
                      />
                      <Avatar
                      onClick={handleClick}
                        class={classes.img}
                        value="https://randomuser.me/api/portraits/lego/8.jpg"
                        src="https://randomuser.me/api/portraits/lego/8.jpg"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button text="enviar"
        color="green"
        form="block" form1="circular"
        />
      </form>
      <Button onClick={props.buttonX} text="Cancelar" color="red" form="block" form1="circular"/>
    </div>
  );
}
export default EditProfile;
