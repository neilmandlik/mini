import { useLoaderData, useNavigate } from "react-router-dom"
import { getData } from "../../CRUDdata"
import { NavLink, Outlet } from "react-router-dom"
import { useEffect } from "react"

export async function fclassLoader({params}){
    const {username}=params
    return getData(`http://localhost:3002/api/json/showclass/${username}/faculty`)
}

function FClass (){

    const classes=useLoaderData()
    const navigate=useNavigate()

    const activeStyle={
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    useEffect(()=>{
        navigate(`${classes[0].class_name}`)
    },[])

    return (
        <>
            <div className="faculty-layout-content">
                <div className="class-navigation">
                    {classes.map((cl,i)=>
                        <nav key={i}>
                            <div className="class-name">
                                <NavLink to={`${cl.class_name}`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>
                                        {cl.class_name}
                                </NavLink>
                            </div>
                        </nav>
                    )}   
                </div>
                
                <Outlet />  
            </div>
        </>
    )
}

export default FClass