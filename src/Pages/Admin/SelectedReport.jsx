import { useEffect, useMemo, useState } from "react"
import { getData } from "../../CRUDdata"
import { useLoaderData, useParams } from "react-router-dom"
import { useTable } from "react-table"

export async function selectedReportLoader({params}){
    const{fnum,rec1,recObjele} =params
    const rec=rec1.slice(0,rec1.length-1)
    const conf=rec1[rec1.length-1]
    return await getData(`http://localhost:3002/api/json/getfeedbackreport/${fnum}/${rec}/${recObjele}/${conf}`)
}

function SelectedReport(){

    const{fnum,recObjele,rec1}=useParams()
    const conf=rec1[rec1.length-1]
    const info=useLoaderData()

    useEffect(()=>{
        if(recObjele==='0'){
            console.log(Object.keys (info[0]).filter(
                ele=>ele.includes('Question')).map(
                    ele=>({
                        Header: ele,
                        accessor: ele
                    })))
        }
    },[info])  

    const data=useMemo(()=>info,[info])
    const columns=useMemo(()=>
        recObjele==='0'?
        (conf==='p'?
        [{
            Header:'Class',
            accessor:'class_name'
        }]:
        [{
            Header:'Faculty Name',
            accessor:'faculty_name'            
        },
        {
            Header:'Subject Name',
            accessor:'subject_name'
        }]).concat(Object.keys (info[0]).filter(
            ele=>ele.includes('Question')).map(
                ele=>({
                    Header: ele,
                    accessor: ele
                }))).concat([
        {
            Header: 'Final Result',
            accessor:'final_res'
        }]):
    [
        {
            Header: 'Question',
            accessor:'question_desc'
        },
        {
            Header: 'Not Satisfied',
            accessor:'Not_Satisfied'
        },
        {
            Header: 'Neutral',
            accessor:'Neutral'
        },
        {
            Header: 'Satisfied',
            accessor:'Satisfied'
        },
        {
            Header: 'Very Satisfied',
            accessor:'Very_Satisfied'
        },
        {
            Header: 'Overall',
            accessor:'overall'
        },       
    ],[info])

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
                <p>{info[0]['t_r']===undefined?'':`Total Responses ${info[0]['t_r']}`}</p>
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

export default SelectedReport