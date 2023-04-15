import React, { useEffect, useMemo, useState } from "react";
import "../styles/Task.css";
import { api } from "../api";
import { Link, useParams } from "react-router-dom";

import { taskStatus } from "../constants";

const { DOING, DONE, REVIEW, TESTING, TODO } = taskStatus;
//DOING, DONE, REVIEW, TESTING, TODO
export default function TaskList() {
  const params = useParams();
  const [tasks, setTasks] = useState([]);

  const { doingTasks, doneTasks, reviewTasks, testingTasks, todoTasks } =
    useMemo(() => {
      const todoTasks = tasks.filter((task) => task.status === TODO);
      const doingTasks = tasks.filter((task) => task.status === DOING);
      const reviewTasks = tasks.filter((task) => task.status === REVIEW);
      const doneTasks = tasks.filter((task) => task.status === DONE);
      const testingTasks = tasks.filter((task) => task.status === TESTING);
      return {
        todoTasks,
        doingTasks,
        reviewTasks,
        doneTasks,
        testingTasks,
      };
    }, [tasks]);

  useEffect(() => {
    api
      .get(`/api/boards/${params.boardId}/tasks`, {
        headers: {
          authorization: localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        const tasks = response.data.tasks;

        setTasks(tasks);
      });
  }, []);

  const getShortDescription = (description) => {
    if (description.length > 50) {
      return description.substring(0, 50) + "...";
    } else {
      return description;
    }
  };

  const renderTask = (list) => {
    return list.map((task) => (
      <div className="task shadow" key={task._id}>
        <Link to={task._id}>
          <div>
            <h2>{task.title}</h2>
            <p>{getShortDescription(task.description)}</p>
          </div>
        </Link>
      </div>
    ));
  };
  return (
    <div>
      <section className="task-container">
        <div className="task-list todo-list">
          <div className="heading">
            <h1>TODO</h1>
          </div>
          {renderTask(todoTasks)}
        </div>

        <div className="task-list doing-list">
          <div className="heading">
            <h1>DOING</h1>
          </div>
          {renderTask(doingTasks)}
        </div>

        <div className="task-list review-list">
          <div className="heading">
            <h1>REVIEW</h1>
          </div>
          {renderTask(reviewTasks)}
        </div>
        <div className="task-list testing-list">
          <div className="heading">
            <h1>TESTING</h1>
          </div>
          {renderTask(testingTasks)}
        </div>
        <div className="task-list done-list">
          <div className="heading">
            <h1>DONE</h1>
          </div>
          {renderTask(doneTasks)}
        </div>
      </section>
    </div>
  );
}
