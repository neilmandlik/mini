import { Link,Outlet } from "react-router-dom"
function FacultyLayout(){
    return(
        <>
            <nav>
                <b>Classes</b> &nbsp;
                <Link to="assignments">Assignments</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default FacultyLayout