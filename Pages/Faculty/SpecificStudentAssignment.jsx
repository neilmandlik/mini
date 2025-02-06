import { useEffect } from "react"
import { useParams } from "react-router-dom"

function SpecStudentAssignment(){
    const{specStudent}=useParams()

    return(
        <>
            <div className="testing">
                <iframe style={{'marginLeft': "2rem"}} src={`/${specStudent}`}></iframe>                                    
            </div>
        </>
    )
}

export default SpecStudentAssignment