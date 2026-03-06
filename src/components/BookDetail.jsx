export function BookDetail () {
  //TODO: Implement your Book management in detail here, i.e. Update or Delete
}import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function BookDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const API_URL = import.meta.env.VITE_API_URL;

  const [book, setBook] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  async function loadBook() {
    const result = await fetch(`${API_URL}/api/book/${id}`, {
      credentials: "include"
    });

    if (result.ok) {
      const data = await result.json();
      setBook(data.book);
      setTitle(data.book.title);
      setAuthor(data.book.author);
    }
  }

  useEffect(() => {
    loadBook();
  }, []);

  async function updateBook() {
    const result = await fetch(`${API_URL}/api/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        author
      })
    });

    if (result.ok) {
      loadBook();
    }
  }

  async function deleteBook() {
    const result = await fetch(`${API_URL}/api/book/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    if (result.ok) {
      navigate("/books");
    }
  }

  if (!book) return <div>Loading...</div>;

  return (
    <div>

      <h2>Book Detail</h2>

      <div>
        <b>Title:</b> {book.title}
      </div>

      <div>
        <b>Author:</b> {book.author}
      </div>

      <div>
        <b>Status:</b> {book.status}
      </div>

      {/* ADMIN management */}
      {user.isLoggedIn && (
        <div>
          <h3>Edit Book</h3>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <button onClick={updateBook}>Update</button>
          <button onClick={deleteBook}>Delete</button>
        </div>
      )}

    </div>
  );
}