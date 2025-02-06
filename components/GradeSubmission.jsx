import React, { useEffect, useState } from "react"
import { getData } from "../CRUDdata"
import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom"

export async function gradeSubmissionLoader({params}){
    const{fAsgnId}=params
    return getData(`http://localhost:3002/api/json/seesubmission/${fAsgnId}`)
}
function GradeSubmission(){

    const info=useLoaderData()
    const navigate=useNavigate()
    const[onTimeShow,setOnTimeShow]=useState(true)
    const[lateShow,setLateShow]=useState(true)
    const[notShow,setNotShow]=useState(true)
    const[noSubmission,setNoSubmission]=useState(false)

    useEffect(()=>{
        if(info['onTimeSubmission'].length!==0){
            navigate(`${info['onTimeSubmission'][0].assignment_file_name}`)
        }
        else if(info['lateSubmission'].length!==0){
            navigate(`${info['lateSubmission'][0].assignment_file_name}`)
        }
        else{
            setNoSubmission(true)
        }
    },[])

    const handleOnTimeStudentShow=()=>{
        setOnTimeShow(!onTimeShow)
    }

    const handleLateStudentShow=()=>{
        setLateShow(!lateShow)
    }

    const handleNotStudentShow=()=>{
        setNotShow(!notShow)
    }

    const activeStyle={
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    return(
        <>
            <div>
                <nav>
                    <button onClick={handleOnTimeStudentShow}>{onTimeShow?"v":">"} On-Time Submission</button> 
                    {info['onTimeSubmission'].length!==0 && onTimeShow
                    ?  
                    info['onTimeSubmission'].map(ele=>
                        <NavLink to={`${ele.assignment_file_name}`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>{ele.student_name}</NavLink>
                    )
                    :
                    null
                    }
                    <button onClick={handleLateStudentShow}>{lateShow?"v":">"} Late Submission</button> 
                    {info['lateSubmission'].length!==0 && lateShow
                    ?  
                    info['lateSubmission'].map(ele=>
                        <NavLink to={`${ele.assignment_file_name}`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>{ele.student_name}</NavLink>
                    )
                    :
                    null
                    }
                    <button onClick={handleNotStudentShow}>{notShow?"v":">"} Not Submitted</button>
                    {info['notSubmitted'].length!==0 && notShow
                    ?  
                    info['notSubmitted'].map(ele=>
                        <><span>{ele.student_name}</span> &nbsp; &nbsp;</>
                    )
                    :
                    null
                    }
                    
                </nav>
                {noSubmission?null:<Outlet/>}
            </div>
        </>
    )
}
export default GradeSubmission