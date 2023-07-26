import React from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

function Home() {
  return (
    <div className='flex flex-col h-screen w-screen font-mono'>
       <div className='flex basis-11/12'>
       <Sidebar/>
        <Main/>
       </div>
        <footer className="bg-slate-300 basis-1/12 bottom-0  flex justify-center">
        <span>&copy;2023 Kalen Cooperation Inc.</span>
    </footer>
    </div>
  )
}

export default Home