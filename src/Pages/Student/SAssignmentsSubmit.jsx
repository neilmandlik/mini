import { Link, useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"
import { getData } from "../../CRUDdata"

export async function sAssignmentSubmitLoader({params}){
    const{username,sub_name}=params
    return getData(`http://localhost:3002/api/json/studentassignment/${username}/${sub_name}`)
}
function SAssignmentSubmit(){
    
    const[asgnList1]=useState(useLoaderData())

    return(
    <>
        <br />
        <Link to={'..'} relative="path" >&larr;</Link>
        <br />
        {
            asgnList1.length===0?                        
            "No New Assignments"
            :
            asgnList1.map((a,ind)=>
                <div key={ind} className="assignmentCard">
                    {a.Assignment_Name} <br />
                    {a.Deadline}
                </div>
            )
        }
        <br />

    </>)
}

export default SAssignmentSubmit