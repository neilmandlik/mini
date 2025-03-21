import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { getData } from "../../CRUDdata"
import { useEffect, useState } from "react"
import { use } from "react"

export async function fsubjectLoader({params}){
    const {username,class_name}=params
    return getData(`http://localhost:3002/api/json/showsubjectsfaculty/${username}/${class_name}`)
}

function FSubject(){

    const info=useLoaderData()
    const [inf,setInf]=useState(info)
    const navigate=useNavigate()
    const activeStyle={
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    useEffect(()=>{
        navigate(`${inf[0].subject_name}`)        
    },[inf])

    useEffect(()=>{
        console.log("Hi")
        setInf(info)
    },[info])

    return(
        <>
        <div className="subject-navigation">
            {inf.map((ele,i)=>
                <div className="subject-name">
                    <NavLink to={`${ele.subject_name}`} key={i} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>{ele.subject_name}</NavLink>
                </div>
            )}  
        </div>

            <Outlet />     

        </>
    )
}

export default FSubject