import { useSelector } from 'react-redux'

export const Navbar = () => {
    const{user}=useSelector((state)=>state.profile)  
 
 
  
    return (
    <div className=' w-full py-2 bg-white font-inter shadow-sm relative z-10'>
    <div className='mx-auto w-11/12 max-w-maxContent text-blue-500 flex items-center justify-between'>
        <h1 className=' text-2xl'>Attendify</h1>
        {user && <div className=' flex gap-2 items-center text-xs text-lightblack'>
          <img src={user?.image} className=' rounded-full w-12'/>
          <div>{user.firstName} {" "} {user?.lastName}</div>
        </div>}
    </div>
    </div>
  )
}
