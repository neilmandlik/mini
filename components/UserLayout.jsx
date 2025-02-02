import { Link, Navigate, useNavigate,redirect} from "react-router-dom"
import { Outlet, useParams} from "react-router-dom"
import { deleteData, getData, putData } from "../CRUDdata"

export async function userLayoutLoader(){
    if(localStorage.getItem("isLoggedIn")==="false"){
        return redirect('..',{replace:true})
    }
    else{
        return null
    }
}

function UserLayout(){

    const{username}=useParams()
    const navigate=useNavigate()


    const handleLogout=async()=>{
        await deleteData(`http://localhost:3002/api/json/deleteTable/${username}`)
        localStorage.setItem("isLoggedIn",false)
        navigate('/',{replace:true})
    }
            
    return(
        <>
            <div className="userHeaderContainer">
                <span className="userName">{username}</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <button className="reduceMargin" onClick={handleLogout}>Logout</button> <br /> 
            </div>
            
            <Outlet />
            
            
        </>
    )   
}

export default UserLayout