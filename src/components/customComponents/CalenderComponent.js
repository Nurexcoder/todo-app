import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { DotChartOutlined } from '@ant-design/icons';
import { Modal } from '@mui/material';
import TodoForm from './TodoForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTodo } from '../../sclices/todoSlice';
import { mS } from '../../constants';

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            const daysInMonth = date.daysInMonth();
            const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

            resolve({ daysToHighlight });
        }, 500);

        signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
        };
    });
}

const initialValue = dayjs('2022-04-17');

function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
        !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

    return (
        <div className="relative ">

            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            {/* <span className='absolute left-[40%] top-[50%] translate-x-1/2 -translate-y-1/2 text-red-900 text-2xl font-bold'>
                .
            </span> */}
        </div>
    );
}

export default function DateCalendarServerRequest() {
    const requestAbortController = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
    const dispatch = useDispatch()
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
                addTodo({
                    id: Date.now(),
                    title: currentTodo.title,
                    description: currentTodo.description,
                    priority: currentTodo.priority,
                    dueDate: formatedDate,
                    done: false,
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
    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, {
            signal: controller.signal,
        })
            .then(({ daysToHighlight }) => {
                setHighlightedDays(daysToHighlight);
                setIsLoading(false);
            })
            .catch((error) => {
                // ignore the error if it's caused by `controller.abort`
                if (error.name !== 'AbortError') {
                    throw error;
                }
            });

        requestAbortController.current = controller;
    };

    React.useEffect(() => {
        fetchHighlightedDays(initialValue);
        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, []);

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            // make sure that you are aborting useless requests
            // because it is possible to switch between months pretty quickly
            requestAbortController.current.abort();
        }

        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };

    return (
        <div className='bg-secondary  w-full rounded-xl'>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    defaultValue={initialValue}

                    // loading={isLoading}

                    onMonthChange={handleMonthChange}
                    // renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: ServerDay,
                    }}

                    slotProps={{
                        day: {
                            highlightedDays,
                        },
                    }}
                />
            </LocalizationProvider>


        </div>
    );
}
