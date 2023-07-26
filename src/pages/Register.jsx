import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAppContext } from '../UserContext';

function Register() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("")
    const [address,setAddress] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [bio,setBio] = useState("")
    const [gender,setGender] = useState("")
    const [role,setRole] = useState("manager")
    const {handleCreate} = useAppContext();
    const [err,setErr] = useState(false);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(password!== confirmPassword) return setErr(true);
        const data = {
            name,email,password,address,phoneNumber,bio,gender,role
        }
        console.log(data)
        await handleCreate(data);
    }
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-slate-400'>
        <form onSubmit={handleSubmit} className=' bg-slate-100 p-3 rounded shadow-xl w-1/2 h-[95%] flex items-center flex-col'>
            <img src="/kalen.jpeg" className='w-4/5 h-1/6 object-contain' alt="" />
            <p>
                <i>Register to Kalen Technologies Company</i>
            </p>
           <div className='flex gap-2'>
           <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="name">Name</label>
                <input type="text" className='p-2' value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="email">Email</label>
                <input type="email" className='p-2' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
           </div>
            <div className='flex gap-2'>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="address">Address</label>
                <input type="text" className='p-2' value={address} onChange={(e)=>setAddress(e.target.value)} />
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="phoneNumber">Phone Number</label>
                <input type="text" className='p-2' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
            </div>
            </div>
            <div className='flex gap-2'>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="bio">Role</label>
               <select onChange={(e)=>setRole(e.target.value)} className='p-2'>
                <option value="manager">Manager</option>
                <option value="digital marketing director">Digital Marketing Director</option>
                <option value="developer">Developer</option>
               </select>
            </div>
            <div className='flex flex-col  w-full p-3 '>
                <span className='font-bold'>Gender</span>
            <div className='flex gap-5'>
            <div className='flex gap-2'>
                <label className='font-semibold' htmlFor="female">Female</label>
              <input type="radio" name="gender" id="female" value="female" onChange={(e)=>setGender(e.target.value)} />
              </div>
              <div className='flex gap-2'>
                <label className='font-semibold' htmlFor="male">Male</label>
              <input type="radio" name="gender" id="male" value="male" onChange={(e)=>setGender(e.target.value)} />
              </div>
            </div>
                
            </div>
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="bio">Bio</label>
                <textarea type="text" className='p-2' value={bio} onChange={(e)=>setBio(e.target.value)} />
            </div>
            <div className="flex">
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="password">Password</label>
                <input type="password" className='p-2' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className='p-2' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                {err && <span className='text-red-400'>Password and confirm password fields do not match</span>}
            </div>

            </div>
            
            <button className='p-3 bg-blue-950 rounded text-slate-300 w-full'  type="submit">Register</button>
            <span><i>Already have an account? <Link to='/login' className='text-blue-600'>login</Link></i></span>
        </form>
    </div>
  )
}

export default Register