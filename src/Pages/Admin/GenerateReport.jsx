import { useState,useMemo, useEffect } from "react"
import { useTable,useFilters } from 'react-table'
import { getData } from "../../CRUDdata"
import { useLoaderData } from "react-router-dom"
import ColumnFilter from "./ColumnFilter"

export async function generateReportLoader(){
    return getData("http://localhost:3002/api/json/gettabledata")
}


function GenerateReport(){

    const[togTableFaculty,setTogFaculty]=useState(true)
    const[togTableStudent,setTogStudent]=useState(true)
    const info=useLoaderData()
    const [tableHeight,setTableHeight]=useState(0)

    // useEffect(()=>{
    //     console.log(info)
    // })

    useEffect(()=>{
        if(!togTableFaculty){
            setTableHeight(document.getElementById('scaleHeight').offsetHeight)
            document.getElementById('marginTop').style.top=`${tableHeight+120}px`
            document.getElementById('showStudentTable').style.top=`${tableHeight+150}px`;
            document.getElementById('marginTop').style.transition="none"
            document.getElementById('showStudentTable').style.transition="none"

        }
        else{
            document.getElementById('marginTop').style.top="20dvh"
            document.getElementById('marginTop').style.transition="all 0.5s ease"
            document.getElementById('showStudentTable').style.top="24.5dvh"        
            document.getElementById('showStudentTable').style.transition="all 0.5s ease"
        }
        
    },[togTableFaculty,<ColumnFilter />,tableHeight])

    

    const data=useMemo(()=>info,[])
    const columns=useMemo(()=>[
        {
            Header:"Faculty Name",
            accessor:"faculty_name",
            Filter: ColumnFilter
        },
        {
            Header: "Assignment 1",
            columns:[
                {
                    Header:"Scheduled Date",
                    accessor:`A1.scheduled_date`,
                    Filter: ColumnFilter,
                    disableFilters: true
                },
                {
                    Header:"Allocation Date",
                    accessor:"A1.allocation_date",
                    Filter: ColumnFilter,
                    disableFilters: true
                }
            ]
        },
        {
            Header:"Assignment 2",
            columns:[
                {
                    Header:"Scheduled Date",
                    accessor:`A2.scheduled_date`,
                    Filter: ColumnFilter,
                    disableFilters: true
                },
                {
                    Header:"Allocation Date",
                    accessor:"A2.allocation_date",
                    Filter: ColumnFilter,
                    disableFilters: true
                }
            ]
        },
        {
            Header:"Assignment 3",
            columns:[
                {
                    Header:"Scheduled Date",
                    accessor:`A3.scheduled_date`,
                    Filter: ColumnFilter,
                    disableFilters: true
                },
                {
                    Header:"Allocation Date",
                    accessor:"A3.allocation_date",
                    Filter: ColumnFilter,
                    disableFilters: true
                }
            ]
        },
        {
            Header:"Subject Name",
            accessor:"subject_name",
            Filter: ColumnFilter
        },
        {
            Header:"Subject Type",
            accessor:"subject_type",
            Filter: ColumnFilter,
            disableFilters: true
        },
        {
            Header:"Class Name",
            accessor:"class_name",
            Filter: ColumnFilter
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
    }=useTable({columns,data},useFilters)

    return(
        <div className="reportContainer">
            
            <input type="checkbox" id="checkTableFaculty" />
            <label htmlFor="checkTableFaculty" id="showFacultyTable">
                    <div class="buttons margin" onClick={handleShowTogFac}>
                        {togTableFaculty?"Show":"Hide"}
                    </div>
            </label>
            <div className="buttons gap">
                Faculty
            </div>
            <div className="facultyTableContainer" id="scaleHeight"> 
                <table className="facultyTable" {...getTableProps()}>
                    <thead>
                        {headerGroups.map((hG)=>
                        <tr {...hG.getHeaderGroupProps()}>
                            {hG.headers.map((col)=>
                                <th {...col.getHeaderProps()}>
                                    {col.render("Header")}
                                    <div>{col.canFilter?col.render('Filter'):null}</div>
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
            {/* <input type="checkbox" id="checkTableStudent" /> */}
            <label id="showStudentTable" htmlFor="checkTableStudent">
                <div onClick={handleShowTogStud}>
                    {/* {togTableStudent?"Show":"Hide"} */}
                </div>
            </label>        
            <div className="reportStudent" id="marginTop">
                {/* Student                  */}
            </div>
        </div> 
    )
}

export default GenerateReport