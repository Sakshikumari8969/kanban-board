import "./App.css";
// import Axios from "axios"
// import {useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import Task from "./components/Task";
import Logo from "./components/Logo";
import Board from "./components/Board";
import TaskCreate from "./components/CreateTask"
console.log(process.env)

function Header(){
  return <header>
    <div>Home</div>
    <div >Login</div>
    <div>Board</div>
    <div>Task</div>
  </header>
}
export default function App() {
  // const [data,setData]=useState('')
  // const getData=async()=>{
  //   const ress=await Axios.get("http://localhost:3001/getData")
  //   setData(ress.data)
  // }

  // useEffect(()=>{
  //   getData()
  // },[])
  
  return (
    <>
    
    <Header/>
    <main>
     <BrowserRouter>
         
        <Routes>
          <Route path="/" element={<Logo/>}/>
          <Route path="/board" element={<Board/>} />
          <Route path="/task" element={<Task/>} />
          <Route path="/taskcreate" element={<TaskCreate/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<CreateUser/>} />
        
        </Routes>
      </BrowserRouter>
</main>
      </>
  )
};

