import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function BoardList() {
  const [boardList, setBoardList] = React.useState([]);
  useEffect(() => {
    console.log("Now Board List is available");
    api
      .get("/api/users/boards", {
        headers: {
          authorization: localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        setBoardList(response.data.boards);
      });
  }, []);
  return (
    <div className="board-list">
      <h1>All Boards</h1>
      <hr />

      <section className="boards">
        {boardList.map((board) => {
          return (
            <div className="board shadow" key={board._id}>
              <Link to={`/board/${board._id}/tasks`}>
                <h2>{board.boardName}</h2>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}
