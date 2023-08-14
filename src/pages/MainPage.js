import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../store';
import Navbar from '../components/Navbar';
import TodoView from '../components/TodoView';
import SideBar from '../components/SideBar';

const MainPage = () => {
  return (
    <div className="h-screen overflow-y-scroll flex flex-col items-center gap-5  relative">
      <Navbar />
      <div className="grid grid-cols-mainBody w-full justify-center items-start  max-w-[1440px] h-full mx-auto p-2 gap-x-6 ">
        <SideBar/>

        <TodoView />
      </div>
    </div>
  )
}

export default MainPage