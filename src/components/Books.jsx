export default function Books () {
  //TODO: Implement your Book list and create here, be careful about user's role.
}import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import { Link } from "react-router-dom";

export default function Books() {

  const { user } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  async function loadBooks() {
    const result = await fetch(`${API_URL}/api/book`, {
      credentials: "include"
    });

    if (result.ok) {
      const data = await result.json();
      setBooks(data.books);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function createBook() {

    const result = await fetch(`${API_URL}/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        author,
        quantity: 1,
        location: ""
      })
    });

    if (result.ok) {
      setTitle("");
      setAuthor("");
      loadBooks();
    }
  }

  return (
    <div>

      <h2>Books</h2>

      {/* ADMIN create book */}
      {user.isLoggedIn && (
        <div>
          <h3>Create Book</h3>
          <input
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button onClick={createBook}>Create</button>
        </div>
      )}

      <hr />

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/book/${book._id}`}>
              {book.title} - {book.author}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}