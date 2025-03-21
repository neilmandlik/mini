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
    const feedbackTypeArray=Object.keys(info.questions)
    const relCurquest=useRef(0)
    const [selected,setSelected]=useState({})
    const [subType,setSubType]=useState(feedbackTypeArray[0])
    const [question,setQuestion]=useState(info.questions['theory'][0][`question_desc`])
    const isLaunched=info['isLaunched']
    const navigate=useNavigate()

    useEffect(()=>{
        setQuestion(info.questions[subType][relCurquest.current]['question_desc'])        
    },[subType])

    const handleAnswerChange=(i,ind)=>{
        const fac=info.faculties.filter(ele=>ele.subject_type===subType)

        setSelected(s=>({
            ...s,
            [`${i+info.faculties.length*curqeust.current}`]: `q${curqeust.current}f${fac[i].merge_id}o${ind}`
        }))
    }    


    const handlePrevChange=()=>{

        curqeust.current--
        if(relCurquest.current===0){
            const sub=feedbackTypeArray[feedbackTypeArray.indexOf(subType)-1]
            relCurquest.current=info.questions[sub].length-1
            setSubType(sub)
        }
        else{
            relCurquest.current--
            setQuestion(info.questions[subType][relCurquest.current][`question_desc`]) 
        }
 
    }

    const handleNextChange=()=>{
        // for(let i=0;i<3;i++){
        //     console.log(document.getElementById(`feedback${curqeust.current}${i}`))
        //     document.getElementById(`feedbac}`).checked=false
        // }
        
        curqeust.current++

        if(relCurquest.current===info.questions[subType].length-1){
            relCurquest.current=0
            setSubType(feedbackTypeArray[feedbackTypeArray.indexOf(subType)+1])
            
        }        
        else{
            relCurquest.current++
            setQuestion(info.questions[subType][relCurquest.current][`question_desc`])  
        }
    }

    const handleSubmitFeedback=async()=>{
        navigate("complete")
        await putData({selOpts:selected,arrOfRes:feedbackArray,user:username},"http://localhost:3002/api/json/feedback")
    }

    return(
        <>
            {isLaunched!=='Y'?
                <p style={{"alignContent": "center", "justifyContent": "center", "marginLeft": "40%"}}>Admin has restricted access to the Feedback Form</p>
            :
                <>
                    <div class="box content">
                        <div class="question">
                            <div id="q-no">
                                <section id="q">Q.</section>
                            </div>
                            <section id="question">{question}</section>
                        </div>
                        <div class="responses">
                            {info.faculties.filter(ele=>ele.subject_type===subType).map((e,i)=>
                                <fieldset id="teacher1" class="options-fieldset" key={i}>
                                    <legend><p id="teacher-name">{e.faculty_name}</p> <p id="sub">{e.abbreviation}</p></legend>
                                    <div class="options">
                                        {feedbackArray.map((f,ind)=>
                                            <>
                                                <div class="label-button">
                                                    <input 
                                                    type="radio"
                                                    name={`feedback${curqeust.current}${i}`} 
                                                    id={`q${curqeust.current}f${info.faculties[i].merge_id}o${ind}`} 
                                                    checked={selected[i+info.faculties.length*curqeust.current]?selected[i+info.faculties.length*curqeust.current].slice(selected[i+info.faculties.length*curqeust.current].indexOf('o')+1)==ind:false} 
                                                    onChange={()=>handleAnswerChange(i,ind)} />
                                                    {f}
                                                </div>
                                            </>                            
                                        )}
                                    </div>
                                </fieldset>                                
                            )}
                        </div>
                    
                        

                        <div class="controls">
                            <div class="control">
                                <button class="buttons previous" disabled={curqeust.current===0||info.questions[subType].length===0}onClick={handlePrevChange}>Previous</button> &nbsp;
                                <button class="buttons next" disabled={curqeust.current===info.qlength-1||info.questions[subType].length===0} onClick={handleNextChange}>Next</button>
                            </div>
                            <button class="buttons submit" style={info.feedbackLength!==Object.keys(selected).length?{"display":"none"}:null} onClick={handleSubmitFeedback}>Submit</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default StudentFeedback