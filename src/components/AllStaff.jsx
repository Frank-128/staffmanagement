import React, { useEffect } from 'react'
import { useAppContext } from '../UserContext'
import { useNavigate } from 'react-router-dom';

function AllStaff() {
  const {users} = useAppContext();
  
  const navigate = useNavigate();
  return (
    <div className='flex items-center flex-col'>
     { users.length!=0 ?<>
      <p className='font-bold text-2xl p-2 border-b-2 w-full text-center'>Manager</p>
      <div className='flex gap-10'>
     {users.filter(item=>item.role?.toLowerCase() === "manager").map((it,k)=> <div key={k} onClick={()=>navigate('/profile/'+it.id)} className='p-2 flex flex-col items-center'>
      <img src={it.gender=="female"?"/female.png":"/male.png"} alt="avatar" className='rounded-full  w-36 h-36' />
      <span className='font-light'>{it.name}</span>
      </div>)}

      </div>
      <p className='font-bold text-2xl p-2 border-b-2 w-full text-center'>Digital Marketing</p>
     <div className='flex gap-10'>
    {users.filter(item=>item.role?.toLowerCase() === "digital marketing director").map((it,k)=> <div key={k} onClick={()=>navigate('/profile/'+it.id)} className='p-2 flex flex-col items-center'>
      <img src={it.gender=="female"?"./female.png":"./male.png"} alt="avatar" className='rounded-full w-36 h-36' />
      <span className='font-light'>{it.name}</span>
      </div>)}
     
     </div>
      <p className='font-bold text-2xl p-2 border-b-2 w-full text-center'>Developers</p>
      <div className='flex gap-5'>
      {users.filter(item=>item.role?.toLowerCase() === "developer").map((it,k)=> <div key={k} onClick={()=>navigate('/profile/'+it.id)} className='p-2 flex flex-col items-center'>
      <img src={it.gender=="female"?"./female.png":"./male.png"} alt="avatar" className='rounded-full w-36 h-36' />
      <span className='font-light'>{it.name}</span>
      </div>)}
     
      </div>
     </>:<p>Loading...</p>}
    </div>
  )
}

export default AllStaff