import { Calendar, Collapse } from 'antd'
import React from 'react'
import CalenderComponent from './customComponents/CalenderComponent'
import { Avatar, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout';
import { handleSignOut } from '../sclices/authSlice'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.reducer?.auth?.user)
  const userTodos = useSelector(state => state.reducer.todos.allTodos)
  const completedTaskes = userTodos?.filter((item) => item.done)

  const pendingTaskes = userTodos?.filter((item) => !item.done)
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(handleSignOut())
    navigate('/')
  }
  // md:col-span-5 lg:col-span-4  xl:col-span-3
  return (
    <div className=' hidden md:flex flex-col items-center    bg-primary rounded-3xl px-3 py-4 gap-y-4 sticky top-0'>
      <div className="bg-secondary rounded-xl w-full p-3 flex items-center  gap-x-4  ">
        <Avatar alt={user?.displayName} sx={{ width: 46, height: 46 }} src={user?.photoURL} />
        <div className="flex flex-col font-poppins ">
          <h3 className='text-lg font-bold leading-tight'>
            {user?.displayName}
          </h3>
          <h4 className="text-sm font-semibold leading-tight">
            Pending Tasks : {pendingTaskes?.length}
          </h4>
          <h4 className="text-sm font-semibold leading-tight">
            Completed Tasks : {completedTaskes?.length}
          </h4>
        </div>
        <Tooltip title="Logout">

          <div className="ml-auto" onClick={handleLogout}>
            <LogoutIcon />

          </div>
        </Tooltip>

      </div>

      <CalenderComponent />

      <div className="grid  w-full gap-5">

        <h2 className='text-xl font-bold  p-2'>Cateogries</h2>
        <div className="grid  gap-y-4 w-full gap-x-1">
          <div className="bg-gen text-white p-3 rounded-xl drop-shadow-lg flex items-center justify-center">
            <h2 className='text-lg uppercase font-poppins text-center font-bold'>
              General <br />
              <span className='text-sm'>
                Tasks

              </span>
            </h2>
          </div>
          <div className="bg-high text-black p-3 rounded-xl drop-shadow-lg">
            <h2 className='text-lg uppercase font-poppins text-center font-bold'>
              High Prioriy
              <br />
              <span className='text-sm'>
                Tasks

              </span>
            </h2>
          </div>
          <div className="bg-medium text-black p-3 rounded-xl drop-shadow-lg">
            <h2 className='text-lg uppercase font-poppins text-center font-bold'>
              Medium Priority
              <br />
              <span className='text-sm'>
                Tasks

              </span>
            </h2>
          </div>
          <div className="bg-low text-black p-3 rounded-xl drop-shadow-lg">
            <h2 className='text-lg uppercase font-poppins text-center font-bold'>
              Low Priority
              <br />
              <span className='text-sm'>
                Tasks

              </span>
            </h2>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SideBar