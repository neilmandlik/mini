import { useState,useMemo, useEffect } from "react"
import { useTable } from 'react-table'
import { getData } from "../../CRUDdata"
import { useLoaderData } from "react-router-dom"

export async function generateReportLoader(){
    return getData("http://localhost:3002/api/json/gettabledata")
}


function GenerateReport(){

    const[togTableFaculty,setTogFaculty]=useState(true)
    const[togTableStudent,setTogStudent]=useState(true)
    const info=useLoaderData()

    const data=useMemo(()=>info,[])
    const columns=useMemo(()=>[
        {
            Header:"Faculty Name",
            accessor:"faculty_name"
        },
        {
            Header: "Assignment 1",
            columns:[
                {
                    Header:"Scheduled Date",
                    accessor:`A1.scheduled_date`
                },
                {
                    Header:"Allocation Date",
                    accessor:"A1.allocation_date"
                }
            ]
        },
        {
            Header:"Assignment 2",
            columns:[
                {
                    Header:"Scheduled Date",
                    accessor:`A2.scheduled_date`
                },
                {
                    Header:"Allocation Date",
                    accessor:"A2.allocation_date"
                }
            ]
        },
        {
            Header:"Assignment 3",
            columns:[
                {
                    Header:"Scheduled Date",
                    accessor:`A3.scheduled_date`
                },
                {
                    Header:"Allocation Date",
                    accessor:"A3.allocation_date"
                }
            ]
        },
        {
            Header:"Subject Name",
            accessor:"subject_name"
        },
        
        
        {
            Header:"Class Name",
            accessor:"class_name"
        }
    ],[])

    const handleShowTogFac=()=>{
        setTogFaculty(!togTableFaculty)
    }

    const handleShowTogStud=()=>{
        setTogStudent(!togTableStudent)
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }=useTable({columns,data})

    return(
        <div className="reportContainer">
            
            <input type="checkbox" id="checkTableFaculty" />
            <label htmlFor="checkTableFaculty" id="showFacultyTable">
                    <div onClick={handleShowTogFac}>
                        {togTableFaculty?"Show":"Hide"}
                    </div>
            </label>
            <div className="report faculty">
                Faculty
            </div>
            <div className="facultyTableContainer"> 
                <table className="facultyTable" {...getTableProps()}>
                    <thead>
                        {headerGroups.map((hG)=>
                        <tr {...hG.getHeaderGroupProps()}>
                            {hG.headers.map((col)=>
                                <th {...col.getHeaderProps()}>
                                    {col.render("Header")}
                                </th>
                            )}
                            
                        </tr>
                        )}                                
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row)=>{
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((c)=>
                                    <td {...c.getCellProps()}>
                                        {c.render("Cell")}
                                    </td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <input type="checkbox" id="checkTableStudent" />
            <label id="showStudentTable" htmlFor="checkTableStudent">
                <div onClick={handleShowTogStud}>
                    {togTableStudent?"Show":"Hide"}
                </div>
            </label>        
            <div className="reportStudent">
                 Students
            </div>
        </div> 
    )
}

export default GenerateReport