import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../UserContext';
import { Logout } from '@mui/icons-material';
import Swal from 'sweetalert2';

function Sidebar() {
    const navigate = useNavigate();
    const {handleLogout,loggedUser} = useAppContext()
    
  return (
    <div className='basis-1/4 flex flex-col bg-slate-200 font-mono text-2xl gap-10  border-r-2 border-slate-300 p-3'>
        <img src="./kalen.jpeg" alt="logo" className='h-1/6 rounded object-cover' />
        
        <div onClick={()=>navigate('/')} className='bg-slate-300 rounded p-4 hover:opacity-70 hover:scale-95 duration-500 cursor-pointer'>
            All staff
        </div>
        <div onClick={()=>navigate('/profile/'+loggedUser.id)} className='bg-slate-300 rounded p-4 hover:opacity-70 hover:scale-95 duration-500 cursor-pointer'>
           My Profile
        </div>
        <div onClick={()=>{loggedUser.role === "manager"?navigate('/manage'):Swal.fire({title:"Action denied",text:"You can not perform this action you are not the manager",icon:"error"})}} className='bg-slate-300 rounded p-4 hover:opacity-70 hover:scale-95 duration-500 cursor-pointer'>
           Manage staff
        </div>
        <div onClick={()=>navigate('/about')} className='bg-slate-300 rounded p-4 hover:opacity-70 hover:scale-95 duration-500 cursor-pointer'>
            About
        </div>
        <div onClick={handleLogout} className='bg-slate-300 rounded p-4 hover:opacity-70 hover:scale-95 duration-500 cursor-pointer'>
            Logout <Logout/>
        </div>
    </div>
  )
}

export default Sidebar