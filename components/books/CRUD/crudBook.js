import {Fragment} from 'react';
import Button from '../../ui/button';
function CRUDBook(props){
    return(
        <Fragment >
            <Button text="Agregar a favoritos" color="green"/>
            <Button text="Eliminar" color="red"/>
            <Button onClick={props.edit} text="Editar" color="blue"/>
        </Fragment>
    );
}
export default CRUDBook;