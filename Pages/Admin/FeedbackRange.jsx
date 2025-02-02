import { useLoaderData, Link } from "react-router-dom"
import { getData } from "../../CRUDdata"
import { useMemo } from "react"
import { useFilters, useTable } from "react-table"
import ColumnFilter from "./ColumnFilter"

export async function feedbackRangeLoader({params}){
    const {range}=params
    return getData(`http://localhost:3002/api/json/getfeedbackreport/${range}/-1/-1/-1`)    
} 

function FeedbackRange(){

    const info=useLoaderData()
    const data=useMemo(()=>info,[])
    const columns=useMemo(()=>[
        {
            Header: "Faculty Name",
            accessor: "faculty_name",
            Filter: ColumnFilter
            
        },
        {
            Header: "Subject Name",
            accessor: (row)=>`${row.subject_name}(${row.abbreviation})`,
            Filter: ColumnFilter
        },
        {
            Header: "Class Name",
            accessor: "class_name",
            Filter: ColumnFilter
        },
        {
            Header: "Semester",
            accessor: (row)=>`AY ${row.academic_year}, Semester ${row.semester}`,
            Filter: ColumnFilter
        },
        {
            Header: "Final Result",
            accessor: "final_res",
            Filter: ColumnFilter,
            disableFilters: true
        }        
    ],[])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    }=useTable({data,columns},useFilters)
    return(
        <>
            <table {...getTableProps()}>
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
                                        {c.column.id==='faculty_name' || c.column.id==='class_name'?<Link to={`..`} state={
                                            {
                                                navTo: c.column.id==='faculty_name',
                                                fId: row.original.feedback_form_id,
                                                facName: row.values.faculty_name,
                                                subName: row.values['Subject Name'],
                                                clsName: row.values.class_name, 
                                                acName: row.values.Semester
                                            }}>{c.render("Cell")}</Link>
                                            :
                                            c.render('Cell')}
                                    </td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </>
    )
}

export default FeedbackRange