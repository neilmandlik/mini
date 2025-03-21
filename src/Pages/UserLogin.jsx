import { useNavigate} from "react-router-dom"
import { getData } from "../CRUDdata"
import { useEffect, useState} from "react"


function UserLogin(){
    localStorage.setItem("isLoggedIn",true)
    const navigate=useNavigate();
    const[name,setName]=useState()
    const[password,setPass]=useState()
    const[res,setRes]=useState("")


    const handleNameChange=(event)=>{
        setName(event.target.value)
    }

    const handlePassChange=(event)=>{
        setPass(event.target.value)
    }
    
    const handleClick=async ()=>{
        console.log(localStorage.getItem("isLoggedIn"))
        let toCheck=await getData(`http://localhost:3002/api/json/${name}/${password}`) 
        setRes(toCheck.message)       
        if(toCheck.status===200){
            localStorage.setItem("isLoggedIn",true)
            navigate(`user/${name}/${toCheck.desg}`)
        }             
    }
    return(
        <>
            <div class="container-login">
                <div class="login">
                    <div class="trial">
                        <h2>Welcome Back</h2>
                        <div className="dabba username ">                    
                            <label htmlFor="username">Username: </label>
                            <input  type="text" name="Username" id="username" placeholder="Enrollment no" value={name} onChange={handleNameChange}/> <br /> <br />
                        </div>
                        <div className="dabba password">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={handlePassChange}/> <br />
                        </div>
                        <button class="login-btn" onClick={handleClick}>Login</button> <br />
                        <p>{res}</p>
                    </div>
                </div>
            </div>           
        </>
    )
}

export default UserLogin