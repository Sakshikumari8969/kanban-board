import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Board from "./components/Board";
import BoardList from "./components/BoardList";
import CreateUser from "./components/CreateUser";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import TaskDetails from "./components/TaskDetails";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board/create" element={<Board />} />
          <Route path="/board/list" element={<BoardList />} />
          <Route path="/board/:boardId/tasks" element={<TaskList />} />
          <Route path="/board/:boardId/tasks/create" element={<CreateTask />} />
          <Route
            path="/board/:boardId/tasks/:taskId"
            element={<TaskDetails />}
          />
          <Route path="/accounts/login" element={<Login />} />
          <Route path="/accounts/register" element={<CreateUser />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
