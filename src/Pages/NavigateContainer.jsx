import React, {useState} from 'react';
import '../Mini.css'
import { Link } from 'react-router-dom';
const Navigate=()=>{

    const[floorList]=useState(['Ground','1st Floor','2nd Floor','3rd Floor','4th Floor','5th Floor','6th Floor'])
    let departmentList=['SOC','SOE']
    const [dep,setDep]=useState('SOC')

    const handleDepChange=(event)=>{
        setDep(event.target.value)
    }
  
    return(
        <>
            <span>
                Select a Department: &nbsp; &nbsp;
                <select name="department" onChange={handleDepChange}>
                    {departmentList.map((dep,i)=>
                    <option key={i}>
                        {dep}
                    </option>)}
                </select>
            </span>
            <ul>   
                {floorList.map((floor,index)=>
                <div key={index}>
                   <Link to={`specific/${dep}/${index}`}>
                        <li className="floorContainer giveFont" id="displayCat">{floor}</li>
                    </Link>         
                </div>
                                   
                )}
            </ul>
        </>
    )
}

export default Navigate