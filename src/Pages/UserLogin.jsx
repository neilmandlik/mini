import { useNavigate} from "react-router-dom"
import { getData } from "../CRUDdata"
import { useState} from "react"


function UserLogin(){
    localStorage.setItem("isLoggedIn",false)
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
            navigate(`user/${name}/${toCheck.desg}`,{replace: true})
        }             
    }
    return(
        <>
        <input type="text" name="username" value={name} onChange={handleNameChange}/>
        <input type="text" name="password" value={password} onChange={handlePassChange}/>
        <button onClick={handleClick}>Submit</button> <br />
        {res}
            
        </>
    )
}

export default UserLogin