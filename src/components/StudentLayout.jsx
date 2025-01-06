import { NavLink,Outlet, useLoaderData } from "react-router-dom"
import { getData } from "../CRUDdata"

export async function studentLayoutLoader({params}){
    const{username}=params
    return getData(`http://localhost:3002/api/json/showclass/${username}/student`)
}

function StudentLayout(){

    const studClass=useLoaderData()
    const activeStyle={
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    return(
        <>

            <p>Class {studClass[0].class_name} Batch {studClass[0].batch}</p>
            <nav>
                <NavLink to={'.'} end={true} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Assignments</NavLink> &nbsp;
                <NavLink to={'feedback'} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Feedback</NavLink> &nbsp;
            </nav>
            <Outlet />
        </>
    )
}

export default StudentLayout