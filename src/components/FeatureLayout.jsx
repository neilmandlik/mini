import { Outlet } from "react-router-dom"
import Search from "../Pages/SearchComponent"
function FeatureLayout(){
    return(
        <>
            <div className='mainContainer'>
                <Search />
                <Outlet />  
            </div>          
        </>
    )
}

export default FeatureLayout