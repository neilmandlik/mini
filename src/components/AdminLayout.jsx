import { NavLink,Outlet, useNavigate, useParams } from "react-router-dom"
import { deleteData } from "../CRUDdata"
function AdminLayout(){
    const activeStyle={
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    const{username}=useParams()
    const navigate=useNavigate()

    const handleLogout=async()=>{
        await deleteData(`http://localhost:3002/api/json/deleteTable/${username}`)
        localStorage.setItem("isLoggedIn",false)
        navigate('/',{replace:true})
    }
    

    return(
        <>
            <div class="container">
                <div class="box banner">
                    <div class="logo"><img src="/WhatsApp Image 2025-02-10 at 10.18.54_4660d668.jpg" alt="MIT_logo" /></div>
                    <div class="admin"> 
                        <p id="name">{username}</p>
                        <button class="logout" type="button" onClick={handleLogout}>Logout</button>
                    </div> 
                </div>  
                <div class="box navigation">
                    <ul id="navigation-list">
                        <li><NavLink to={`.`} end={true} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Assignment Report</NavLink></li>
                        <li><NavLink to={`registration`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Semester Registration</NavLink></li>
                        <li><NavLink to={`feedback`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Feedback Report</NavLink></li>
                        <li><NavLink to={`feedbackpreview`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Feedback Preview</NavLink></li>
                    </ul>
                </div>            
                <Outlet />
            </div>
        </>
    )
}

export default AdminLayout