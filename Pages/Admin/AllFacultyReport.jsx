import { useTable } from "react-table"
import { useEffect, useMemo } from "react"
import { getData } from "../../CRUDdata"
import { useLoaderData } from "react-router-dom"

export async function allFacultyReportLoader({params}){
    const{fnum}=params
    return getData(`http://localhost:3002/api/json/getallfacultyreport/${fnum}`)
}

function AllFacultyReport(){

    const info=useLoaderData()

    const data=useMemo(()=>info,[])
    const columns=useMemo(()=>[
        {
            Header: 'Faculty Name',
            accessor: 'faculty_name'
        },
        {
            Header: 'Subject Name',
            accessor: 'subject_name'
        },
        {
            Header: 'Class Name',
            accessor: 'class_name'
        },
        {
            Header: 'Final',
            accessor: 'final_res'
        },
    ],[])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }=useTable({columns,data})

    return(
        <>
            <div>
                <table {...getTableProps()}>
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
        </>
    )
}

export default AllFacultyReport