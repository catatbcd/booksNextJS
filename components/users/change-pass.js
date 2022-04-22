import classes from "./profile.module.css";
import { FaLock, FaKey } from "react-icons/fa";
import { Fragment, useRef } from "react";
import Button from "../ui/button";

function ChangePass(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation
    try {
      const result = await props.onChangePassword({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      });

      props.setResult(result.message);
      props.setError(false);
      props.loading(true);
      props.buttonX();
    } catch (error) {
      props.setError(error.message);
    }
  }
  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <div>
          <div className={classes.c}>
            <hr />
            <div className={classes.c2}>
              <h4 className={classes.blue}>
                <span className={classes.middle}>Cambiar Contraseña</span>
              </h4>
              <div className={classes.info}>
                <div className={classes.infoRow}>
                  <div className={classes.infoName}>
                    {" "}
                    <FaLock /> Contraseña nueva:
                  </div>
                  <div className={classes.infoValue}>
                    <span>
                      <input
                        ref={newPasswordRef}
                        id="new-password"
                        type="password"
                        required
                      />
                    </span>
                  </div>
                </div>
                <div className={classes.infoRow}>
                  <div className={classes.infoName}>
                    {" "}
                    <FaKey /> Contraseña Anterior:
                  </div>
                  <div className={classes.infoValue}>
                    <span>
                      {" "}
                      <input
                        id="old-password"
                        ref={oldPasswordRef}
                        type="password"
                        required
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button text="Cambiar Contraseña" color="green" form="circular" />
      </form>
      <Button
        onClick={props.buttonX}
        text="Cancelar"
        color="red"
        form="circular"
      />
    </Fragment>
  );
}
export default ChangePass;
