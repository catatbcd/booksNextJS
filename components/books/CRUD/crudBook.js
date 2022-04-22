import {Fragment} from 'react';
import Button from '../../ui/button';
function CRUDBook(){
    return(
        <Fragment >
            <Button text="Agregar a favoritos" color="green"/>
            <Button text="Eliminar" color="red"/>
            <Button text="Editar" color="blue"/>
        </Fragment>
    );
}
export default CRUDBook;