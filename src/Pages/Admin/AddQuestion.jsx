import { useEffect, useState, useRef } from "react"
import { postData } from "../../CRUDdata"

function AddQuestion({isClicked,id,getClicked,fnum}){
    const[question,setQuestion]=useState("")

    useEffect(()=>{
        console.log("Hello")
    })

    const handleQuestionChange=(event)=>{
        setQuestion(event.target.value)

    }

    const handleOnClick=async()=>{
        if(question!==""){
            const toPost={
                question_desc: question,
                question_id: `question${parseInt(id.slice(id.indexOf('n')+1))+1}`,
                ffId: fnum
            }
            setQuestion("")
            const newQuestionList=await postData(toPost,"http://localhost:3002/api/json/postfeedbackquestion")
            getClicked(false,newQuestionList)
        }
    }

    if(isClicked){
        return(
            <>
                <label htmlFor="write-question">Enter Question: </label>
                <input type="text" id="write-question" placeholder="Type your question here" value={question} onChange={handleQuestionChange} />
                <button className="buttons submit-for-add-question" onClick={handleOnClick}>Submit</button>
            </>
        )

    }
    else{
        return null
    }
}

export default AddQuestion