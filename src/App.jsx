import './Mini.css'
import AssignmentCard from './Pages/Faculty/AssignmentCard'
import SubjectAssignment,{subAsgnLoader} from './Pages/Faculty/AssignmentCollection'
import StudentSubject, { studSubjectLoader } from './Pages/Student/SSubjects'
import FacultyLayout from './components/FacultyLayout'
import StudentLayout, {studentLayoutLoader} from './components/StudentLayout'
import AdminLayout from './components/AdminLayout'
import MainLayout from './components/MainLayout'
import FClass,{fclassLoader} from './Pages/Faculty/FClass'
import UserLogin from './Pages/UserLogin'
import Specific from './Pages/Specific'
import FeatureLayout from './components/FeatureLayout'
import Navigate from './Pages/NavigateContainer'
import Sample from './Pages/Sample'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import UserLayout ,{userLayoutLoader} from './components/UserLayout'
import FAssignment from './Pages/Faculty/FAssignment'
import SubmitAssignment from './Pages/Faculty/SubmitAssignment'
import SAssignmentSubmit,{sAssignmentSubmitLoader} from './Pages/Student/SAssignmentsSubmit'
import GenerateReport,{generateReportLoader} from './Pages/Admin/GenerateReport'


const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
        <Route path={'user/:username'} element={<UserLayout />} loader={userLayoutLoader}>    
            <Route path={`faculty`} element={<FacultyLayout />}>
                <Route index element={<FClass />} loader={fclassLoader} />                        
            </Route>    
            <Route path='faculty/:class_name' element={<SubjectAssignment />} loader={subAsgnLoader} />
            <Route path='faculty/:class_name/newassignment' element={<SubmitAssignment />} />
            <Route path={`student`} element={<StudentLayout />} loader={studentLayoutLoader}>
                <Route index element={<StudentSubject />} loader={studSubjectLoader} />                     
            </Route>
            <Route path='student/:sub_name' element={<SAssignmentSubmit/>} loader={sAssignmentSubmitLoader} />
            <Route path={`admin`} element={<AdminLayout />}>
                <Route index element={<GenerateReport />} loader={generateReportLoader}/>                        
            </Route>    
        </Route>
        <Route index element={<UserLogin />} />
        <Route path={`feature`} element={<FeatureLayout />}>
            <Route index element={<Navigate />} />
            <Route path='specific/:dep/:id' element={<Specific />}/>
        </Route>
        <Route path='/sample' element={<Sample />} />
        {/* <Route path='/sample2' element={<Sample2 />}/> */}
    </Route>
))

function App(){
    
    return(
        <>
            <div>
                <RouterProvider router={router} />
            </div>
        </>
    )
}

export default App