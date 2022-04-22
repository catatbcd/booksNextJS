import BookItem from "./book-item";
import classes from "./books-grid.module.css";

function BooksGrid(props) {
  const { books } = props;
  console.log(books);
  return (
    <ul className={classes.grid}>
      {books.map((book) => (
        <BookItem key={book.slug} book={book} />
      ))}
    </ul>
  );
}

export default BooksGrid;
