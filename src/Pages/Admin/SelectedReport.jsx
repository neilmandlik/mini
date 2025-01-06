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
        }]).concat([
        ,{
            Header: 'Question 1',
            accessor:'Question 1'
        },
        {
            Header: 'Question 2',
            accessor:'Question 2'
        },
        {
            Header: 'Question 3',
            accessor:'Question 3'
        },
        {
            Header: 'Question 4',
            accessor:'Question 4'
        },
        {
            Header: 'Question 5',
            accessor:'Question 5'
        },
        {
            Header: 'Question 6',
            accessor:'Question 6'
        },
        {
            Header: 'Question 7',
            accessor:'Question 7'
        },
        {
            Header: 'Question 8',
            accessor:'Question 8'
        },
        {
            Header: 'Question 9',
            accessor:'Question 9'
        },
        {
            Header: 'Question 10',
            accessor:'Question 10'
        },
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