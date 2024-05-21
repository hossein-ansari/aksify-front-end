import React from 'react'
import './aksList.css'
import { useNavigate } from 'react-router-dom'
export default function AksLists() {
  const navigate = useNavigate();
  function moveEditImage(id:String) {
    navigate(`/editImage/${id}`)
  }
  return (
    <div className='AksContainer'>
      <div  className='AksBar'>
        <div className='AksBox' onClick={()=>moveEditImage('123')}>
          <img  className='AksImage' src="/test.jpg" alt="" />
          <p className='AksTitle'>پاکت</p>
        </div>
      </div>
    </div>
  )
}
