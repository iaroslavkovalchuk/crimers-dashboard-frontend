import { useState, useEffect } from 'react'
import { TbPlus, TbMinus } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { FiDownload, FiMinusCircle } from "react-icons/fi";
import { AiFillDelete, AiFillLike } from "react-icons/ai";
import { LuMessagesSquare, LuPencil } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import {getNotifications, setQued, cancelQued, setSent, updateLastMessage, downloadProjectMessage, downloadCustomerMessage, changeCustomerStatus, deleteCustomer} from '../../services/notifications'
import moment from 'moment';
import { DATE_FORMAT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setData, updateMessageStatus } from '../../store/notificationSlice';
import { loadingOff, loadingOn } from '../../store/authSlice';
import logo from "../../assets/logo.svg";
import messageIcon from "../../assets/message.svg";
import phoneIcon from "../../assets/phone.svg"
import { useNavigate } from 'react-router-dom';
import { EditMessageModal } from '../common/EditMessageModal';
import { combineSlices } from '@reduxjs/toolkit';

export const NotificationsTable = () => {
    const [expandId, setExpandId] = useState(null)
    const data = useSelector(state => state.notification.data)
    const [editMessage, setEditMessage] = useState('')
    const [turnOnEdit, setTurnOnEdit] = useState(null)
    const [refetch, setRefetch] = useState(false);
    const dispatch = useDispatch()
    
    const [remainTime, setRemainTime] = useState([]);
    const navigate = useNavigate()

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

        if (res.detail === "Could not validate credentials") {
            alert('Unauthorized user!');
            navigate('/signup')
        }
        
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

    const handlerDownloadProject = async (project_id) => {
        await downloadProjectMessage(project_id)
    }
    const handlerDownloadCustomer = async (customer_id) => {
        await downloadCustomerMessage(customer_id)
    }
    const handlerSetQued = async (project_id, email, phone) => {
        let count = 0;
        if(email === ""){
            count += 1;
            alert("Can't find customer's email address.");
        }
        if(phone === ""){
            count += 1;
            alert("Can't find customer's phone number.");
        }

        if(count == 2){
            alert("Excuse me, you can't send message to this customer. There is no phone number or email address.");
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
    const handlerSetSent = async (project_id) => {
        dispatch(loadingOn())
        await setSent(project_id)
        dispatch(loadingOff())
        setRefetch(!refetch)
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
    const handlerChangeCustomerStatus = async (customer_id, method) => {
        // alert(method);
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

    const handleDeleteMessage = async (projectId) => {
        dispatch(loadingOn())
        await updateLastMessage(projectId, '')
        dispatch(loadingOff())
        setRefetch(!refetch)
    }

    return (
        <div>
            <div className="w-[400px] pl-8 pt-8">
                <img src={logo} alt="logo" 
                    className="w-[100%] h-[100%]"
                />
            </div>

            <div className="pt-16">
                <div className="py-2 px-4 bg-red-700 inline-block mb-[1px]">
                    <p className="text-xl font-semibold text-white">NOTIFICATIONS</p>
                </div>

                <div>
                    <table className="w-[100%]">
                        <thead className=" bg-red-700">
                            <tr>
                                <th className="w-[5%]"/>
                                <th className="w-[10%] text-center p-2 text-lg text-white">Send On</th>
                                <th className="w-[10%] text-white text-lg text-center">Last Name</th>
                                <th className="w-[10%] text-white text-lg text-center">First Name</th>
                                <th className="w-[12%] text-white text-lg text-center">Claim</th>
                                <th className="w-[12%] text-white text-lg text-center">Status</th>
                                <th className="w-[41%] text-white text-lg text-center">Message</th>
                            </tr>
                        </thead>
                        
                        <tbody className="bg-white">
                            {data?.map((item, dataIndex) => {
                                let status = 'REVIEW';
                                if (item.message_status === 1) {
                                    status = 'REVIEW'
                                }else if (item.message_status === 2) {
                                    status = 'QUED'
                                }else if (item.message_status === 3) {
                                    status = 'SENT'
                                }
                                
                                return (
                                    <>
                                        <tr key={item.customer_id} className={`${expandId === item.customer_id ? "bg-red-700": "bg-gray-400"} border-t-2 border-t-white `}>
                                            <td className="text-center p-2">
                                                {expandId === item.customer_id ? <TbMinus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(null)}/> : 
                                                    <TbPlus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(item.customer_id)}/> }
                                            </td>
                                            <td className="text-lg font-semibold text-white text-center">{!(expandId === item.customer_id) && (item.sent_timestamp ? moment(item.sent_timestamp).format(DATE_FORMAT) : '-')}</td>
                                            <td className="text-lg font-semibold text-white text-center">{!(expandId === item.customer_id)  && item.lastname}</td>
                                            <td className="text-lg font-semibold text-white text-center">{!(expandId === item.customer_id)  && item.firstname}</td>
                                            <td className="text-lg font-semibold text-white text-center">{!(expandId === item.customer_id)  && item.claim_number}</td>
                                            <td className="text-lg font-semibold text-white text-center">{!(expandId === item.customer_id)  && status}</td>
                                            <td>
                                                <div className='flex items-center justify-between'>
                                                    <div>
                                                        <p className="text-lg font-semibold text-white">{}</p>
                                                    </div>
                                                    <div className="flex justify-end mr-3 gap-3 items-center">
                                                        <LuMessagesSquare className="text-3xl text-white" />
                                                        {/* <IoMdRefresh className={`text-3xl ${expandId === item.project_id? 'text-green-500': 'text-white'}`} /> */}
                                                        {item.sending_method == 2 ? (<IoMdRefresh className="text-3xl text-green-500 cursor-pointer" onClick={() => handlerChangeCustomerStatus(item.customer_id, 1)}/>) : (
                                                            <IoMdRefresh className="text-3xl text-white cursor-pointer" onClick={() => handlerChangeCustomerStatus(item.customer_id, 2)}/>)}
                                                        <FiDownload className="text-3xl text-white"  onClick={() => handlerDownloadCustomer(item.customer_id)}/>
                                                        <IoCloseSharp className="text-3xl text-white cursor-pointer"  onClick={() => {
                                                            handleDeleteCustomer(item.customer_id)
                                                        }}/>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {expandId === item.customer_id && item.data.map((childData, childIndex) => {
                                            let childStatus = 'REVIEW';
                                            if (childData.message_status === 1) {
                                                childStatus = 'REVIEW'
                                            }else if (childData.message_status === 2) {
                                                childStatus = 'QUED'
                                            }else if (childData.message_status === 3) {
                                                childStatus = 'SENT'
                                            }

                                            return (
                                                <tr key={childData.project_id} className={`bg-white border-t-2 border-t-gray-300`}>
                                                    <td />
                                                    <td className="text-lg font-semibold py-2">{childData.sent_timestamp ? moment(item.sent_timestamp).format(DATE_FORMAT) : '-'}</td>
                                                    <td className="text-lg font-semibold">{childData.lastname}</td>
                                                    <td className="text-lg font-semibold">{childData.firstname}</td>
                                                    <td className="text-lg font-semibold">{childData.claim_number}</td>
                                                    <td className="text-lg font-semibold">
                                                        <div className={`w-[80%] mx-auto text-orange-900 text-center py-1
                                                            ${childStatus === 'REVIEW' ? 'bg-yellow-500' : childStatus === 'QUED' ? 'bg-yellow-300' : 'bg-green-300'}`}>
                                                            {childStatus}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between mr-3 gap-3 items-center">
                                                        
                                                            <p className="text-lg font-semibold text-orange-900">{childData.last_message ? childData.last_message.slice(0, 50) + '...' : ''}</p>
                                                            
                                                            <div className="flex gap-3 items-center">
                                                                <p>{(childStatus === "QUED" && remainTime[dataIndex][childIndex]) && remainTime[dataIndex][childIndex]}</p> 
                                                                {childStatus != "SENT" && 
                                                                    <LuPencil className="text-2xl text-gray-400 cursor-pointer" 
                                                                    onClick={() => {
                                                                        setTurnOnEdit(childData.project_id)
                                                                        setEditMessage(childData.last_message || '')
                                                                    }}
                                                                /> }
                                                                { childStatus === 'REVIEW' && <BsCheckLg className="text-3xl text-gray-400 cursor-pointer" 
                                                                    onClick={() => handlerSetQued(childData.project_id, childData.email, childData.phone)}
                                                                /> }
                                                                { childStatus === 'QUED' && (
                                                                    <div className='flex cursor-pointer'>
                                                                        <BsCheckLg className="text-3xl text-gray-400 cursor-pointer" />
                                                                        <BsCheckLg className="text-3xl text-gray-500 cursor-pointer -ml-4" />
                                                                    </div>
                                                                )}
                                                                { childStatus === 'SENT' && (
                                                                    <div className='flex cursor-pointer'>
                                                                        {
                                                                            (childData.email !== "") && (<>
                                                                                <img src={messageIcon} alt="logo" style={{width:"30px", height: "30px", marginRight: "-30px"}}/>
                                                                                <BsCheckLg className={`text-3xl ${childData.email_sent_success === 1 ? 'text-green-500' : 'text-red-500'} cursor-pointer`} />
                                                                                <BsCheckLg className={`text-3xl ${childData.email_sent_success === 1 ? 'text-green-500' : 'text-red-500'} cursor-pointer -ml-4`} />
                                                                            </>)
                                                                        }
                                                                        
                                                                        {
                                                                            (childData.phone !== "") && (<>
                                                                                <img src={phoneIcon} alt="logo" style={{width:"30px", height: "30px", marginRight: "-30px"}}/>
                                                                                <BsCheckLg className={`text-3xl ${childData.phone_sent_success === 1 ? 'text-green-500' : 'text-red-500'} cursor-pointer -ml-1`} />
                                                                                <BsCheckLg className={`text-3xl ${childData.phone_sent_success === 1 ? 'text-green-500' : 'text-red-500'} cursor-pointer -ml-4 -mr-2`} />
                                                                            </>)
                                                                        }
                                                                    </div>
                                                                )}
                                                                {/* { childStatus === 'SENT' && (
                                                                    <div className='flex cursor-pointer'>
                                                                        <img src={phoneIcon} alt="logo" style={{width:"30px", height: "30px", marginRight: "-30px"}}
                                                                        />
                                                                        <BsCheckLg className="text-3xl text-green-500 cursor-pointer" />
                                                                        <BsCheckLg className="text-3xl text-green-500 cursor-pointer -ml-4" />
                                                                        
                                                                    </div>
                                                                )} */}
                                                                { childStatus === 'QUED' && <FiMinusCircle className='text-2xl cursor-pointer text-red-500' 
                                                                    onClick={() => handlerCancelQued(childData.project_id) }
                                                                />}
                                                                <FiDownload className="text-3xl cursor-pointer " onClick={() => handlerDownloadProject(childData.project_id)}/>

                                                                { childStatus === 'REVIEW' && <AiFillDelete className="text-3xl text-red-500 cursor-pointer"
                                                                    onClick={() => {
                                                                        const res = confirm('Are you really sure to delete the message?')
                                                                        if (res) {
                                                                            handleDeleteMessage(childData.project_id)
                                                                        }
                                                                    }}
                                                                /> }
                                                                { childStatus === 'SENT' && <AiFillLike className="text-2xl cursor-pointer"/> }
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                    { turnOnEdit && <EditMessageModal message={editMessage} onSave={handlerUpdateLastMessage} onCancel={handleCancelMessage} /> }
                </div>
            </div>
        </div>
    )
}
