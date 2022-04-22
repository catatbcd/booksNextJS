import BookHeader from "./book-header";
import classes from "./book-content.module.css";
import { useState } from "react";
import Image from "next/image";

function BookContent(props) {
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
  const [date, setDate] = useState(publishedDate);
  const [description, setDescription] = useState(longDescription);
  if (!description && shortDescription) {
    setDescription(shortDescription);
  } else {
    ("No found description");
  }
  let formattedDate;
  if(date) {formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });}else{
    formattedDate=null;
  }


  return (
    <div className={classes.section}>
      <div className={`${classes.col} ${classes.image}`}>
        {" "}
        <Image src={src} alt={title} width={200} height={150} />
      </div>
      <div className={`${classes.col} ${classes.header}`}>
        {" "}
        <BookHeader
          title={title}
          isbn={isbn}
          authors={authors}
          categories={categories}
          pageCount={pageCount}
          publishedDate={formattedDate}
        />
      </div>
      {description ? (<div className={`${classes.col} ${classes.content}`}>
        <h2>descripción del libro</h2>
        <p>{description}</p>
      </div>):""}
    </div>
  );
}

export default BookContent;
