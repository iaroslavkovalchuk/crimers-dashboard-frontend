import { useEffect, useState } from 'react'
import { TbPlus, TbMinus } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { BsFillPencilFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { AiFillDelete, AiOutlineMinusCircle, AiFillLike } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";

import {notificationsData} from '../../constants/notificationsData'
import { useDispatch, useSelector } from 'react-redux';
import { loadingOff, loadingOn } from '../../store/authSlice';
import { getNotifications } from '../../services/notifications';
import { setData } from '../../store/notificationSlice';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants';

export const NotificationsBox = () => {
    const [expandId, setExpandId] = useState(null)
    const [expandChildId, setExpandChildId] = useState(null)
    const data = useSelector(state => state.notification.data)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        dispatch(loadingOn())
        const res = await getNotifications();
        dispatch(loadingOff())
        
        if (res) {
            if (Array.isArray(res)) {
                dispatch(setData(res))
            }
        }
    }

    return (
        <div>
            <div className="w-[300px] pl-8 pt-8">
                <img src="https://delmar-react-tailwind.vercel.app/static/media/logo.9f804465c04a053b763ff5493042c6f5.svg" alt="logo" 
                    className="w-[100%] h-[100%]"
                />
            </div>

            <div className="pt-16">
                <div className="py-2 px-4 bg-red-700 mb-[1px]">
                    <p className="text-xl text-center font-semibold text-white">NOTIFICATIONS</p>
                </div>

                <div>
                    { data.map((item) => {
                        return (
                            <>
                                <div key={item.project_id} className={`p-2 flex justify-between border-t-[1px] border-t-gray-700 ${expandId === item.project_id ? "bg-red-700": "bg-gray-400"}`}>
                                    <div>
                                        {expandId === item.project_id ? <TbMinus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(null)}/> : 
                                            <TbPlus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(item.project_id)}/> }
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-white">
                                            {item.lastname && item.firstname && `${item.lastname}, ${item.firstname}`}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <IoMdRefresh className='text-3xl text-white' />
                                        <IoCloseSharp className="text-3xl text-white" />
                                    </div>
                                </div>

                                {expandId === item.project_id && item.data.map((childData) => {
                                    let childStatus = '';
                                    if (item.message_status === 1) {
                                        childStatus = 'REVIEW'
                                    }else if (item.message_status === 2) {
                                        childStatus = 'QUED'
                                    }else if (item.message_status === 3) {
                                        childStatus = 'SENT'
                                    }
                                    return (
                                        <>
                                            <div key={childData.project_id} className={`p-2 flex justify-between ${childStatus === 'REVIEW' ? 'bg-yellow-500' : childStatus === 'QUED' ? 'bg-yellow-300' : 'bg-green-300'}`}>
                                                <div className='flex items-center gap-2'>
                                                    {expandChildId === childData.project_id ? <TbMinus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandChildId(null)}/> : 
                                                        <TbPlus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandChildId(childData.project_id)}/> }
                                                    
                                                        <p className="text-lg font-semibold">
                                                            {childStatus}
                                                        </p>
                                                </div>
                                                <div className="flex gap-3 items-center">
                                                    <BsCheckLg className="text-3xl text-gray-400" />
                                                    <FiDownload className="text-3xl" />
                                                    <AiOutlineMinusCircle className="text-3xl text-red-500" /> 
                                                </div>
                                            </div>

                                            {expandChildId === childData.project_id && (
                                                <div className='bg-white p-2 flex flex-col gap-1'>
                                                    <p className='font-light text-xl'>{childData.sent_timestamp ? moment(item.sent_timestamp).format(DATE_FORMAT) : '-'}</p>
                                                    <p className='font-light text-xl'>{childData.claim_number}</p>
                                                    <p className='text-xl'>Message:</p>
                                                    <p className='font-light text-xl'>{childData.last_message}</p>
                                                </div>
                                            )}
                                        </>
                                    )
                                })}
                            </>  
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
