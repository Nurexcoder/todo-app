import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { daysInWeek, mS } from '../../constants'

const DisplayDate = () => {
    const requiredDate = useSelector(state => state.reducer.todos.requiredDate)

    const [dateObj, setDateObj] = useState({
        day: 0,
        date: 0,
        viewingDays: 0
    })

    const getDateObj = () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (requiredDate === 100) {
            return {
                day: today.getDay(),
                date: today.getDate(),
                viewingDays: 'Today\'s'
            }
        }
        else if (requiredDate === 101) {
            let tommorow = new Date()
            tommorow.setHours(0, 0, 0, 0)
            tommorow.setDate(tommorow.getDate() + 1)
            return {
                day: tommorow.getDay(),
                date: tommorow.getDate() + 1,
                viewingDays: 'Tomorrow\'s'
            }
        }
        else if (requiredDate === 102) {
            return {
                day: '',
                date: '',
                viewingDays: 'All'
            }
        }
        else {
            return {
                day: requiredDate.getDay(),
                date: requiredDate.getDate(),
                viewingDays: requiredDate.getMonth()
            }
        }

    }

    useEffect(() => {

        setDateObj(getDateObj())

    }, [requiredDate])


    return (
        <div className="font-poppins font-bold text-base leading-tight">
            <h3 className='flex gap-x-2'>
                <span>

                    {daysInWeek[dateObj?.day]}
                </span>

                <span>

                    {dateObj?.date}
                </span>
            </h3>
            <h3>
                {typeof (dateObj.viewingDays) === 'string' ? dateObj.viewingDays : mS[dateObj.viewingDays]}
            </h3>
        </div>
    )
}

export default DisplayDate