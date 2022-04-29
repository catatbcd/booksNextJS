import classes from "../../../styles/book-header.module.css";

function BookHeader(props) {
  const { title, authors, isbn, categories, pageCount, publishedDate } = props;

  return (
    <header>
      <div className={classes.conT}>
        <h1 className={classes.title}>{title}</h1>
      </div>

      <div className={classes.authors}>
        {authors.map((u, index) => (
          <span key={index}>/{u}</span>
        ))}
      </div>
      <div>
        {isbn ? (
          <div>
            <div className={classes.dataT}>ISBN:</div>{" "}
            <div className={classes.dataD}>{isbn}</div>
          </div>
        ) : (
          ""
        )}

        {pageCount ? (
          <div>
            <div className={classes.dataT}>Número de páginas:</div>{" "}
            <div className={classes.dataD}>{pageCount}</div>{" "}
          </div>
        ) : (
          ""
        )}
        {publishedDate ? (
          <div>
            <div className={classes.dataT}>Fecha de publicación:</div>{" "}
            <div className={classes.dataD}>{publishedDate}</div>{" "}
          </div>
        ) : (
          ""
        )}
        {categories.length !== 0 ? (
          <div>
            <div className={classes.dataT}>Categorías:</div>{" "}
            <div className={classes.dataD}>
              {categories.map((u, index) => (
                <span key={index}>*{u}</span>
              ))}
            </div>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}

export default BookHeader;
