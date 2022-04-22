import classes from "../details/book-content.module.css";
import { useState } from "react";
import Image from "next/image";
import Button from "../../ui/button";
function BookEdit(props) {
  const {
    title,
    authors,
    thumbnailUrl,
    shortDescription,
    longDescription,
    publishedDate,
    id,
    isbn,
    categories,
    pageCount,
  } = props.book;
  const [src, setSrc] = useState(thumbnailUrl);
  const [editImage, setEditImage] = useState(false);
  function handlerEditImage() {
    setEditImage(!editImage);
  }
  if (!src) {
    handlerEditImage();
  } 
  let formattedDate;
  if (publishedDate) {
    
    formattedDate = new Date(publishedDate).toLocaleDateString('en-CA');
  } else {
    formattedDate = null;
  }

  return (
    <div className={classes.section}>
      <form>
        <div className={`${classes.col} ${classes.image}`}>

        {!editImage ? (
          <div>
                     <Image src={src} alt={title} width={200} height={150} />
                    
                      <Button 
                      text="Cambiar Imagen"
                      color="gray"
                      form="circular"
                        onClick={handlerEditImage}
                       
                      />
                       
                    </div>
                  ) :  <div>
                       {" "}
                       <label for="src">agregar imagen:</label>
                       <input type="file" id="src" name="src" />
                     </div>}

          {" "}
         
        </div>
        <div className={`${classes.col} ${classes.header}`}>
          {" "}
          <div>
            {" "}
            <label for="title">Titulo:</label>
            <input defaultValue={title} type="text" name="title" />
          </div>
          <div>
            {" "}
            <label for="isbn">isbn:</label>
            <input defaultValue={isbn} type="text" name="isbn" />
          </div>
          <div>
            {" "}
            <label for="pageCount">Numero de paginas:</label>
            <input defaultValue={pageCount} type="number" name="pageCount" />
          </div>
          <div>
            {" "}
            <label for="publishedDate">Fecha de publicacion:</label>
            <input defaultValue={formattedDate} type="date" name="publishedDate" />
          </div>
          <div>
            {" "}
            <label for="authors">Autores (ingrese el nombre de los autores separado por comas):</label>
            <input defaultValue={authors} type="text" name="authors" />
          </div>
          <div>
            {" "}
            <label for="categories">categorias:</label>
            <input defaultValue={categories} type="text" name="categories" />
          </div>
        </div>
        <div className={`${classes.col} ${classes.content}`}>
            <h2>Descripción corta del libro</h2>
            <textarea name="shortDescription" rows="10" cols="50">{shortDescription}</textarea>
            <h2>Descripción larga del libro</h2>
            <textarea name="longDescription" rows="10" cols="50">{longDescription}</textarea>
            
          </div>
          <Button text="Editar" color="blue" />
        </form>
        <Button text="Cancelar" color="red"/>
    </div>
  );
}

export default BookEdit;
