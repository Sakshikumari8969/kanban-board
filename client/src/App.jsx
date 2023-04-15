import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import TaskList from "./components/TaskList";
import Logo from "./components/Logo";
import Board from "./components/Board";
import TaskCreate from "./components/CreateTask";
import Header from "./components/Header";
import { Fragment } from "react";
import BoardList from "./components/BoardList";
import TaskDetails from "./components/TaskDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Logo />} />
          <Route path="/board/create" element={<Board />} />
          <Route path="/board/list" element={<BoardList />} />
          <Route path="/board/:boardId/tasks" element={<TaskList />} />
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
