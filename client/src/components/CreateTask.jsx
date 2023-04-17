import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { taskStatus } from "../constants";

const { DOING, DONE, REVIEW, TESTING, TODO } = taskStatus;

export default function TaskCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(TODO);
  const [board, setBoard] = useState();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    api.get(`/boards/${params.boardId}`).then((response) => {
      const data = response.data;
      setBoard(data.board);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      status,
      board: board._id,
    };

    if (!title && !description && !status && !board._id)
      return alert("Fill The form");

    api.post("/tasks", task).then((response) => {
      navigate(-1);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="create-task-form shadow">
        <section>
          <h4 className="success">Add task to the Board {board?.boardName}</h4>

          <hr />
          <div>
            <label>Task Title : </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <br />

          <label htmlFor="">Select Status</label>

          <select
            onChange={(e) => setStatus(e.target.value)}
            name="status"
            id=""
          >
            <option value={TODO}>{TODO}</option>
            <option value={DOING}>{DOING}</option>
            <option value={TESTING}>{TESTING}</option>
            <option value={REVIEW}>{REVIEW}</option>
            <option value={DONE}>{DONE}</option>
          </select>

          <br />
          <div>
            <label>Task Description : </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              rows="5"
            ></textarea>
          </div>
          <br />
          <button className="btn btn-primary mx-2">Add Task</button>
        </section>
      </form>
    </>
  );
}
