import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useAppContext } from '../UserContext';
function Login() {
  const [user,setUser] = useState("")
  const [password,setPassword] = useState("");
  const {handleLogin,loggedUser,errors} = useAppContext()

  const handleSubmit =(e)=>{
  e.preventDefault();
  handleLogin(user,password)
}

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-slate-400'>
        <form onSubmit={handleSubmit} className=' bg-slate-100 p-3 rounded shadow-xl w-1/4 h-2/3 flex items-center gap-4 flex-col'>
            <img src="/kalen.jpeg" className='w-4/5 h-1/6 object-contain' alt="" />
            <p>
                <i>Login to Kalen Technologies Company</i>
            </p>
            <i>{errors.status && <span className='text-red-600'>Incorrect credentials</span>}</i>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="name">Email</label>
                <input type="email" className='p-2' value={user} onChange={(e)=>setUser(e.target.value)} />
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="email">Password</label>
                <input type="password" className='p-2' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <button className='p-3 bg-green-950 rounded text-slate-300 w-full' type="submit">Login</button>
            <span><i>Don't have an account? <Link to='/register' className='text-green-600'>register</Link></i></span>
            </form>
    </div>
  )
}

export default Login