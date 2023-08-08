import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const Navbar = () => {
  return (
    <div className='flex w-full shadow-md bg-white h-max top-0 sticky z-50'>
      <div className="max-w-[1440px] w-full flex mx-auto items-center  justify-between  h-max p-4 gap-x-3 ">

        <div className="flex">
          <h1 className="text-blue-400 text-2xl font-bold w-max">Todo App</h1>
        </div>
        <div className="flex items-center gap-x-5">
          <div className='flex items-center rounded-full border border-blue-400 p-2 max-w-sm '>
            <input name='search' type="text" placeholder='Search' className=' rounded-l-md w-full outline-none px-2' />
            <button className='rounded-r-full flex items-center px-2'>
            <SearchOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar