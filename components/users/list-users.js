import { useState } from "react";
import classes from "../../styles/list-users.module.css";
import Modal from "../ui/modal";

import { FaTrash, FaEdit } from "react-icons/fa";
import ModalForm from "../ui/modal-form";

function UsersList(props) {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [textModal, setTextModal] = useState("");
  const [colorModal, setColorModal] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [bodyModal, setBodyModal] = useState("");
  function handlerModal() {
    setShowModal(!showModal);
  }
  function handlerModalForm() {
    setShowModalForm(!showModalForm);
  }
  function modalDelete(name) {
    setTextModal("borrar");
    setColorModal("green");
    setTitleModal("Eliminar Usuario");
    setBodyModal("¿Esta seguro de que desea eliminar al usuario: "+name+"?");
    handlerModal();
  }
  function modalEdit() {
    setTextModal("ok");
    setColorModal("green");
    setTitleModal("Editar Usuario");
    handlerModalForm();
  }
  console.log(id);
  return (
    <div>
      <Modal
        id= {id}
        text={textModal}
        color={colorModal}
        buttonX={handlerModalForm}
        modalTitle={titleModal}
        modalBody={bodyModal}
        show={showModal}
        ok={props.delete}
        setResult={props.result}
        setError={props.error}
        isLoading={props.isLoading}
      />
      <ModalForm 
       user= {user}
       text={textModal}
       color={colorModal}
       buttonX={handlerModalForm}
       modalTitle={titleModal}
      
       show={showModalForm}
       ok={props.edit}
       setResult={props.result}
       setError={props.error}
       loading={props.isLoading}/>

      <table className={`${classes.table} ${classes.tablebordered}`}>
        <caption>{props.caption}</caption>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {props.data ? (
            <>
              {props.data.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div>
                      <div className={classes.titleth} data-title="Nombre: " />
                      {u.name}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className={classes.titleth} data-title="Email: " />
                      {u.email}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className={classes.titleth} data-title="Rol: " />
                      {u.roles}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div onClick={() => {
                          setUser(u);
                          modalEdit();
                        }}>
                        <FaEdit /> Editar
                      </div>
                      <div
                        onClick={() => {
                          setId(u.id);
                          modalDelete(u.email);
                        }}
                      >
                        <FaTrash /> Borrar
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <div>No hay usuarios Registrados</div>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default UsersList;
