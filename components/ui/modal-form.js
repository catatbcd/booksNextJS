import Button from "./button";
import classes from "../../styles/modal.module.css";
import { useState, useRef } from "react";

function ModalForm(props) {
  const { name, email, roles, id } = props.user;
  const [selected, setSelected] = useState("user");

  const handleClick = (radio) => (event) => {
    setSelected(radio);
  };
  const nameRef = useRef();
  const emailRef = useRef();
  async function submitHandler(event) {
    event.preventDefault();
    const enteredNameRef = nameRef.current.value;
    const enteredEmailRef = emailRef.current.value;

    // optional: Add validation
    try {
      const result = await props.ok({
        id: id,
        name: enteredNameRef,
        email: enteredEmailRef,
        roles: selected,
      });

      props.setResult(result.message);
      props.setError(false);
      props.loading(true);
      props.buttonX();
    } catch (error) {
      props.setError(error.message);
    }
  }

  if (props.show) {
    return (
      <div className={classes.modal}>
        <div className={classes.modalDialog}>
          <div className={classes.modalContent}>
            <div className={classes.modalHeader}>
              <button className={classes.close} onClick={props.buttonX}>
                <span>&times;</span>
              </button>
              <h4 className={`${classes.modalTitle} ${classes.h4}`}>
                {props.modalTitle}
              </h4>
            </div>
            <div className={classes.modalBody}>
              <form onSubmit={submitHandler}>
                <label>
                  Nombre:
                  <input defaultValue={name} ref={nameRef} type="text" />
                </label>
                <label>
                  Email:
                  <input defaultValue={email} ref={emailRef} type="email" />
                </label>
                <p>
                  Rol:
                  <label>
                    <input
                      onChange={handleClick("user")}
                      type="radio"
                      value="user"
                      name="roles"
                      checked={selected === "user" ? true : false}
                    />
                    user
                  </label>
                  <label>
                    <input
                      onChange={handleClick("admin")}
                      type="radio"
                      value="admin"
                      name="roles"
                      checked={selected === "admin" ? true : false}
                    />
                    admin
                  </label>
                </p>
                <Button text={props.text} color={props.color} form="circular" />
              </form>
            </div>
            <div className={classes.modalFooter}>
              <Button
                onClick={props.buttonX}
                text="Cancelar"
                color="red"
                form="circular"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ModalForm;
