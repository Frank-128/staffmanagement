import React, { useEffect, useState } from 'react'
import { Button, Modal } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../UserContext';

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const {users,handleDeleteAccount} = useAppContext();
    const [userProfile,setProfile] = useState({})
    const id = location.pathname.split('/')[2]
    const [deleteAcc,setDeleteAcc] = useState(false)
    
    useEffect(()=>{
       const theUser = users.find((item)=>item.id == id);
       console.log(theUser)
       setProfile(theUser) ;
    },[location])
    
  return (
    <div className=' p-3'>
      <div className='flex items-start'>
        <Button onClick={()=>navigate(-1)}>Back</Button>
      </div>
      <div className='flex flex-col items-center gap-3'>
        <img className='rounded-md' src={userProfile?.gender =="male"?"/male.png":"/female.png"} alt="" />
        <div className=' p-3 w-1/4 bg-slate-300 rounded shadow-slate-700 shadow-lg'>
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Name:</span>
            <span>{userProfile?.name}</span>
            </div>
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Gender:</span>
            <span>{userProfile?.gender}</span>
            </div>
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Email:</span>
            <span>{userProfile?.email}</span>
            </div>
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Address:</span>
            <span>{userProfile?.address}</span>
            </div>
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Phone Number:</span>
            <span>{userProfile?.phoneNumber}</span>
            </div>
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Role:</span>
            <span>{userProfile?.role}</span>
            </div>
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Short Bio:</span>
            <span>{userProfile?.bio}</span>
            </div>
           <div className='flex items-center justify-center'>
           <button className='bg-red-900 p-3 text-slate-200 rounded ' onClick={()=>setDeleteAcc(true)}>
                Delete Account
            </button>
           </div>
        </div>
      </div>
      <Modal open={deleteAcc} onClose={()=>setDeleteAcc(false)} className='flex justify-center items-center'>
        <div className='bg-slate-300 flex flex-col p-4 '>
            <span>Are you sure you want to delete account?</span>
            <div className='flex justify-between p-4 '>
            <button className='bg-red-500 rounded w-1/3 text-slate-100  p-4' onClick={handleDeleteAccount}>Yes</button>
            <button className='bg-green-500 rounded w-1/3 text-slate-100  p-4'>No</button>
            </div>
        </div>
      </Modal>
    </div>
  )
}

export default Profile