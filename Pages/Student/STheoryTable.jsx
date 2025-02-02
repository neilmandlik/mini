import { useEffect, useMemo } from "react"
import { useTable } from "react-table"
import { Link } from "react-router-dom"

function STheoryTable({tableData}){

    const data=useMemo(()=>tableData,[])
    const columns=useMemo(()=>[
        {
            Header:"Subject Name",
            accessor:"subject_name",
        },
        {
            Header: "Assignment 1",
            columns:[
                {
                    Header:"Deadline Date",
                    accessor:`A1.deadline_date`,
                },
                {
                    Header:"Submission Date",
                    accessor:"A1.submission_date",
                },
                {
                    Header: "Marks Allocated",
                    accessor:"A1.marks_given",
                }
            ]
        },
        {
            Header: "Assignment 2",
            columns:[
                {
                    Header:"Deadline Date",
                    accessor:`A2.deadline_date`,
                },
                {
                    Header:"Submission Date",
                    accessor:"A2.submission_date",
                },
                {
                    Header: "Marks Allocated",
                    accessor:"A2.marks_given",
                }
            ]
        },
        {
            Header: "Assignment 3",
            columns:[
                {
                    Header:"Deadline Date",
                    accessor:`A3.deadline_date`,
                },
                {
                    Header:"Submission Date",
                    accessor:"A3.submission_date",
                },
                {
                    Header: "Marks Allocated",
                    accessor:"A3.marks_given",
                }
            ]
        },
    ],[])

    const {
        getTableProps,
        headerGroups,
        rows,prepareRow,
        getTableBodyProps
    }=useTable({columns,data})

    const handleAssignment=(a)=>{
       return a.substring(0,a.indexOf('.'))                
    }


    return(
        <>
            <div className="studentTableHorizontalShow">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(h=>(
                        <tr {...h.getHeaderGroupProps()}>
                            {h.headers.map(c=>(
                                <th {...c.getHeaderProps()}>
                                    {c.render('Header')}
                                </th>
                            ))}
                        </tr>                            
                    )

                )}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(r=>{
                        prepareRow(r)
                        return(
                            <tr {...r.getRowProps()}>
                                {r.cells.map(c=>(
                                    <td {...c.getCellProps()}>
                                        {c.column.Header==="Submission Date"?<Link to={`${c.row.original.subject_id}/${handleAssignment(c.column.parent.columns[0].id)}?deadline=${c.row.original[handleAssignment(c.column.parent.columns[0].id)].deadline_date==="Not Given"?"notGiven":c.row.original[handleAssignment(c.column.parent.columns[0].id)].deadline_date}`} >{c.render('Cell')}</Link>:c.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>                   
            </table>
            </div>
        </>
    )
}

export default STheoryTable