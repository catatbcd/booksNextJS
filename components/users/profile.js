import Image from "next/image";
import classes from "../../styles/profile.module.css";
import { FaUser, FaEnvelope } from "react-icons/fa";
import Button from "../ui/button";

function Profile(props) {
  const { name, lastName, foto, email } = props.user;
  let fotoSrc;

  if (!foto) {
    fotoSrc = "https://randomuser.me/api/portraits/lego/0.jpg";
  } else {
    fotoSrc = foto;
  }

  return (
    <div>
      <div className={classes.c}>
        <div>
          <h1 className={classes.titulo}> Perfil del Usuario </h1>
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
                <span>{name}</span>
              </div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.infoName}>
                {" "}
                <FaUser /> Apellido:
              </div>
              <div className={classes.infoValue}>
                <span>{lastName}</span>
              </div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.infoName}>
                <FaEnvelope /> Email:{" "}
              </div>
              <div className={classes.infoValue}>
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.c3}>
          <h4 className={classes.blue}>
            <span className={classes.middle}>Foto de perfil</span>
          </h4>
          <div className={classes.info}>
            <div className={classes.infoRow}>
              <Image
                className={classes.img}
                src={fotoSrc}
                alt="Foto de perfil"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
      </div>{" "}
      <Button
        onClick={props.button}
        text="Editar Perfil"
        color={"sky"}
        form={"circular"}
      />
      {!props.show ? (
        <Button
          onClick={props.buttonPass}
          text="Cambiar Contraseña"
          color={"purple"}
          form={"circular"}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default Profile;
