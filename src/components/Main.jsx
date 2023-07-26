import React from 'react'
import { Outlet } from 'react-router-dom'

function Main() {
  return (
    <div className='basis-3/4  bg-slate-100'>
        <div className=' top-0 bg-slate-300 text-center w-full h-12 border-slate-400 border-b-2'>
            <h3 className='text-blue-950  text-2xl'>Kalen Investment Company</h3>
        </div>
        <Outlet/>
    </div>
  )
}

export default Main