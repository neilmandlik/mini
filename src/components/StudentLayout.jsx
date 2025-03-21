import { NavLink,Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { getData, deleteData } from "../CRUDdata"

export async function studentLayoutLoader({params}){
    const{username}=params
    return getData(`http://localhost:3002/api/json/showclass/${username}/student`)
}

function StudentLayout(){

    const navigate=useNavigate()
    const{username}=useParams()
    const studClass=useLoaderData()
    const activeStyle={
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    const handleLogout=async()=>{
        await deleteData(`http://localhost:3002/api/json/deleteTable/${username}`)
        localStorage.setItem("isLoggedIn",false)
        navigate('/',{replace:true})
    }

    return(
        <>
            <div className="container">
                <div className="box banner">
                    <div className="logo"><img src="/WhatsApp Image 2025-02-10 at 10.18.54_4660d668.jpg" alt="MIT_logo" /></div>
                    <div className="stud">
                        <div className="name-class">
                            <p id="name">{username}</p>
                            <div className="class">
                                <p id="class-name">{studClass[0].class_name}, Batch {studClass[0].batch}</p>                      
                            </div>
                        </div>
                        <button className="logout" type="button" onClick={handleLogout}>Logout</button>
                    </div> 
                </div>  
                <div class="box navigation">
                    <ul id="navigation-list">
                        <li><NavLink to={'.'} end={true} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Assignments</NavLink></li>
                        <li><NavLink to={'feedback'} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Feedback</NavLink></li>
                    </ul>
                </div>    
                <Outlet />          
            </div>  
        </>
    )
}

export default StudentLayout