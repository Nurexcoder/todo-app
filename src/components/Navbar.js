import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const Navbar = () => {
  return (
    <div className='flex w-full shadow-md bg-white h-max'>
      <div className="max-w-[1440px] w-full flex mx-auto  justify-between  h-max p-4 ">

        <div className="flex">
          <h1 className="text-blue-400 text-2xl font-bold">Todo App</h1>
        </div>
        <div className="flex items-center gap-x-5">
          <div className='flex items-center rounded-full border border-blue-400 p-2'>
            <input name='search' type="text" placeholder='Search' className=' rounded-l-md outline-none px-2' />
            <button className='rounded-r-full flex items-center px-2'>
            <SearchOutlined />
            </button>
          </div>
          <button className='bg-blue-400 p-2 rounded-md text-blue-50'>
            Add Todo
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar