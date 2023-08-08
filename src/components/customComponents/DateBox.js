import { CalendarOutlined } from '@ant-design/icons'
import React from 'react'
import { mS } from '../../constants'


const DateBox = ({ date, fixedDate }) => {


    const today = new Date()

    const formatedToday = today.getDate() + ' ' + mS[today.getMonth()]

    let formatedDate = fixedDate
    if (date) {
        formatedDate = date.$D + ' ' + mS[date.$M]
    }
    
    

    switch (formatedDate) {
        case formatedToday:
            return <span className='bg-red-400 text-white  px-2 py-0.5 rounded-md flex items-center gap-x-2 text-xs'> <CalendarOutlined /> Today</span>
        case undefined:
            return ''
        default:
            return <span className='bg-blue-400 text-white  px-2 py-0.5 rounded-md flex items-center gap-x-2 text-xs'> <CalendarOutlined /> {formatedDate} </span>
    }
}

export default DateBox