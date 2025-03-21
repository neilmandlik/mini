import {Link, NavLink, useLoaderData, useParams } from "react-router-dom"
import AssignmentCard from "./AssignmentCard"
import { useState, useRef, useEffect } from "react"
import { getData, putData } from "../../CRUDdata"

export async function subAsgnLoader({params}){
    const{username,class_name, subName}=params   
    console.log(class_name)
    return getData(`http://localhost:3002/api/json/subAndAsgnInSpecClass/${username}/${class_name}/${subName}`)
}

function SubjectAssignment(){  
    
    const{username,class_name, subName}=useParams()
    const info=useLoaderData()
    const[inf,setInf]=useState(info)
    const[asgnList,setAList]=useState(inf.Assignments)
    const[allocate,setAllo]=useState("")
    const[isChecked,setIsChecked]=useState(false)
    const checkIdForOpt=useRef("-1")
    const prevCheckedId=useRef("-1")

    useEffect(()=>{
        console.log(info)
        setInf(info)
        setAList(info.Assignments)
    },[info])
    
    const handleCheckId=(i)=>{
        setAList([...asgnList])
        prevCheckedId.current=checkIdForOpt.current
        checkIdForOpt.current=i 
        if(prevCheckedId.current!=="-1" && prevCheckedId.current!==checkIdForOpt.current){
            document.getElementById(prevCheckedId.current).checked=false
        }   
    }
    const handleCheckAndSubmit=async(a,id,lock,subId,aName)=>{     
        prevCheckedId.current=id 
        const toPut={
            class_name:class_name,
            assignment_name:aName,
            subject_id: subId,
            assignment_id: id,
            allocation_date: a,
            isLocked: lock==="Locked"?"Unlocked":"Locked"
        }
        await putData(toPut,"http://localhost:3002/api/json/assignmenttrack") 
        const editedList=await getData(`http://localhost:3002/api/json/subAndAsgnInSpecClass/${username}/${class_name}/${subName}`)
        setAList(editedList.Assignments)
        setIsChecked(!isChecked)
        console.log(prevCheckedId)
        if(prevCheckedId.current!=="-1"){
            document.getElementById(prevCheckedId.current).checked=false
        } 
    }

    const handleDateChange=(event)=>{
        setAllo(event.target.value)        
    }

    return(
        <>
            {/* <br /> */}
            <div className="content-fac-ast" id="removeColor">
                {/* <NavLink to={`..`} relative="path">&larr;</NavLink>  */}
                {inf?
                inf.subjects.map((i,ind)=>
                    <div className="eachSub" key={ind}>
                        {
                            !asgnList?                        
                            "No New Assignments"
                            :
                            asgnList.filter((a)=>a.subject_id===i.subject_id).map((a,ind)=>
                            <div key={ind} className="assignmentCard">
                                <div className="detail">
                                </div>
                                    {a.assignment_name} <br />
                                    Scheduled Date: {a.scheduled_date} <br />
                                    Allocated Date: <input type="date" onChange={handleDateChange}/> <br />
                                    {a.isLocked}
                                    <input type="checkbox" id={`${a.f_assignment_id}`} className="options-fac-asgn" />
                                <label htmlFor={`${a.f_assignment_id}`}>
                                    <div onClick={()=>handleCheckId(a.f_assignment_id)} id="opt">Opt</div>
                                </label>
                                
                                {a.f_assignment_id===checkIdForOpt.current?<div onClick={()=>handleCheckAndSubmit(allocate,a.f_assignment_id,a.isLocked,a.subject_id,a.assignment_name)} className="optionElement lockUnlock">{a.isLocked==="Locked"?"Unlock":"Lock"}</div>:null}

                                <div id='submissionContainer'>
                                    <div className="submissionStat" id="onTime">
                                        <p className="subNumber">{a.onTime}</p>
                                        <p className="subNumber decreaseFont">On time</p>
                                    </div>
                                
                                    <div className="submissionStat" id="afterTime">
                                        <p className="subNumber">{a.lateSubmit}</p>
                                        <p className="subNumber decreaseFont">Late Submission</p>
                                    </div>
                                
                                    <div className="submissionStat" id="notSubmit">
                                        <p className="subNumber">{a.notSubmit}</p>
                                        <p className="subNumber decreaseFont">Not Submitted</p>                                    
                                    </div> 
                                </div>
                                <Link style={{"display": a.onTime==="0"&&a.lateSubmit==="0"?"none":null}} to={`${a.f_assignment_id}/gradesubmission`}><p>Grade</p></Link>
                            </div>
                        )
                        }
                    </div> 
                )
                :
                "No Assignments Allocated"} 
            </div>      
        </>
    )
}

export default SubjectAssignment