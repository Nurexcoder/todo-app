import React, { useEffect, useState } from 'react'
import { GoogleCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo, addTodoFirebase, fetchAllTodos, fetchUserTodos, searchTodo } from '../sclices/todoSlice';
import { auth } from '../utils/Firebase';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Modal } from '@mui/material';
import { Add, Logout } from '@mui/icons-material';
import TodoForm from './customComponents/TodoForm';
import { useNavigate } from 'react-router-dom';
import { mS } from '../constants';
import { handleSignOut, signInWithGoogle } from '../sclices/authSlice';
const { Search } = Input;


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [openTodo, setOpenTodo] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenTodo = () => {
    setOpenTodo(!openTodo)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  const handleSearch = (e) => {
    dispatch(searchTodo(e.target.value));
  }

  useEffect(() => {
    dispatch(fetchUserTodos())
    dispatch(fetchAllTodos())
  }, [user])
  const handleLogout = () => {
    dispatch(handleSignOut())
    navigate('/')
  }
  return (
    <div className='flex w-full shadow-md bg-white h-max top-0 sticky z-50'>
      <div className="max-w-[1440px] w-full flex mx-auto items-center  justify-between  h-max p-4 gap-x-3 ">

        <div className="flex items-center">
          <img src='/images/logo.png' alt='logo' className='w-32' />
        </div>
        <div className="flex items-center gap-x-5">
          {/* <div className='flex items-center rounded-full border border-blue-400 p-2 max-w-sm '>
            <input name='search' type="text" placeholder='Search' className=' rounded-l-md w-full outline-none px-2 bg-transparent' onChange={handleSearch} />
            <button className='rounded-r-full flex items-center px-2' >
              <SearchOutlined />
            </button>
          </div> */}
          <button className='bg-[#00A3FF] py-2 px-5 lg:px-3 text-white rounded-full hover:bg-blue-500 flex items-center gap-x-1 font-bold text-xl font-poppins ' onClick={handleOpenTodo}>

            <Add sx={{ fontWeight: '800' }} />
            <span className='hidden lg:inline'>

              Add Todo
            </span>
          </button>
          <div className="md:hidden">

            {
              !user ?
                <button className='bg-black/90 py-2 px-6 text-white rounded-full hover:bg-black/100 flex items-center gap-x-1 ' onClick={() => dispatch(signInWithGoogle())}>Signin</button> :
                <div onClick={handleClick} >

                  <Avatar alt={user?.displayName} src={user?.photoURL} />
                </div>
            }
          </div>
          <Modal open={openTodo}>
            <TodoForm handleClose={handleOpenTodo} />
          </Modal>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                px: 1,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />

            <MenuItem onClick={() => handleLogout()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Navbar