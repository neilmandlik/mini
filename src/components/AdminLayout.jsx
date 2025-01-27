import { NavLink,Outlet } from "react-router-dom"
function AdminLayout(){
    const activeStyle={
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none'
    }
    return(
        <>
            <nav>
                <NavLink to={`.`} end={true} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Assignment Report</NavLink> &nbsp; &nbsp;&nbsp;
                <NavLink to={`registration`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Semester Registration</NavLink> &nbsp; &nbsp;&nbsp;
                <NavLink to={`feedback`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Feedback Report</NavLink> &nbsp; &nbsp;&nbsp;      
                <NavLink to={`feedbackpreview`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}}>Feedback Preview</NavLink> &nbsp; &nbsp;&nbsp;                </nav>
            <Outlet />
        </>
    )
}

export default AdminLayout