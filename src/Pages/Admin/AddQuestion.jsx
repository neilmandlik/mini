import { useEffect, useState, useRef } from "react"
import { postData } from "../../CRUDdata"

function AddQuestion({isClicked,id,getClicked,fnum}){
    const[question,setQuestion]=useState("")

    const handleQuestionChange=(event)=>{
        setQuestion(event.target.value)

    }

    const handleOnClick=async()=>{
        if(question!==""){
            const toPost={
                question_desc: question,
                question_id: `question${parseInt(id.slice(id.indexOf('n')+1))+1}f${fnum}`
            }
            setQuestion("")
            console.log(parseInt(id.slice(id.indexOf('n')+1)))
            const newQuestionList=await postData(toPost,"http://localhost:3002/api/json/postfeedbackquestion")
            getClicked(false,newQuestionList)
        }
    }

    if(isClicked){
        return(
            <>
                <label htmlFor="addQuestion">Enter Question: </label>
                <input type="text" id="addQuestion" value={question} onChange={handleQuestionChange} />
                <button onClick={handleOnClick}>Submit</button>
            </>
        )

    }
    else{
        return null
    }
}

export default AddQuestion