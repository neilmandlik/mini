import React, {useEffect, useState} from "react"
import { deleteData, postFile } from "../CRUDdata"
function Sample(){
    const[file1,setFile]=useState("")
    const [file2,setFile2]=useState()

    useEffect(()=>{
        console.log(file2)
    },[file2])

    // const handleFileDownload=(event)=>{
    //     setFile(event.target.files[0])
    // }

    const handleDeleteFile=async()=>{
        console.log(file2.name)
        const edited=await deleteData(`http://localhost:3002/api/json/deletefile/${file2.name}`)
        console.log(edited.message)
    }

    const handleFile2Download=(event)=>{
        setFile2(event.target.files[0])
    }

    const uploadFile=async()=>{
        if(!file1 && !file2){
            alert("Please Select a File")
        }
        else if(!file1 &&file2){
            console.log("Hi")
            const formDataObj={
                "file": file2
            }

            const edited =await postFile(formDataObj,"http://localhost:3002/api/json/uploadfile")
            console.log(edited.message)
        }
        else{
            const formDataObj={
                "files": [file1,file2]
            }

            const edited=await postFile(formDataObj,"http://localhost:3002/api/json/uploadfile")
            console.log(edited?.message)
        }
    }
    return(
        <>
            {/* <input onChange={handleFileDownload} type="file"/> */}
            <input onChange={handleFile2Download} type="file"/>
            <button onClick={uploadFile}>Upload</button>
            <a href="/AIML Assignment 1.pdf" target="_blank">View File</a> <br />
            <button onClick={handleDeleteFile}>Delete file</button>                 
        </>
    )
}

export default Sample