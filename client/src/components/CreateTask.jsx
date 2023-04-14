import React, { useState } from "react";

export default function TaskCreate() {
    const clickAdd=()=>{
        console.log(setDescription)
       }
 const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');


  return (
    <>
      {/* <h3>Task Title</h3> */}
      <section>
                <label>Task Title : </label>
                <input type="text" value={title}onChange={(e) => setTitle(e.target.value)} />
            </section>
            <br/>
            <label >Task Description : </label>
      <textarea 
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>{" "}
      <button className="btn btn-primary mx-2" onClick={clickAdd}> Add </button>
    </>
  );
}
