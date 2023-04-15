import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import Task from "./components/Task";
import Logo from "./components/Logo";
import Board from "./components/Board";
import TaskCreate from "./components/CreateTask";
console.log(process.env);

function Header() {
  return (
    <header>
      <div>Home</div>
      <div>Login</div>
      <div>Board</div>
      <div>Task</div>
    </header>
  );
}
export default function App() {
  return (
    <>
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Logo />} />
            <Route path="/board" element={<Board />} />
            <Route path="/task" element={<Task />} />
            <Route path="/taskcreate" element={<TaskCreate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CreateUser />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
