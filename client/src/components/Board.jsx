import React, { useState } from "react";
import "../styles/Board.css";
export default function Board() {
  const [board, setBoard] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && board) {
      console.log(name);
      console.log(board);
      setName("");
      setBoard("");
    } else {
      alert("Please enter the complete fields");
    }
  };

  return (
    <>
      <div>
        <h3>Board</h3>
        <form onSubmit={handleSubmit}>
          <section>
            <label>Name : </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </section>
          <br />
          <textarea
            type="table"
            value={board}
            onChange={(e) => {
              setBoard(e.target.value);
            }}
          ></textarea>{" "}
          <br />
          <button type="submit">Add Board </button>
        </form>
      </div>
    </>
  );
}
