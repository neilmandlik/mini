import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function Specific(){

    const{id,dep}=useParams()
    const[block,setBlock]=useState('N');
    const[error,setError]=useState();
    const[rooms,setRooms]=useState();

    useEffect(()=>{
        fetch(`http://localhost:3002/api/json/getFloor/${dep}/${id}`)
        .then(respone=>{
            if(!respone.ok){
                setError("Network Connection Error")
            }
            return respone.json()
        })
        .then(data=>setRooms(data))
        .catch(error=>setError(error))
    },[id,dep])

    if(error){
        return <p>Error: {error}</p>
    }

    if(!rooms){
        return <p>Data Not Available</p>
    }


    const handleNorthBlock=()=>{
        setBlock('N')
    }

    const handleSouthBlock=()=>{
        setBlock('S')
    }   

    return(
        <>
            <div className='northsouth'>
                <button id='southbutton' onClick={handleSouthBlock}>&lt;</button>
                <span className='blockvalue giveFont'>{block}</span>
                <button id='northbutton' onClick={handleNorthBlock}>&gt;</button>               
            </div>

            <Link to={'..'} style={{textDecorationLine:"none",fontSize:"2rem"}} >&larr;</Link>

            <p><b>Classrooms</b></p>
            {rooms.filter(room=>
                room.utility==="classroom" && 
                room.block===block.toLowerCase()).map((r,i)=><p key={i}>{block.toUpperCase()}{r.floor}{r.number}</p>)}

            <p><b>Lab</b></p>
            {rooms.filter(room=>
                room.utility==="lab" && 
                room.block===block.toLowerCase()).map((r,i)=><p key={i}>{block.toUpperCase()}{r.floor}{r.number}</p>)}

            <p><b>Faculty Cabins</b></p>
            {rooms.filter(room=>
                room.utility==="faculty cabin" && 
                room.block===block.toLowerCase()).map((r,i)=><p key={i}>{block.toUpperCase()}{r.floor}{r.number}</p>)}
        </>
    )
}

export default Specific