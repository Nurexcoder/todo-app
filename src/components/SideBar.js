import { Calendar, Collapse } from 'antd'
import React from 'react'
import CalenderComponent from './customComponents/CalenderComponent'

const SideBar = () => {
  return (
    <div className='bg-white hidden md:grid col-span-3  '>
    
    <CalenderComponent/>
    </div>
  )
}

export default SideBar