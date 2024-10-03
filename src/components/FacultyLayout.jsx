import { Link,Outlet } from "react-router-dom"
function FacultyLayout(){
    return(
        <>
            <nav>
                <Link to=".">Classes</Link> &nbsp; &nbsp;
                <Link to="assignments">Assignments</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default FacultyLayout