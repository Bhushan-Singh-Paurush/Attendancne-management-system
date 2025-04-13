import {accountType} from "../utils/constent"
const dashBoardLinks=[
    {
        
        path:"/dashboard-profile",
        title:'Profile',
        icon:"FiUser",
        allowedAccountType:[accountType.ADMIN , accountType.TEACHER]
    },
    {
        accountType:accountType.ADMIN,
        path:"dashboard-course",
        title:"Course",
        icon:"FiBook"
    },
    {
        accountType:accountType.ADMIN,
        path:"/dashboard-semester",
        title:"Semester",
        icon:"FiLayers"
    },
    {
        accountType:accountType.ADMIN,
        path:"/dashboard-subject",
        title:"Subject",
        icon:"FiClipboard"
    },
    {
        accountType:accountType.ADMIN,
        path:"/dashboard-student",
        title:"Student",
        icon:"FiUsers"
    },
    {
        accountType:accountType.TEACHER,
        path:"/dashboard-attendance-sheet",
        title:"Attendance Sheet",
        icon:"FiList"
    },
    {
        accountType:accountType.TEACHER,
        path:"/dashboard-statistics",
        title:"Statistics",
        icon:"FiBarChart"
    },
    {
        accountType:accountType.TEACHER,
        path:"/dashboard-report",
        title:"Report",
        icon:"FiFileText"
    }
]
export default dashBoardLinks