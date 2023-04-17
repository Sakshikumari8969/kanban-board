import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

import { taskStatus } from "../constants";

const { DOING, DONE, REVIEW, TESTING, TODO } = taskStatus;

export default function TaskDetails() {
  const params = useParams();
  const [task, setTask] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    api.get(`/tasks/${params.taskId}`).then((response) => {
      const task = response.data.task;
      setTask(task);
    });
  }, []);

  const changeStatus = (status) => {
    api.patch(`/tasks/${task._id}`, { status: status }).then((response) => {
      const task = response.data.task;
      setTask(task);
    });
  };

  function handleSearchChange(event) {
    const search = event.target.value;

    if (!search) {
      return;
    }

    api.get(`/users?search=${search}`).then((response) => {
      const users = response.data.users;
      setUsers(users);
    });
  }

  function assignTask(user) {
    api
      .post(`/tasks/assign`, { user: user._id, task: task._id })
      .then((response) => {
        const task = response.data.task;
        setTask(task);
      });
  }

  return (
    <div className="task-details-wrapper">
      <h1>Task Details</h1>
      <hr />

      <tr>
        <td style={{ width: "50%", padding: "10px" }}>
          <div>
            <h1>{task?.title}</h1>
            <p>{task?.description}</p>

            <h2>Status : {task?.status}</h2>
          </div>

          <div className="">
            <h2>Members</h2>
            <ul className="user-list">
              {task?.members?.map((user) => (
                <li key={user._id} value={user._id}>
                  {user.name} [ {user.email} ]
                </li>
              ))}
            </ul>
          </div>
        </td>
        <td>
          <div>
            <h3>Change Status</h3>
            <hr />
            <button onClick={() => changeStatus(TODO)}>TODO</button>
            <button onClick={() => changeStatus(DOING)}>DOING</button>
            <button onClick={() => changeStatus(REVIEW)}>CODE REVIEW</button>
            <button onClick={() => changeStatus(TESTING)}>TESTING</button>
            <button onClick={() => changeStatus(DONE)}>COMPLETED</button>
          </div>

          <hr />

          <div>
            <h3>Assign Task</h3>

            <input
              type="text"
              placeholder="Search Member"
              onChange={handleSearchChange}
            />

            <ul className="user-list">
              {users?.map((user) => (
                <li
                  key={user._id}
                  value={user._id}
                  onClick={() => assignTask(user)}
                >
                  {user.name} [ {user.email} ]
                </li>
              ))}
            </ul>
          </div>
        </td>
      </tr>
    </div>
  );
}
