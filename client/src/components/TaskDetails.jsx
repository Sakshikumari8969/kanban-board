import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

import { taskStatus } from "../constants";

const { DOING, DONE, REVIEW, TESTING, TODO } = taskStatus;

export default function TaskDetails() {
  const params = useParams();

  const [task, setTask] = React.useState();
  useEffect(() => {
    api.get(`/api/tasks/${params.taskId}`).then((response) => {
      const task = response.data.task;

      setTask(task);
    });
  }, []);

  const changeStatus = (status) => {
    api.patch(`/api/tasks/${task._id}`, { status: status }).then((response) => {
      const task = response.data.task;
      setTask(task);
    });
  };

  return (
    <div>
      <h1>Task Details</h1>
      <hr />

      <tr>
        <td style={{ width: "50%", padding: "10px" }}>
          <div>
            <h1>{task?.title}</h1>
            <p>{task?.description}</p>

            <h2>Status : {task?.status}</h2>
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
        </td>
      </tr>
    </div>
  );
}
