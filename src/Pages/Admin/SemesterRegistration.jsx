import { useState } from "react"
import { postFile } from "../../CRUDdata"

function SemesterRegistration(){
    const [facultyFile,setFacFile]=useState()
    const [studentFile,setStudFile]=useState()
    const [subjectFile,setSubFile]=useState()
    const [classFile,setClsFile]=useState()
    const [mergefile,setMrgFile]=useState()

    const handleFacultyFileChange=(e)=>setFacFile(e.target.files[0])
    const handleStudentFileChange=(e)=>setStudFile(e.target.files[0])
    const handleClassFileChange=(e)=>setClsFile(e.target.files[0])
    const handleSubjectFileChange=(e)=>setSubFile(e.target.files[0])
    const handleMergeFileChange=(e)=>setMrgFile(e.target.files[0])

    const handleFileUpload=()=>{
        const formDataObj={
            "files":[facultyFile,studentFile,subjectFile,classFile,mergefile]
        }

        const edited= postFile(formDataObj,"http://localhost:3002/api/json/semeterregistration")
    }

    return(
        <>
            Upload csv files for the following
            <div className="upload-csv">
                <label htmlFor="facultyFile">Faculty Information: </label>
                <input type="file" id="facultyFile" onChange={handleFacultyFileChange}/> <br /> <br />
            </div>
            <div className="upload-csv">
                <label htmlFor="studentFile">Student Information: </label>
                <input type="file" id="studentFile" onChange={handleStudentFileChange}/> <br /> <br />
            </div>
            <div className="upload-csv">
                <label htmlFor="classFile">Class Information: </label>
                <input type="file" id="classFile" onChange={handleClassFileChange}/> <br /> <br />
            </div>
            <div className="upload-csv">
                <label htmlFor="subjectFile">Subject Information: </label>
                <input type="file" id="subjectFile" onChange={handleSubjectFileChange}/> <br /> <br />
            </div>
            <div className="upload-csv">
                <label htmlFor="mergeFile">Load Distribution Information: </label>
                <input type="file" id="mergeFile" onChange={handleMergeFileChange}/> <br /> <br />
            </div>
            <button onClick={handleFileUpload}>Upload</button>            
        </>
    )
}

export default SemesterRegistration