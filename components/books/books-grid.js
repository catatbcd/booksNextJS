import BookItem from "./book-item";
import classes from "../../styles/books-grid.module.css";

function BooksGrid(props) {
  const { books } = props;
  return (
    <ul className={classes.grid}>
      {books.map((book, index) => (
        <BookItem key={index} book={book} />
      ))}
    </ul>
  );
}

export default BooksGrid;
