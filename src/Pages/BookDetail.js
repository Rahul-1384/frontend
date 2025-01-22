import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Simulating a fetch request (replace with your backend API)
    const fetchBookDetails = async () => {
      try {
        // const response = await fetch(`http://localhost:3000/books/${id}`);

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading book details...</div>;
  }

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Price:</strong> {book.price}</p>
      <p><strong>Category:</strong> {book.category}</p>
    </div>
  );
}

export default BookDetail;
