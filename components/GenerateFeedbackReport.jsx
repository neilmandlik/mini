import { useEffect, useRef, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"

function GenerateFeedbackReport({fNum,rec1,recObj1}){

    const navigate=useNavigate()
    const rec=useRef(rec1.slice(0,rec1.length-1))
    const recObj=useRef(recObj1[rec.current])

    useEffect(()=>{
        // console.log(rec.current)
        // console.log(recObj1)
        navigate(`${fNum}/${rec1}/${recObj.current[0][1]}`)
    },[])

    const activeStyle={
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    return(
        <>
            <nav>
                {recObj.current.map((ele,ind)=>
                    <NavLink key={ind} to={`${fNum}/${rec1}/${ele[1]}`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>{ele[0]} &nbsp; &nbsp;</NavLink> 
                )} 
            <NavLink to={`${fNum}/${rec1}/${0}`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Average Perfromance</NavLink>
            </nav>

            <Outlet />
        </>

    )
}

export default GenerateFeedbackReport