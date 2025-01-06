import React, { useEffect, useState } from "react"

function ColumnFilter({column}){

    const{filterValue,setFilter}=column
    const dList=[...new Set(column.filteredRows.map(ele=>ele.values[column.id]))]

    const handleFilterChange=(event)=>{
        setFilter(event.target.value)
    }
    const handleInputClick=(event)=>{
        setFilter("")
        event.target.value=""        
    }
    return(
        <>
            <input type={filterValue||""} list={`${column.id}`} onChange={handleFilterChange} onClick={handleInputClick}/>
            <datalist id={`${column.id}`}>
                {dList.map((ele,i)=>
                    <option key={i} value={`${ele}`}></option>
                )}
            </datalist>

        </>
    )
}

export default ColumnFilter