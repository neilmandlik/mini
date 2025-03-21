import { Link,Outlet, useParams,useNavigate } from "react-router-dom"
import { deleteData } from "../CRUDdata"
function FacultyLayout(){

    const navigate=useNavigate()
    const{username}=useParams()
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
                    <div className="faculty"> 
                        <p id="name">{username}</p>
                        <button className="logout" type="button" onClick={handleLogout}>Logout</button>
                    </div> 
                </div>

                
                <Outlet />
            </div>
        </>
    )
}

export default FacultyLayout