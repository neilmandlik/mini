import { useLoaderData } from "react-router-dom"
import { deleteData, getData, postData, putData } from "../../CRUDdata"
import { useRef, useState, useEffect } from "react"
import AddQuestion from "./AddQuestion"
import EditQuestion from "./EditQuestion"

export async function feedbackPreviewLoader(){
    return getData("http://localhost:3002/api/json/getfeedbackquestions")
}

function FeedbackPreview(){
    const [info,setInfo]=useState(useLoaderData()[0])
    const [isLaunched,setIsLaunched]=useState(useLoaderData()[1][0]['isLaunched'])
    const [launchOrTerm,setLNT]=useState(isLaunched!=="Y"?"Launch Feedback Form":"Terminate and Save Responses")
    const [isC,setIsC]=useState(false)
    const [isEditClicked,setIsEC]=useState(false)
    const qid=useRef()
    const indOfQuestion=useRef()
    const [qdsc,setQdsc]=useState("")
    const [formNumber,setFN]=useState(useLoaderData()[1][0]['fnum'])
    const [year,setYear]=useState("")
    const [semester,setSem]=useState(0)
    const [formNumberForSemester,setFormNumber]=useState(0)
    // useEffect(()=>{
    //     console.log(isLaunched)
    // })

    const handleYearChange=(event)=>{
        setYear(event.target.value)
    }

    const handleSemesterChange=(event)=>{
        setSem(event.target.value)
    }

    const handleFormNumberChange=(event)=>{
        setFormNumber(event.target.value)
    }

    const handleNewFeedbackForm=async()=>{
        if(year!=="" && semester!==0 && formNumberForSemester!==0){
            const toPost={
                formNumber: `f${parseInt(formNumber)+1}`,
                year,
                semester,
                formNumberForSemester
            }

            const edited=await postData(toPost,"http://localhost:3002/api/json/addnewfeedbackform")
            setInfo(edited[0])
            setIsLaunched(edited[1][0]['isLaunched'])
            setFN(edited[1][0]['fnum'])
        }
        else{
            console.log("Invalid")
        }
    }

    const handleFeedbackFormState=async(a)=>{
        if(a){
            const toPut={
                isLaunched: 'Y',
            }
            const edited=await putData(toPut,"http://localhost:3002/api/json/changefeedbackformstate")
            setIsLaunched(edited) 
            setLNT('Terminate and Save Responses')           
        }
        else{
                const toPut={
                    isLaunched: 'D',
                }
                const edited=await putData(toPut,"http://localhost:3002/api/json/changefeedbackformstate")
                setIsLaunched(edited)
                setLNT('Launch Feedback Form') 
        }
    }

    const handleDeleteQuestion=async(q)=>{
        console.log(q)
        const listDeleted=await deleteData(`http://localhost:3002/api/json/deletefeedbackquestion/${q}`)
        setInfo(listDeleted)
    }

    const handleSetEdit=(v1,v2)=>{
        setIsEC(v1)
        setInfo(v2)
    }

    const handleEditQuestion=(qi,qds,i)=>{
        qid.current=qi
        indOfQuestion.current=i
        setQdsc(qds)
        setIsEC(true)
    }

    const handleSetFalse=(data1,data2)=>{
        setIsC(data1)
        setInfo(data2)
    }

    const handleAddQuestion=()=>{
        setIsC(true)
    }
    return(
        <>
            <br />
            {isLaunched==='D'?
            <>
                <label htmlFor="feedbackYear">Enter Academic Year: </label>
                <input type="text" id="feedbackYear" value={year} placeholder="Eg: 2024-25" onChange={handleYearChange}/> <br />
                <label htmlFor="feedbackSemester" value={semester}>Enter Semester: </label>
                <input type="number" id="feedbackSemester" onChange={handleSemesterChange}/> <br />
                <label htmlFor="formNumberForSemester" value={formNumberForSemester} >Enter Form Number for this Semester: </label>
                <input type="number" id="formNumberForSemester" onChange={handleFormNumberChange}/> <br />
                <button onClick={handleNewFeedbackForm}>Create New Feedback Form</button>
            </>
            :
            <>
                <button onClick={()=>handleFeedbackFormState(isLaunched!=='Y')}>{launchOrTerm}</button>
                <button disabled={isLaunched==="Y"} onClick={handleAddQuestion} className="end">+</button> 
                <br />
                <AddQuestion isClicked={isC} id={info[info.length-1]['question_id']} getClicked={handleSetFalse} fnum={formNumber}/>
                <br />            
            </>
            }
            
            {info.map((ele,ind)=>
                <>
                    <div className="feedbackQuestion" key={ind}>
                        <p>{ind+1}) {ele.question_desc}</p>
                        <button disabled={isLaunched==="Y"} onClick={()=>handleEditQuestion(ele.question_id,ele.question_desc,ind)}>Edit</button>
                        <button disabled={isLaunched==="Y"} onClick={()=>handleDeleteQuestion(ele.question_id)}>Delete</button>
                    </div>

                    {isEditClicked && ind===indOfQuestion.current?<EditQuestion isClicked={isEditClicked} id={qid.current} description={qdsc} sendVal={handleSetEdit}/>:""}
                </>
            )}
        </>
    )
}

export default FeedbackPreview