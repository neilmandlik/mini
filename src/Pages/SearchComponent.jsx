import '../Mini.css'
function Search(){

    return(
        <div className='inputContainer'>
            <input className="search inputPos" type="text" placeholder='Search Faculty Here...'/>
            <button className='search buttonPos'>Search</button>
        </div>
    )
}

export default Search