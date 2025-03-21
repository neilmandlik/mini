// import { Link, Navigate, useNavigate,redirect} from "react-router-dom"
// import { Outlet, useParams} from "react-router-dom"
// import { deleteData, getData, putData } from "../CRUDdata"

// export async function userLayoutLoader(){
//     if(localStorage.getItem("isLoggedIn")==="false"){
//         return redirect('..',{replace:true})
//     }
//     else{
//         return null
//     }
// }

// function UserLayout(){

//     const{username}=useParams()
//     const navigate=useNavigate()


    
            
//     return(
//         <>
//             <div className="container">
//                 <div className="box banner">
//                     <div className="logo"><img src="" alt="MIT_logo" /></div>
//                     <div className="stud">
//                         <div className="name-class">
//                             <p id="name">{username}</p>
//                         </div>
//                         <button className="logout" type="button" onClick={handleLogout}>Logout</button>
//                     </div> 
//                     <Outlet />  
//                 </div>              
//             </div>            
            
//         </>
//     )   
// }

// export default UserLayout