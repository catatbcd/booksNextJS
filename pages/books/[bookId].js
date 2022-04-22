import {  useRouter } from 'next/router';
import BookContent from '../../components/books/details/book-content';
import {useState, useEffect} from 'react';
import CRUDBook from '../../components/books/CRUD/crudBook';
import BookEdit from '../../components/books/CRUD/book-edit';
export default function BookPage() {
  const router = useRouter();
  const bookId = router.query.bookId;
  console.log(bookId)

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const[editBook, setEditBook] =useState(false);

  useEffect(() => {
    if (isLoading && bookId){
        fetch("/api/books/"+bookId)
        .then((response) => response.json())
        .then((data) => {
          setData(data.book);
          setIsLoading(!isLoading);
        });
     }
  }, [data, isLoading,bookId]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  function handlerShowEdit() {
    setEditBook(!editBook);
  }
  return (
     <div>
        <CRUDBook edit={handlerShowEdit}/>
        <BookContent book={data}/>
        <BookEdit book={data}/>
      </div>
    )
  }