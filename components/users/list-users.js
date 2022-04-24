import classes from './list-users.module.css';

function UsersList(props) {
  return (
    <table className={`${classes.table} ${classes.tablebordered}`} >
      <caption>{props.caption}</caption>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
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
                    <div className={classes.titleth}  data-title="Email: " />
                    {u.email}
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
  );
}
export default UsersList;
