import { useEffect, useState } from "react"
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { deleteData, getData, postFile, putData } from "../../CRUDdata"

export async function sAssignmentSubmitLoader({request,params}){
    const sp=new URL(request.url).searchParams
    const{username,sub_id,asgn}=params
    const submDate=await getData(`http://localhost:3002/api/json/getasgndetails/${username}/${sub_id}/${asgn}`)
    const dDate=sp.get('deadline')
    return {dDate,submDate: submDate[0].submission_date, fileName: submDate[0].assignment_file_name} 
}

function SAssignmentsSubmit(){

    const navigate=useNavigate()
    const {sub_id,username,asgn}=useParams()
    const dateInfo=useLoaderData()
    const [submissionDate,setSub]=useState(dateInfo.submDate==="Not Submitted"?"":dateInfo.submDate)
    const isDate=dateInfo.dDate==="notGiven"
    const [file,setFile]=useState()

    // useEffect(()=>{
    //     console.log(isDate)
    //     console.log(dateInfo)
    // },[])

    const handleSubmissionDate=(event)=>{
        setSub(event.target.value)
    }

    const handleFileChange=(e)=>setFile(e.target.files[0])

    const handleUnsubmitAssignment=async()=>{
        const toPut={
            deadlineDate: dateInfo.dDate,
            username,
            subid:sub_id,
            asgn
        }
        await putData(toPut,"http://localhost:3002/api/json/unsubmitasgn")
        const edited=await deleteData(`http://localhost:3002/api/json/deletefile/${dateInfo.fileName}`)
        console.log(edited.message)
        navigate('../..',{relative:'path'})
    }

    const handleExecuteSubmission=async(a)=>{
        const toPut={
            fileName: file.name,
            submissionDate: a,
            deadlineDate: dateInfo.dDate,
            username: username,
            subId: sub_id,
            asgn:asgn.slice(1)
        }

        const formDataObj={
            'file': file
        }
        if(!file){
            alert("Please Select a file")
        }
        else{            
            await putData(toPut,'http://localhost:3002/api/json/updateasgndetails')
            const edited=await postFile(formDataObj,"http://localhost:3002/api/json/uploadfile")
            console.log(edited.message)
            navigate('../..',{relative: 'path'})
        }
    }

    return(
        <>
            <div className="content">
                <br />
                <Link to='../..' relative="path">&larr;</Link>
                {!isDate?
                <>
                    <section>
                        <input type="date" value={submissionDate} onChange={handleSubmissionDate}/> &nbsp; &nbsp;
                        {dateInfo.submDate==="Not Submitted"?    
                        <>
                            <input type="file" onChange={handleFileChange}/> <br />  <br />  
                            <button className="buttons" onClick={()=>handleExecuteSubmission(submissionDate)}>Submit</button>
                        </>      
                        :
                        <>
                            <br /><a href={`/${dateInfo.fileName}`} target="_blank">View Submitted File</a> &nbsp;&nbsp;&nbsp;
                            <button onClick={()=>handleUnsubmitAssignment()}>Unsubmit</button>
                        </>
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
            </div>

        </>
    )
}

export default SAssignmentsSubmit