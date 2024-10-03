import { Link,Outlet, useLoaderData } from "react-router-dom"
import { getData } from "../CRUDdata"

export async function studentLayoutLoader({params}){
    const{username}=params
    return getData(`http://localhost:3002/api/json/showclass/${username}/student`)
}

function StudentLayout(){

    const studClass=useLoaderData()

    return(
        <>

            <p>Class {studClass[0].class_name}</p>
            <nav>
                <Link to=".">Subjects</Link> &nbsp; &nbsp;
                <Link to="assignments">Assignments</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default StudentLayout