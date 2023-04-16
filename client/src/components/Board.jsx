import React, { useState } from "react";
import "../styles/Board.css";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Board() {
  const [boardName, setBoardName] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessages, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    api
      .post(`/boards`, {
        boardName: boardName,
      })
      .then((response) => {
        setSuccessMessage("Board created Successfully");
        navigate(`/board/${response.data.board._id}/tasks`);
      })
      .catch((error) => {
        setErrorMessage("creation failed");
      });
  };

  return (
    <>
      <div className="login-container shadow">
        <h1>Create A Board</h1>
        <hr />
        {errorMessage && <p className="error">{errorMessage}</p>}

        {successMessages && <p className="success">{successMessages}</p>}

        <form onSubmit={handleSubmit}>
          <section>
            <label>Board Name </label>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </section>
          <br />
          <button type="submit">Add Board </button>
        </form>
      </div>
    </>
  );
}
