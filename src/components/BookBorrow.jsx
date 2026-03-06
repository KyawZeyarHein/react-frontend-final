import { useState } from "react";
import { useParams } from "react-router-dom";

export default function BookBorrow() {

  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [targetDate, setTargetDate] = useState("");

  async function borrowBook() {

    const result = await fetch(`${API_URL}/api/borrow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        bookId: id,
        targetDate
      })
    });

    if (result.ok) {
      alert("Borrow request submitted");
      setTargetDate("");
    }
  }

  return (
    <div>

      <h3>Borrow Book</h3>

      <input
        type="date"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
      />

      <button onClick={borrowBook}>
        Request Borrow
      </button>

    </div>
  );
}