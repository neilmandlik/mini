import React,{useEffect, useState} from "react"
function AssignmentCard({isChecked,asg,dead,sendToCol}){
    
    const[asgnName,setAsg]=useState(asg)
    const[deadLine,setDea]=useState(dead)

    useEffect(()=>{
        if(asgnName!==asg || deadLine!==dead){   
            sendToCol(asgnName,deadLine)
        }
        if(!isChecked){
            setAsg("")
            setDea("")
        }
    },[isChecked,asgnName,deadLine,sendToCol])

    const handleNameChange=(event)=>{
        setAsg(event.target.value)
    }

    const handleDateChange=(event)=>{
        setDea(event.target.value)
    }

    return(
        <>
            <div id="details">
                        Assignment Name: <input type="text" id="assignmentname" value={asgnName} onChange={handleNameChange}/> <br /> <br />
                        Deadline: <input type="date" value={deadLine} onChange={handleDateChange} /> <br /> <br />
            </div>
            <div className="assignmentdetails"></div>            
            <div className={isChecked===true && (asgnName===asg||asgnName==="") && (deadLine===dead||deadLine==="")?"filter":"filter notFulfill"} ></div> <br /> <br /> <br />
        </>
    )
}

export default AssignmentCard