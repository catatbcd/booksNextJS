import Image from 'next/image';

import classes from './book-header.module.css';

function BookHeader(props) {
  const { title, authors,isbn, categories, pageCount, publishedDate} = props;

  return (
    <header >
      <h1 className={classes.title}>{title}</h1>
      <h2>{authors}</h2>
      <div>
          {isbn ? <div>ISBN: {isbn}</div>:""}
          {categories.length !== 0 ? <div>Categorias: {categories}</div>:""}
          {pageCount ? <div>Numero de paginas: {pageCount}</div>:""}
          {publishedDate ? <div>fecha de publicacion: {publishedDate}</div>:""}
          
      </div>

      
    </header>
  );
}

export default BookHeader;