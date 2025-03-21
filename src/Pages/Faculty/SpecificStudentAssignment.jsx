import { useEffect, useState } from "react"
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom"
import { putData } from "../../CRUDdata"

function SpecStudentAssignment(){
    const{specStudent}=useParams()
    const metaInfo=useLocation().state
    const[grade,setGrade]=useState()
    const[outOfValue,setOutOfValue]=useState()
    const[message1,setMessage1]=useState()
    const[message2,setMessage2]=useState()
    const navigate=useNavigate()
    

    useEffect(()=>{
        setOutOfValue(metaInfo.subStat>=0?10:10+metaInfo.subStat>=5?10+metaInfo.subStat:5)
    },[specStudent])

    const handleOutOfValueChange=(event)=>{
        setOutOfValue(Number(event.target.value)===0?"":Number(event.target.value))
        if(grade<=Number(event.target.value)){
            setMessage2("")
        }
        if(Number(event.target.value)<=10){
            setMessage1("")
        }
        else{
            setMessage1("Cannot Go Above 10")
        }
    }

    const handleGradeChange=(event)=>{
        setGrade(Number(event.target.value)===0?"":Number(event.target.value))
        if(Number(event.target.value)<=Number(outOfValue)){
            setMessage2("")
        }
        else{
            setMessage2(`Grade Cannot Be Greater than ${outOfValue}`)        }
    }

    const handleGradeClick=async(a)=>{
        let toPut={}
        if(a==='g'){
            toPut={
                grade,
                specStudent: metaInfo.specStudent
            }
        }

        else if(a==='v'){
            toPut={
                grade: outOfValue,
                specStudent: metaInfo.specStudent
            }
        }
            
        const edited=await putData(toPut,'http://localhost:3002/api/json/updatemarks')
        edited.isSuccess?navigate('..',{relative: 'path',state: {isGraded: true, ind: metaInfo.ind, subStat: metaInfo.subStat}}):setMessage1(edited.message)
    }

    return(
        <>
            <div id="removeColor">
                <div className="sub-date">
                    <label htmlFor="submissionDate">Submission Date: </label> 
                    <p id="submissionDate">{metaInfo.subDate}</p> 
                </div>
                <div className="marks-to-validate">
                    <div className="marks-grading">
                        <input type="number" value={grade} onChange={handleGradeChange}/> out of <input type="number" value={outOfValue} onChange={handleOutOfValueChange}/> {message1} {message2}
                        <p>{outOfValue!==10? (Math.abs(metaInfo.subStat)===1?` (${Math.abs(metaInfo.subStat)} day late)`: ` (${Math.abs(metaInfo.subStat)} days late)`):null}</p>
                    </div>
                    <div className="grade-validate">
                        <button className="buttons" disabled={outOfValue>10 || grade>outOfValue} onClick={()=>handleGradeClick('g')}>Grade</button> &nbsp; 
                        <button className="buttons" onClick={()=>handleGradeClick('v')}>Validate</button>
                    </div>
                </div>
                <div className="testing">
                    <iframe src={`/${specStudent}`}></iframe>                                    
                </div>
            </div>
        </>
    )
}

export default SpecStudentAssignment