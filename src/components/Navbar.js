import React from 'react'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { searchTodo } from '../sclices/todoSlice';
const { Search } = Input;
const Navbar = () => {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(searchTodo(e.target.value));
  }
  return (
    <div className='flex w-full shadow-md bg-white h-max top-0 sticky z-50'>
      <div className="max-w-[1440px] w-full flex mx-auto items-center  justify-between  h-max p-4 gap-x-3 ">

        <div className="flex">
          <h1 className="text-blue-400 text-2xl font-bold w-max">Todo App</h1>
        </div>
        <div className="flex items-center gap-x-5">
          {/* <div className='flex items-center rounded-full border border-blue-400 p-2 max-w-sm '>
            <input name='search' type="text" placeholder='Search' className=' rounded-l-md w-full outline-none px-2 bg-transparent' onChange={handleSearch} />
            <button className='rounded-r-full flex items-center px-2' >
              <SearchOutlined />
            </button>
          </div> */}
          <button className='bg-blue-400 py-2 px-5 lg:px-3 text-white rounded-full hover:bg-blue-500 flex items-center gap-x-1 '><PlusOutlined />
            <span className='hidden lg:inline'>

              Add Todo
            </span>
          </button>
          {/* <button className='bg-green-400 py-2 px-3 text-white rounded-full hover:bg-green-500 flex items-center gap-x-1'><PlusOutlined />Add Todo </button> */}

        </div>
      </div>
    </div>
  )
}

export default Navbar