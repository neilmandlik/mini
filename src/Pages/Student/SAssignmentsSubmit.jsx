import { useEffect, useState } from "react"
import { Link, useFetcher, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { getData, putData } from "../../CRUDdata"

export async function sAssignmentSubmitLoader({request,params}){
    const sp=new URL(request.url).searchParams
    const{username,sub_id,asgn}=params
    const submDate=await getData(`http://localhost:3002/api/json/getasgndetails/${username}/${sub_id}/${asgn}`)
    const dDate=sp.get('deadline')
    return {dDate,submDate: submDate[0].submission_date} 
}

function SAssignmentsSubmit(){

    const navigate=useNavigate()
    const {sub_id,username,asgn}=useParams()
    const dateInfo=useLoaderData()
    const [submissionDate,setSub]=useState(dateInfo.submDate==="Not Submitted"?"":dateInfo.submDate)
    const isDate=dateInfo.dDate==="notGiven"



    // useEffect(()=>{
    //     console.log(sub_name)
    //     console.log(isDate)
    // },[])

    const handleSubmissionDate=(event)=>{
        setSub(event.target.value)
    }

    const handleUnsubmitAssignment=async()=>{
        const toPut={
            deadlineDate: dateInfo.dDate,
            username,
            subid:sub_id,
            asgn
        }
        console.log(toPut)
        await putData(toPut,"http://localhost:3002/api/json/unsubmitasgn")

        navigate('../..',{relative:'path'})
    }

    const handleExecuteSubmission=async(a)=>{
        const toPut={
            submissionDate: a,
            deadlineDate: dateInfo.dDate,
            username: username,
            subId: sub_id,
            asgn:asgn.slice(1)
        }
        console.log(toPut)
        await putData(toPut,'http://localhost:3002/api/json/updateasgndetails')
        navigate('../..',{relative: 'path'})
    }

    return(
        <>
            <br />
            <Link to='../..' relative="path">&larr;</Link>
            {!isDate?
            <>
                <section>
                    <input type="date" value={submissionDate} onChange={handleSubmissionDate}/>
                    {dateInfo.submDate==="Not Submitted"?                    
                    <button onClick={()=>handleExecuteSubmission(submissionDate)}>Submit</button>
                    :
                    <button onClick={()=>handleUnsubmitAssignment()}>Unsubmit</button>
                    }
                </section>
            </>
            :
            <>
                <section>
                    <p>The Assignment hasn't been allocated yet</p>
                </section>
            </>
            }

        </>
    )
}

export default SAssignmentsSubmit