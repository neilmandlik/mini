import { useEffect, useState } from "react"
import { putData } from "../../CRUDdata"

function EditQuestion({id,sendVal}){

    const [editQ,setEditQ]=useState("")

    // useEffect(()=>{
    //     console.log(isClicked)
    //     console.log(id)
    //     console.log(description)
    // })

    const handleEditChange=(event)=>{
        setEditQ(event.target.value)
    }

    const handleClick=async()=>{
        const toPut={
            question_id: id,
            question_desc: editQ
        }
        const editedList=await putData(toPut,"http://localhost:3002/api/json/updatefeedbackquestion")
        sendVal(false,editedList)
    }
    return(
        <>
            <input type="text" placeholder="Enter the question " onChange={handleEditChange} />
            <button className="buttons submit" onClick={handleClick}>Submit</button>
        </>
    )
}

export default EditQuestion