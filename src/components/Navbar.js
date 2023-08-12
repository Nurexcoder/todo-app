import React, { useEffect, useState } from 'react'
import { GoogleCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo, addTodoFirebase, fetchUserTodos, searchTodo } from '../sclices/todoSlice';
import { auth, signInWithGoogle } from '../utils/Firebase';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Modal } from '@mui/material';
import { Logout } from '@mui/icons-material';
import TodoForm from './customComponents/TodoForm';
import { useNavigate } from 'react-router-dom';
import { mS } from '../constants';
const { Search } = Input;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const Navbar = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [openTodo, setOpenTodo] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate()
  const [currentTodo, setCurrentTodo] = React.useState({
    title: '',
    description: '',
    priority: 0,
    dueDate: '',
  })

  const handleChange = (e) => {
    setCurrentTodo({
      ...currentTodo,
      [e.target.name]: e.target.value,
    });
  }
  const clearCurTodo = () => {
    setCurrentTodo({
      title: '',
      description: '',
      priority: 0,
      dueDate: '',
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    if (currentTodo.title) {

      const formatedDate = currentTodo.dueDate ? currentTodo.dueDate?.$D + ' ' + mS[currentTodo.dueDate.$M] : ''
      const tempCurrentTodo = { ...currentTodo }
      tempCurrentTodo.dueDate = formatedDate


      dispatch(
        addTodoFirebase({
          id: Date.now(),
          title: currentTodo.title,
          description: currentTodo.description,
          priority: currentTodo.priority,
          dueDate: formatedDate,
          done: false,
          userId:user.uid
        })
      );
      setCurrentTodo({
        title: '',
        description: '',
        priority: 0,
        dueDate: '',
      });
      navigate('/')
    }
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

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dispatch(fetchUserTodos())
   }, [user])
  console.log(user?.uid)
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
          {
            !user ?
              <button className='bg-black/90 py-2 px-6 text-white rounded-full hover:bg-black/100 flex items-center gap-x-1' onClick={signInWithGoogle}>Signin</button> :
              <div onClick={handleClick} >

                <Avatar alt={user?.displayName} src={user?.photoURL} />
              </div>
          }
          <Modal open={openTodo}>
            <div style={style} className="">

              <TodoForm handleSubmit={handleSubmit} handleChange={handleChange}
                currentTodo={currentTodo} setCurrentTodo={setCurrentTodo}
                clearCurTodo={clearCurTodo} />
            </div>
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

            <MenuItem onClick={handleSignOut}>
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