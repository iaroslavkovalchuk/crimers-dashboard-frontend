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
import { setData, updateMessageStatus } from '../../store/notificationSlice';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants';
import { EditMessageModal } from '../common/EditMessageModal';
import toast from 'react-hot-toast';
import messageIcon from "../../assets/message.svg";
import phoneIcon from "../../assets/phone.svg"
import logo from "../../assets/logo.svg";

export const NotificationsBox = () => {
    const [expandId, setExpandId] = useState(null)
    const [expandChildId, setExpandChildId] = useState(null)
    const data = useSelector(state => state.notification.data)
    const [editMessage, setEditMessage] = useState('')
    const [turnOnEdit, setTurnOnEdit] = useState(null)
    const [refetch, setRefetch] = useState(false);
    const dispatch = useDispatch()
    const [remainTime, setRemainTime] = useState([]);

    useEffect(() => {
        fetchData()
    }, [refetch])

    useEffect(() => {
        const interval = setInterval(async () => {
            const now = Date.now();
            const today = new Date();
            let sent_array = [];
            const timeArray = data?.map((item, itemIndex) => 
                item.data?.map((childData, childIndex) => {

                    if(childData.message_status != 2) return "";

                    console.log(childData.qued_timestamp);
                    const timestamp = childData.qued_timestamp.endsWith('Z') ? 
                          childData.qued_timestamp :
                          `${childData.qued_timestamp}Z`;
                    const qued_time = new Date(timestamp);
                    console.log("qued_time", `${qued_time.getUTCHours()}:${qued_time.getUTCMinutes()}:${qued_time.getUTCSeconds()}`)
                    // console.log(qued_time.getTime());

                    qued_time.setUTCMinutes(qued_time.getUTCMinutes() + 5); // Use UTC methods

                    // console.log("now", now)
                    console.log("now", `${today.getUTCHours()}:${today.getUTCMinutes()}:${today.getUTCSeconds()}`)
                    const difference = qued_time.getTime() - today.getTime();

                    console.log("difference: ", qued_time.getTime() < today.getTime());
                    
                    if(childData.message_status == 2 && qued_time.getTime() < today.getTime()) {
                        sent_array.push([itemIndex, childIndex, childData.project_id]);
                    }
                    
                    const durationDate = new Date(difference);

                    // Format the duration as a UTC time string (ignoring the date part)
                    const timeString = durationDate.toISOString().substr(11, 8); // "HH:mm:ss" format

                    // Extract minutes and seconds
                    const minutes = timeString.substr(3, 2);
                    const seconds = timeString.substr(6, 2);

                    // Return the time difference as a string in the format "M:S"
                    return `${parseInt(minutes, 10)}:${seconds}`;
                })
            )

            setRemainTime(timeArray);

            sent_array.forEach(async (item) => {
                const itemIndex = item[0];
                const childIndex = item[1];
                const project_id = item[2];
                const newStatus = 3;
                // await setSent(project_id);
                // setRefetch(!refetch)
                dispatch(updateMessageStatus({ itemIndex, childIndex, newStatus }));
                await handlerSetSent(project_id);
            })

        }, 1000); // This will run every second
        
        // Clean up function
        return () => {
            clearInterval(interval);
        };
      
    }, [data, remainTime, updateMessageStatus, dispatch])


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

    const handlerSetQued = async (project_id, email, phone) => {
        if(!email){
            toast.error("Can't find customer's email address.")
        }
        if(!phone){
            toast.error("Can't find customer's phone number.")
        }

        if(!email && !phone){
            toast.error("Excuse me, you can't send message to this customer. There is no phone number or email address.")
            return;
        }

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
        // toast(method);
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
                <img src={logo} alt="logo" 
                    className="w-[100%] h-[100%]"
                />
            </div>

            <div className="pt-16">
                <div className="py-2 px-4 bg-red-700 mb-[1px]">
                    <p className="text-xl text-center font-semibold text-white">NOTIFICATIONS</p>
                </div>

                <div>
                    { data.map((item, dataIndex) => {
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
                                            {item.last_name && item.first_name && `${item.last_name}, ${item.first_name}`}
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

                                {expandId === item.project_id && item.data.map((childData, childIndex) => {
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
                                                    <p className='text-green-500 font-semibold'>{(childStatus === "QUED" && remainTime[dataIndex][childIndex]) && remainTime[dataIndex][childIndex]}</p> 
                                                    { childStatus === 'REVIEW' && <BsCheckLg className="text-3xl text-gray-400 cursor-pointer" 
                                                        onClick={() => handlerSetQued(childData.project_id, childData.email, childData.phone)}
                                                    /> }
                                                    { childStatus === 'QUED' && (
                                                        <div className='flex cursor-pointer'>
                                                            <BsCheckLg className="text-3xl text-gray-400 cursor-pointer" />
                                                            <BsCheckLg className="text-3xl text-green-500 cursor-pointer -ml-4" />
                                                        </div>
                                                    )}
                                                    { childStatus === 'SENT' && (
                                                        <div className='flex cursor-pointer'>
                                                            {
                                                                (childData.email !== "") && (<>
                                                                    <img src={messageIcon} alt="messageIcon" style={{width:"30px", height: "30px", marginRight: "-30px"}}/>
                                                                    <BsCheckLg className={`text-3xl ${childData.email_sent_success === 1 ? 'text-green-500' : 'text-red-500'} cursor-pointer`} />
                                                                    <BsCheckLg className={`text-3xl ${childData.email_sent_success === 1 ? 'text-green-500' : 'text-red-500'} cursor-pointer -ml-4`} />
                                                                </>)
                                                            }
                                                            
                                                            {
                                                                (childData.phone !== "") && (<>
                                                                    <img src={phoneIcon} alt="phoneIcon" style={{width:"30px", height: "30px", marginRight: "-30px"}}/>
                                                                    <BsCheckLg className={`text-3xl ${childData.phone_sent_success === 1 ? 'text-green-500' : 'text-red-500'} cursor-pointer -ml-1`} />
                                                                    <BsCheckLg className={`text-3xl ${childData.phone_sent_success === 1 ? 'text-green-500' : 'text-red-500'} cursor-pointer -ml-4 -mr-2`} />
                                                                </>)
                                                            }
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
