import React, { useState } from "react";
import "./Task.css";
export default function Task() {
  const [todo, setTodo] = useState("");
  const [doing, setDoing] = useState("");
  const [review, setReview] = useState("");
  const [testing, setTesting] = useState("");
  const [done, setDone] = useState("");

  //Todo:Any one:

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo || doing || review || testing || done) {
      console.log(todo);
      console.log(doing);
      console.log(review);
      console.log(testing);
      console.log(done);

      setTodo("");
      setDoing("");
      setReview("");
      setTesting("");
      setDone("");
    } else {
      alert("Please enter any of the fields");
    }
  };

  return (
    <>
      <div className="task-container">
        <form onSubmit={handleSubmit}>
          <h3>ToDo</h3>
          <textarea
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          ></textarea>{" "}
          <br />
          <button
            onClick={() => {
              let newTodo = todo;
              setTodo(newTodo.toLowerCase());
            }}
          >
            Add
          </button>
          <p>{todo}</p>
          <div style={{ writingMode: "" }}>
            <h3>Doing</h3>
            <textarea
              value={doing}
              onChange={(e) => {
                setDoing(e.target.value);
              }}
            ></textarea>{" "}
            <br />
            <button
              onClick={() => {
                let newTodo = todo;
                setDoing(newTodo.toLowerCase());
              }}
            >
              Add
            </button>
            <p>{doing}</p>
          </div>
          <h3>Review</h3>
          <textarea
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          ></textarea>{" "}
          <br />
          <button
            onClick={() => {
              let newTodo = todo;
              setReview(newTodo.toLowerCase());
            }}
          >
            Add
          </button>
          <p>{review}</p>
          <h3>Testing</h3>
          <textarea
            value={testing}
            onChange={(e) => {
              setTesting(e.target.value);
            }}
          ></textarea>{" "}
          <br />
          <button
            onClick={() => {
              let newTodo = todo;
              setTesting(newTodo.toLowerCase());
            }}
          >
            Add
          </button>
          <p>{testing}</p>
          <h3>Done</h3>
          <textarea
            value={done}
            onChange={(e) => {
              setDone(e.target.value);
            }}
          ></textarea>{" "}
          <br />
          <button
            onClick={() => {
              let newTodo = todo;
              setDone(newTodo.toLowerCase());
            }}
          >
            Add
          </button>
          <p>{done}</p>
        </form>
      </div>
    </>
  );
}
