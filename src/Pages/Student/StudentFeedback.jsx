import { redirect, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { getData, putData } from "../../CRUDdata"
import { useEffect, useRef, useState } from "react"
export async function studentFeedBackLoader({params}){
    const {username}=params
    return getData(`http://localhost:3002/api/json/feedbackof/${username}`)

}

function StudentFeedback(){

    const{username}=useParams()
    const info=useLoaderData()
    const feedbackArray=['Not Satisfied','Neutral','Satisfied','Very Satisfied']
    const curqeust=useRef(0)
    const[selected,setSelected]=useState({})
    const [question,setQuestion]=useState(info.questions[0][`question_desc`])
    const isLaunched=info['isLaunched']
    const navigate=useNavigate()


    const handleAnswerChange=(i,ind)=>{
        setSelected(s=>({
            ...s,
            [`${i+info.faculties.length*curqeust.current}`]: `q${curqeust.current}f${info.faculties[i].merge_id}o${ind}`
        }))
    }    


    const handlePrevChange=()=>{
        curqeust.current--
        setQuestion(info.questions[curqeust.current][`question_desc`])
 
    }

    const handleNextChange=()=>{
        // for(let i=0;i<3;i++){
        //     console.log(document.getElementById(`feedback${curqeust.current}${i}`))
        //     document.getElementById(`feedbac}`).checked=false
        // }
        
        curqeust.current++
        setQuestion(info.questions[curqeust.current][`question_desc`])        
    }

    const handleSubmitFeedback=async()=>{
        navigate("complete")
        await putData({selOpts:selected,arrOfRes:feedbackArray,user:username},"http://localhost:3002/api/json/feedback")
    }

    return(
        <>
            {isLaunched!=='Y'?
                <p>Admin has restricted access to the Feedback Form</p>
            :
                <>
                {question}
                {info.faculties.map((e,i)=>
                    <div key={i} id="neil">
                        <p>{e.faculty_name} for {e.subject_name}: </p> &nbsp; &nbsp;
                        {feedbackArray.map((f,ind)=>
                            <>
                                <input 
                                type="radio"
                                name={`feedback${curqeust.current}${i}`} 
                                id={`q${curqeust.current}f${info.faculties[i].pair_id}o${ind}`} 
                                checked={selected[i+info.faculties.length*curqeust.current]?selected[i+info.faculties.length*curqeust.current].slice(selected[i+info.faculties.length*curqeust.current].indexOf('o')+1)==ind:false} 
                                onChange={()=>handleAnswerChange(i,ind)} />
                                <span>{f}</span>
                            </>
                            
                        )}
                    </div>
                )}
                <button disabled={curqeust.current===0}onClick={handlePrevChange}>Previous</button> &nbsp;
                <button disabled={curqeust.current===info.qlength-1} onClick={handleNextChange}>Next</button>
                <button disabled={info.faculties.length*info.qlength!==Object.keys(selected).length} onClick={handleSubmitFeedback}>Submit</button>
                </>
            }
        </>
    )
}

export default StudentFeedback