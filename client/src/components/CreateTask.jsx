import React, { useState } from "react";

export default function TaskCreate() {
    const clickAdd=()=>{
        console.log(setDescription)
       }
 const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title&&description) {
      console.log(title);
      console.log(description);  
      setTitle('')
      setDescription('')
      
    } else {
      alert("Please enter the complete fields");
    }

  };

  return (
    <>
      {/* <h3>Task Title</h3> */}
      <form onSubmit={handleSubmit}>
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
      </form>
    </>
  );
}
