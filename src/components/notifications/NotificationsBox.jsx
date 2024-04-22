import { useEffect, useState } from 'react'
import { TbPlus, TbMinus } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { FiDownload, FiMinusCircle } from "react-icons/fi";
import { AiFillDelete, AiFillLike } from "react-icons/ai";
import { LuPencil } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";

import { useDispatch, useSelector } from 'react-redux';
import { loadingOff, loadingOn } from '../../store/authSlice';
import { cancelQued, changeCustomerStatus, deleteCustomer, getNotifications, setQued, setSent, updateLastMessage } from '../../services/notifications';
import { setData } from '../../store/notificationSlice';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants';
import { EditMessageModal } from '../common/EditMessageModal';

export const NotificationsBox = () => {
    const [expandId, setExpandId] = useState(null)
    const [expandChildId, setExpandChildId] = useState(null)
    const data = useSelector(state => state.notification.data)
    const [editMessage, setEditMessage] = useState('')
    const [turnOnEdit, setTurnOnEdit] = useState(null)
    const [refetch, setRefetch] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData()
    }, [refetch])

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

    const handleCancelMessage = async () => {
        setEditMessage('');
        setTurnOnEdit(null)
    }

    const handlerUpdateLastMessage = async (message) => {
        if (!turnOnEdit) return;

        dispatch(loadingOn())
        await updateLastMessage(turnOnEdit, message)
        dispatch(loadingOff())
        setEditMessage('')
        setTurnOnEdit(null)
        setRefetch(!refetch)
    }

    const handleDeleteMessage = async (projectId) => {
        dispatch(loadingOn())
        await updateLastMessage(projectId, '')
        dispatch(loadingOff())
        setRefetch(!refetch)
    }

    const handlerSetQued = async (project_id) => {
        dispatch(loadingOn())
        await setQued(project_id)
        dispatch(loadingOff())
        setRefetch(!refetch)
    }

    const handlerCancelQued = async (project_id) => {
        dispatch(loadingOn())
        await cancelQued(project_id)
        dispatch(loadingOff())
        setRefetch(!refetch)
    }

    const handlerChangeCustomerStatus = async (customer_id, method) => {
        alert(method);
        dispatch(loadingOn())
        await changeCustomerStatus(customer_id, method)
        dispatch(loadingOff())
        setRefetch(!refetch)
    }

    const handleDeleteCustomer = async (customer_id) => {
        dispatch(loadingOn())
        await deleteCustomer(customer_id)
        dispatch(loadingOff())
        setRefetch(!refetch)
    }

    const handlerSetSent = async (project_id) => {
        dispatch(loadingOn())
        await setSent(project_id)
        dispatch(loadingOff())
        setRefetch(!refetch)
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
                        const colors = {};
                        item.data.forEach((childData) => {
                            let childStatus = 'REVIEW';
                            if (childData.message_status === 1) {
                                childStatus = 'REVIEW'
                            }else if (childData.message_status === 2) {
                                childStatus = 'QUED'
                            }else if (childData.message_status === 3) {
                                childStatus = 'SENT'
                            }
                            
                            if (!colors[childStatus]) {
                                colors[childStatus] = childStatus === 'REVIEW' ? 'bg-yellow-500' : childStatus === 'QUED' ? 'bg-yellow-300' : 'bg-green-300';
                            }
                        })
                    
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

                                        {expandId !== item.project_id &&
                                            Object.values(colors).map((color, i) => {
                                                return <div key={color} className={`${color} w-7 h-7 rounded-[50%] ${i !== 0 ? '-ml-4': ''}`} />
                                            })
                                        }

                                        {item.sending_method == 2 ? (<IoMdRefresh className="text-3xl text-green-500 cursor-pointer" onClick={() => handlerChangeCustomerStatus(item.customer_id, 1)}/>) : (
                                            <IoMdRefresh className="text-3xl text-white cursor-pointer" onClick={() => handlerChangeCustomerStatus(item.customer_id, 2)}/>)}
                                        <IoCloseSharp className="text-3xl text-white cursor-pointer" onClick={() => {
                                            handleDeleteCustomer(item.customer_id)
                                        }}/>
                                    </div>
                                </div>

                                {expandId === item.project_id && item.data.map((childData) => {
                                    let childStatus = 'REVIEW';
                                    if (childData.message_status === 1) {
                                        childStatus = 'REVIEW'
                                    }else if (childData.message_status === 2) {
                                        childStatus = 'QUED'
                                    }else if (childData.message_status === 3) {
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
                                                    { childStatus === 'REVIEW' && <BsCheckLg className="text-3xl text-gray-400 cursor-pointer" 
                                                        onClick={() => handlerSetQued(childData.project_id)}
                                                    /> }
                                                    { childStatus === 'QUED' && (
                                                        <div className='flex cursor-pointer'>
                                                            <BsCheckLg className="text-3xl text-gray-400 cursor-pointer" />
                                                            <BsCheckLg className="text-3xl text-green-500 cursor-pointer -ml-4" />
                                                        </div>
                                                    )}
                                                    { childStatus === 'SENT' && (
                                                        <div className='flex cursor-pointer'>
                                                            <BsCheckLg className="text-3xl text-green-500 cursor-pointer" />
                                                            <BsCheckLg className="text-3xl text-green-500 cursor-pointer -ml-4" />
                                                        </div>
                                                    )}
                                                    <FiDownload className="text-3xl" />
                                                    {/* <AiOutlineMinusCircle className="text-3xl text-red-500" />  */}
                                                    { childStatus === 'REVIEW' && <AiFillDelete className="text-3xl text-red-500 cursor-pointer"
                                                        onClick={() => {
                                                            const res = confirm('Are you really sure to delete the message?')
                                                            if (res) {
                                                                handleDeleteMessage(childData.project_id)
                                                            }
                                                        }}
                                                    />}
                                                    { childStatus === 'QUED' && <FiMinusCircle className='text-2xl cursor-pointer text-red-500' 
                                                        onClick={() => handlerCancelQued(childData.project_id) }
                                                    />}
                                                    { childStatus === 'SENT' && <AiFillLike className="text-2xl cursor-pointer"/> }
                                                </div>
                                            </div>

                                            {expandChildId === childData.project_id && (
                                                <div className='bg-white p-2 flex flex-col gap-1'>
                                                    <p className='font-light text-xl'>{childData.sent_timestamp ? moment(item.sent_timestamp).format(DATE_FORMAT) : '-'}</p>
                                                    <p className='font-light text-xl'>{childData.claim_number}</p>
                                                    <div className='flex justify-between items-center'>
                                                        <p className='text-xl'>Message:</p>
                                                        <LuPencil className="text-xl text-gray-400 cursor-pointer" 
                                                            onClick={() => {
                                                                setTurnOnEdit(childData.project_id)
                                                                setEditMessage(childData.last_message || '')
                                                            }}
                                                        />
                                                    </div>
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

            { turnOnEdit && <EditMessageModal message={editMessage} onSave={handlerUpdateLastMessage} onCancel={handleCancelMessage} /> }
        </div>
    )
}
