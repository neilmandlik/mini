import { NavLink, useLoaderData, useParams } from "react-router-dom"
import AssignmentCard from "./AssignmentCard"
import { useState, useRef } from "react"
import { deleteData, getData, postData, putData } from "../../CRUDdata"

export async function subAsgnLoader({params}){
    const{username,class_name}=params
    return getData(`http://localhost:3002/api/json/subAndAsgnInSpecClass/${username}/${class_name}`)
}

function SubjectAssignment(){  


    
    const{username,class_name}=useParams()
    const[inf]=useState(useLoaderData())
    const[asgnList,setAList]=useState(inf.Assignments)
    const[asgnName,setAsgn]=useState("")
    const[deadLine,setDead]=useState("")
    const[isChecked,setIsChecked]=useState(false)
    const act=useRef("")
    const editAsgn=useRef("")
    const editDead=useRef("")
    const identify=useRef(inf.Length)
    const checkIdentify=useRef("0")
    const checkIdForOpt=useRef("-1")
    const prevCheckedId=useRef("-1")
    // const[isOptcheck,setOpt]=useState(false)

    const deleteCard=async(i)=>{
        await deleteData(`http://localhost:3002/api/json/deleteassignment/${i}`)
        const afterDelete=await getData(`http://localhost:3002/api/json/subAndAsgnInSpecClass/${username}/${class_name}`)
        setAList(afterDelete.Assignments)
        prevCheckedId.current="-1"
        checkIdForOpt.current="-1"
    }

    const handleCheckId=(i)=>{
        setAList([...asgnList])
        prevCheckedId.current=checkIdForOpt.current
        checkIdForOpt.current=i 
        if(prevCheckedId.current!=="-1" && prevCheckedId.current!==checkIdForOpt.current){
            document.getElementById(prevCheckedId.current).checked=false
        }   
    }

    const getFromCard=(a,d)=>{
        setAsgn(a)
        setDead(d)
    }

    const handleCheck=(actio,a,i,d)=>{        
        prevCheckedId.current=checkIdForOpt.current
        setIsChecked(!isChecked)
        act.current=actio
        editAsgn.current=a
        editDead.current=d
        checkIdentify.current=i
        if(prevCheckedId.current!=="-1"){
            document.getElementById(prevCheckedId.current).checked=false
        } 
    }

    const handleEditAndSubmit=async(a)=>{        
        const toPut={
            "id": checkIdentify.current,
            "Assignment_Name": asgnName,
            "Deadline":deadLine
        }
        await putData(toPut,"http://localhost:3002/api/json/assignmenttrack")
        const edited=await getData(`http://localhost:3002/api/json/subAndAsgnInSpecClass/${username}/${class_name}`)
        setAList(edited.Assignments)
        setIsChecked(!isChecked)
        act.current=a
    }

    const handleCheckAndSubmit=(subname,subtype,identify,a)=>{      
        if(asgnName!==""){
            const toPost={
                "id":identify.current.toString(),
                "Assignment_Name": asgnName,
                "Deadline": deadLine,
                "Subject": subname,
                "Subject_Type": subtype,
                "Class_name": class_name
            }
            postData(toPost,"http://localhost:3002/api/json/assignmenttrack") 
            setAList([toPost,...asgnList])
            setIsChecked(!isChecked)
            act.current=a
            identify.current++
        }
    }

    return(
        <>
            <br />
            <NavLink to={`..`} relative="path">&larr;</NavLink> 
            {inf?
            inf.subjects.map((i,ind)=>
                <div className="eachSub" key={ind}>
                    {i.subject_type}: {i.subject_name} <br />
                    <input type="checkbox" id={`submitnew${ind}`} className="submitnew" />
                    <label htmlFor={`submitnew${ind}`} >
                        <div onClick={()=>handleCheck("new")} id="open">+</div>
                        <div onClick={()=>handleCheck("close")} className="close">X</div>
                        <div onClick={()=>handleCheckAndSubmit(i.subject_name,i.subject_type,identify,"complete")} className="complete">Done</div>                   
                    </label>
                    {
                        !asgnList?                        
                        "No New Assignments"
                        :
                        asgnList.filter((a)=>a.Subject_Type===i.subject_type).map((a,ind)=>
                        <div key={ind} className="assignmentCard">
                            {a.Assignment_Name} <br />
                            {a.Deadline}
                            <input type="checkbox" id={`${a.id}`} className="options" />
                            <label htmlFor={`${a.id}`}>
                                <div onClick={()=>handleCheckId(a.id)} id="opt">Opt</div>
                            </label>
                            <input type="checkbox" id="editAlloc" />
                            <label htmlFor="editAlloc">
                                {a.id===checkIdForOpt.current?<div onClick={()=>handleCheck("edit",a.Assignment_Name,a.id,a.Deadline)} id="edit">Edit</div>:null}
                                <div onClick={()=>handleCheck("close")} className="close">X</div>
                                <div onClick={()=>handleEditAndSubmit("complete")} className="complete">Done</div>
                            </label>
                            {act.current==='edit'?<AssignmentCard isChecked={isChecked} asg={editAsgn.current} dead={editDead.current} sendToCol={getFromCard} />:null}
                            {a.id===checkIdForOpt.current?<div onClick={()=>deleteCard(a.id)} className="optionElement">Delete</div>:null}
                        </div>
                    )
                    }
                    
                    {act.current==='new'?<AssignmentCard isChecked={isChecked} asg={""} dead={""} sendToCol={getFromCard} />:null}
                </div> 
            )
            :
            "No Assignments Allocated"}       
        </>
    )
}

export default SubjectAssignment