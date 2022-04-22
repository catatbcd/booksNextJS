import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import classes from "./book-item.module.css";

function Book(props) {
  const {
    title,
    thumbnailUrl,
    shortDescription,
    publishedDate,
    id,
    authors,
    isbn,
  } = props.book;
  const [src, setSrc] = useState(thumbnailUrl);
  const [date, setDate] = useState(publishedDate);
  if (!src) {
    setSrc("https://randomuser.me/api/portraits/lego/5.jpg");
  }
  if (!date) {
    setDate("2009-08-01T07:00:00.000Z");
  }
  const linkPath = `/books/${id}`;

  return (
    <div className={classes.item}>
      <Link href={linkPath}>
        <a>
          <Image
            className={classes.img}
            src={src}
            alt={title}
            width={50}
            height={50}
            layout="responsive"
          />

          <div>
            <div className={classes.title}>{title}</div>
            <div className={classes.autor}>
                <div>isbn: {isbn} </div>
                <div>Autores: {authors}</div>
                <hr/><div>
              <p>{shortDescription}</p>
            </div>
            </div>
            
            
          </div>

          <div></div>
        </a>
      </Link>
    </div>
  );
}

export default Book;
