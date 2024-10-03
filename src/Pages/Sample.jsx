import React, {useState} from "react"
function Sample(){
    const[fileName,setFile]=useState("")

    const handleFileFownload=(event)=>{
        setFile(event.target.value)
        console.log(fileName)
    }
    return(
        <>
            <input onChange={handleFileFownload} type="file" value={fileName}/>
            <a href={fileName}>Go here</a>            
        </>
    )
}

export default Sample