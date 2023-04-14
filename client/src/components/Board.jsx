import React,{useState} from "react"
import "./Board.css"
export default function Board(){
    const [board,setBoard]=useState('')
    const[name,setName]=useState('')
    return (
        <>
        <div>
            <h3>Board</h3>
            <section>
                <label>Name : </label>
                <input type="text" value={name}onChange={(e) => setName(e.target.value)} />
            </section>
          
            <br/>
            <textarea type="table" value={board} onChange={(e)=>{setBoard(e.target.value)
            }}>
                </textarea>{" "}
            <br/>
            <button type="submit">Add Board </button>
        </div>
        </>
    )
}




































// export default function Board(){
//     const [column,setColumn]=useState([{
//         id:"column1",
//         title:"todo",
//         cards:[
//             {id:"card1" ,title:"Task1"},
//             {id:"card2",title:"Task2"}
//         ]

//     }
//     ])}

    