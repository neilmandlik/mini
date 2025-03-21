import { useEffect, useRef, useState } from "react"
import { getData } from "../CRUDdata"
import { Link, Outlet } from "react-router-dom"
import { useLoaderData, useNavigate, useLocation } from "react-router-dom"
import GenerateFeedbackReport from "./GenerateFeedbackReport"

export async function feedbackReportLoader(){
    return getData(`http://localhost:3002/api/json/getfacclasssublist/max`)
}

function FeedbackReport(){

    const info=useLoaderData()
    const [facList,setFacList]=useState(info.faculties)
    const [classList,setClassList]=useState(info.classes)
    const [pcList,setPc]=useState(info.pairClass)
    const [cfList,setCf]=useState(info.classFaculty)

    const [faculty,setFaculty]=useState("")
    const [fclass,setFclass]=useState("")
    const currentfac=useRef("0")
    const facClass=useRef([])
    const [tot,setTot]=useState(0)

    const [isInRange,setRange]=useState(false)
    const latestForm=info.feedbackForms.length===0?"":info.feedbackForms[0].feedback_form_id
    const [formNum,setFormNum]=useState(latestForm)
    const [formNum2,setFormNum2]=useState(latestForm)
    
    const navigate=useNavigate()
    const prevData=useLocation()

    useEffect(()=>{
        if(prevData.state){
            setRange(!isInRange)
            document.getElementById('academicYearList').value=prevData.state.fId
            prevData.state.navTo?handleFacultyChange():handleClassChange()
            prevData.state=null
        }
        if(faculty==="" && fclass==="" && tot===0){
            navigate(`.`)
        }
    },[faculty,fclass,prevData.state])

    const handleFacultyChange=(event)=>{
        let fac=""
        if(prevData.state){
            setFaculty(`${prevData.state.facName},${prevData.state.subName}`)
            fac=`${prevData.state.facName},${prevData.state.subName}`
        }
        else{
            setFaculty(event.target.value)
            fac=event.target.value  
        }
        if(fac!==""){
            const userinp=facList.find(ele=>ele.faculty_name===fac.slice(0,fac.indexOf(','))&&ele.subject_name===fac.slice(fac.indexOf(',')+1,fac.indexOf("(")))
            if(userinp!==undefined){
                currentfac.current=userinp.faculty_id+'p'+userinp.subject_id
                facClass.current=pcList[pcList.indexOf(pcList.find(ele=>Object.keys(ele)[0]===currentfac.current))]
                currentfac.current=userinp.faculty_id+'p'+userinp.subject_id+'p'
            }    
            else{
                currentfac.current="-1"
            }   
        }   
        else{
            currentfac.current="0"
        }

    }

    const handleClassChange=(event)=>{
        let fac=""
        if(prevData.state){
            setFclass(`${prevData.state.clsName}`)
            fac=`${prevData.state.clsName}`
        }
        else{
            setFclass(event.target.value)
            fac=event.target.value  
        }
        if(fac!==""){
            const userinp=classList.find(ele=>ele.class_name===fac)
            if(userinp!==undefined){
                currentfac.current=userinp.class_id
                facClass.current=cfList[cfList.indexOf(cfList.find(ele=>Object.keys(ele)[0]===currentfac.current))]
                currentfac.current=userinp.class_id+'c'
            }    
            else{
                currentfac.current="-1"
            }
        }
        else{
            currentfac.current="0"
        }
    }

    const handleDataClear=(a)=>{   
        if(a===1){   
            setTot(1)
            setFaculty("")
            setFclass("") 
            currentfac.current="0"         
            navigate(`${formNum}/allfacultyreport`)
        }
        else{
            setFaculty("")
            setFclass("")  
            setTot(0)          
            currentfac.current="0"
            navigate('.') 
        }     
    }

    const handleFormIdChange=async(event)=>{
        setFormNum(event.target.value)
        if(!isInRange){
            const editedInfo=await getData(`http://localhost:3002/api/json/getfacclasssublist/${event.target.value}`)
            setPc(editedInfo.pairClass)
            setCf(editedInfo.classFaculty)
            setFacList(editedInfo.faculties)
            setClassList(editedInfo.classes)
        }
        
    }

    const handleFormIdChange2=(event)=>{
        setFormNum2(event.target.value)
    }

    const handleGetRange=()=>{
        navigate(`${formNum}${formNum2}`)
    }

    const handleClickRange=()=>{
        setRange(!isInRange)
        handleDataClear(0)
    }

    return(
        <>
            <br /> 
            {formNum===""?
            "Launch Your First Feedback Form"
            :
                <>
                    <div class="box filter">
                        <div class="sem">
                            <label htmlFor="academicYearList"> {isInRange?"From":"Enter"} Semester: </label>
                            <select id="academicYearList" onChange={handleFormIdChange} onClick={()=>handleDataClear(0)}>
                                {info.feedbackForms.map((ele,i)=>
                                    <option key={i} value={`${ele.feedback_form_id}`}>AY {ele.academic_year}, Semester {ele.semester}</option>
                                )}          
                            </select> &nbsp; &nbsp;
                            <button class="buttons sem-range" onClick={handleClickRange}>See Feedback Report for a {isInRange?"Particular Semester":"Range of Semesters"}</button>
                        </div>
                        {isInRange?
                            <>
                                <div class="to-semester">
                                    <label htmlFor="academicYearList2">To Semester: </label>
                                    <select id="academicYearList2" onClick={()=>handleDataClear(0)} onChange={handleFormIdChange2}>
                                    {info.feedbackForms.map((ele,i)=>
                                        <option key={i} value={`${ele.feedback_form_id}`}>AY {ele.academic_year}, Semester {ele.semester}</option>
                                    )}          
                                    </select>
                                </div>
                                <button class="buttons" onClick={handleGetRange}>Enter</button> &nbsp; &nbsp;

                                <Outlet />

                            </>
                        :
                            <>
                                <div class="faculty-class">
                                    <div class="faculty">
                                        <label htmlFor="facNameAndSub">Enter Faculty Name: </label>
                                        <input disabled={fclass!==""} onChange={handleFacultyChange} list="faculties" type="text" id="facNameAndSub" value={faculty}/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        <datalist id="faculties">
                                            {facList.map((ele,i)=>
                                                <option key={i} value={`${ele.faculty_name},${ele.subject_name}(${ele.abr})`} />
                                            )}
                                        </datalist>
                                    </div>
                                
                                    <button className="buttons" onClick={()=>handleDataClear(0)}>Clear All</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="class">
                                        <label htmlFor="className">Enter Class Name: </label>
                                        <input disabled={faculty !==""} onChange={handleClassChange} list="classes" type="text" id="className"  value={fclass}/>
                                        <datalist id="classes">
                                            {classList.map((ele,i)=>
                                                <option key={i} data-value={`${ele.class_id}`} value={`${ele.class_name}`} />
                                            )}
                                        </datalist>
                                    </div>
                                    <button class="buttons generate-report" onClick={()=>handleDataClear(1)}>Generate Total Report</button>
                                    <br /> <br />
                                </div>

                                {currentfac.current==="-1"||currentfac.current==="0"?<Outlet />:<GenerateFeedbackReport fNum={formNum} rec1={currentfac.current} recObj1={facClass.current} />}
                            </>                    
                        }
                    </div>                   
                </>
            }
        </>
    )
}

export default FeedbackReport