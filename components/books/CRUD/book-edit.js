import classes from "../details/book-content.module.css";
import { useState, useRef } from "react";
import Image from "next/image";
import Button from "../../ui/button";
function BookEdit(props) {
  const {
    id,
    title,
    authors,
    thumbnailUrl,
    shortDescription,
    longDescription,
    publishedDate,
    isbn,
    categories,
    pageCount,
  } = props.book;
  const [src, setSrc] = useState(thumbnailUrl);
  const [editImage, setEditImage] = useState(false);
  const titleRef = useRef();
  const authorsRef = useRef();
  const thumbnailUrlRef = useRef();
  const shortDescriptionRef = useRef();
  const longDescriptionRef = useRef();
  const publishedDateRef = useRef();
  const isbnRef = useRef();
  const categoriesRef = useRef();
  const pageCountRef = useRef();

  function handlerEditImage() {
    setEditImage(!editImage);
  }
  if (!src) {
    handlerEditImage();
  }
  let formattedDate;
  if (publishedDate) {
    formattedDate = new Date(publishedDate).toLocaleDateString("en-CA");
  } else {
    formattedDate = null;
  }
  async function submitHandler(event) {
    event.preventDefault();
  
    const enteredTitleRef = titleRef.current.value;
    const enteredAuthorsRef = authorsRef.current.value;
    if(editImage){
     setSrc(thumbnailUrlRef.current.value)
    }
    
    const enteredShortDescriptionRef = shortDescriptionRef.current.value;
    const enteredLongDescriptionRef = longDescriptionRef.current.value;
    const enteredPublishedDateRef = publishedDateRef.current.value;
    const enteredIsbnRef = isbnRef.current.value;
    const enteredCategoriesRef = categoriesRef.current.value;
    const enteredPageCountRef = pageCountRef.current.value;
    // optional: Add validation
    const arrayAuthors = enteredAuthorsRef.split(',');
    const arrayCatagories = enteredCategoriesRef.split(',');
    try {
      const result = await props.edit({
        id:id,
        title: enteredTitleRef,
        authors:arrayAuthors,
        thumbnailUrl: src,
        shortDescription: enteredShortDescriptionRef,
        longDescription: enteredLongDescriptionRef,
        publishedDate: enteredPublishedDateRef,
        isbn: enteredIsbnRef,
        categories: arrayCatagories,
        pageCount: enteredPageCountRef,
        
      });

      props.result(result.message);
      props.error(null);
      props.loading(true);
      props.buttonX();
      
    } catch (error) {
      props.error(error.message);
    }
  }
  return (
    <div className={classes.section}>
      <form onSubmit={submitHandler}>
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
          ) : (
            <div>
              {" "}
              <label htmlFor="src">agregar imagen:</label>
              <input  ref={thumbnailUrlRef} type="file" id="src" name="src" />
              <Button
                text="Seleccionar"
                color="blue"
                onClick={handlerEditImage}
              />
              <Button text="Cancelar" color="red" onClick={handlerEditImage} />
            </div>
          )}{" "}
        </div>
        <div className={`${classes.col} ${classes.header}`}>
          {" "}
          <div>
            {" "}
            <label htmlFor="title">Titulo:</label>
            <input ref={titleRef} defaultValue={title} type="text" name="title" />
          </div>
          <div>
            {" "}
            <label htmlFor="isbn">isbn:</label>
            <input ref={isbnRef} defaultValue={isbn} type="text" name="isbn" />
          </div>
          <div>
            {" "}
            <label htmlFor="pageCount">Numero de paginas:</label>
            <input ref={pageCountRef} defaultValue={pageCount} type="number" name="pageCount" />
          </div>
          <div>
            {" "}
            <label htmlFor="publishedDate">Fecha de publicacion:</label>
            <input
            ref={publishedDateRef}
              defaultValue={formattedDate}
              type="date"
              name="publishedDate"
            />
          </div>
          <div>
            {" "}
            <label htmlFor="authors">
              Autores (ingrese el nombre de los autores separado por comas):
            </label>
            <input ref={authorsRef} defaultValue={authors} type="text" name="authors" />
          </div>
          <div>
            {" "}
            <label htmlFor="categories">categorias:</label>
            <input ref={categoriesRef} defaultValue={categories} type="text" name="categories" />
          </div>
        </div>
        <div className={`${classes.col} ${classes.content}`}>
          <h2>Descripción corta del libro</h2>
          <textarea defaultValue={shortDescription} ref={shortDescriptionRef} name="shortDescription" rows="10" cols="50">
            
          </textarea>
          <h2>Descripción larga del libro</h2>
          <textarea defaultValue={longDescription} ref={longDescriptionRef} name="longDescription" rows="10" cols="50">
            
          </textarea>
        </div>
        <Button text="Editar" color="blue" />
      </form>
      <Button onClick={props.buttonX} text="Cancelar" color="red" />
    </div>
  );
}

export default BookEdit;
