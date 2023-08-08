import { FlagOutlined } from '@ant-design/icons';
import React from 'react'

const PriorityBox = ({priority}) => {
  switch (priority) {
    case 0:
        return ""
    case 1:
        return <span className='bg-green-400 text-white text-xs py-0.5 px-2 rounded-md flex items-center gap-x-2'> <FlagOutlined color='green' /> Low</span>
    case 2:
        return <span className='bg-blue-400 text-white text-xs py-0.5 px-2 rounded-md flex items-center gap-x-2'> <FlagOutlined color='blue' /> Medium</span>
    case 3:
        return <span className='bg-red-400 text-white text-xs py-0.5 px-2 rounded-md flex items-center gap-x-2'> <FlagOutlined color='red' /> High</span>
    default:
        break;
  }
}

export default PriorityBox