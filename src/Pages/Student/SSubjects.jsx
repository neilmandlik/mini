import { useLoaderData,Link } from "react-router-dom";
import { getData } from "../../CRUDdata";
import { useEffect } from "react";
export async function studSubjectLoader({params}){
    const {username}=params
    const studClass=await getData(`http://localhost:3002/api/json/showclass/${username}/student`)
    return getData(`http://localhost:3002/api/json/showsubjects/${studClass[0].class_name}`)
}

function StudentSubject(){

    const subjects=useLoaderData()

    return (
        <>
            <div>
                Theory
                {(subjects.filter((sub)=>sub.subject_type==='theory').map((sub,i)=>
                <div key={i}>
                    <Link to={`${sub.subject_name}`}>{sub.subject_name}</Link>
                </div>))
                }
                <br /> <br />
                Practical
                {(subjects.filter((sub)=>sub.subject_type==='practical').map((sub,i)=>
                <div key={i}>
                    <Link to={`${sub.subject_name}`}>{sub.subject_name}</Link>
                </div>))
                }
            </div>
        </>
    )
}


export default StudentSubject