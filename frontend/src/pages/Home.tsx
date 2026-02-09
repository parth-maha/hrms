import React from 'react'
import useAuthStore from '../store/authStore'

function Home() {
  const {empId, name} = useAuthStore();
  return (
    <div className='p-3'>
      <div>{empId}</div>
      <div>{name}</div>
    </div>
  )
}

export default Home