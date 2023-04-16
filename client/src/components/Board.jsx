import React, { useState } from "react";
import "../styles/Board.css";
import {api} from "../api"
import { useNavigate } from "react-router-dom";


export default function Board() {
  const [boardName, setBoardName] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessages, setSuccessMessage] = useState("");
const token=localStorage.getItem("token")
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

  //   if (name && board) {
  //     console.log(name);
  //     console.log(board);
  //     setName("");
  //     setBoard("");
  //   } else {
  //     alert("Please enter the complete fields");
  //   }
  // };

  setErrorMessage("")
    setSuccessMessage("")


    api.post(`/api/board/create`,{
      boardName:boardName,
     user:user
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    
    }).then((response)=>{
      // const data=response.data;
      console.log(response);
      setSuccessMessage("Board created Successfully")
      navigate(`/board/${response.data.boardId}/tasks`)
    }).catch((error)=>{
      console.log(error);
    setErrorMessage("creation failed")
    });
    console.log({boardName,user});
  }


  return (
    < >
      <div className="login-container shadow" style={{backgroundColor:"#D0BDF4"}}>
        <h3 style={{textAlign:"center"}}>Board</h3>
        <hr />
      {errorMessage && <p className="error">{errorMessage}</p>}

      {successMessages && <p className="success">{successMessages}</p>}


        <form onSubmit={handleSubmit}>
          <section>
            <label>Board Name : </label>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </section>
          <br />
          <section>
          <label>user : </label>
          <input
            type="text"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}/>
        </section>
          <br />
          <button type="submit">Add Board </button>
        </form>
      </div>
    </>
  );
}
