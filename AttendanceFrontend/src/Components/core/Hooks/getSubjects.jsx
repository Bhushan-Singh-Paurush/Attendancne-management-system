import  { useEffect, useState } from 'react'
import { teacherSubjects } from '../../../services/Operations/Subject';
import { useSelector } from 'react-redux';

export const getSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const{user}= useSelector((state) => state.profile);  
  useEffect(() => {
         ;(async()=>{
          const result =await teacherSubjects(user._id);
          if (result) {
            setSubjects(result);
          }
          setLoading(false);
         })()
        },[]);
     return (
         {subjects,setSubjects,loading,setLoading} 
  )
}
