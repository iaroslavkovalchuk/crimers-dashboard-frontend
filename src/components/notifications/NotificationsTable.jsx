import { useState, useEffect } from 'react'
import { TbPlus, TbMinus } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { BsFillPencilFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { AiFillDelete, AiOutlineMinusCircle, AiFillLike } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import {getNotifications, setQued, cancelQued, setSent, updateLastMessage, downloadProjectMessage, downloadCustomerMessage, changeCustomerStatus, deleteCustomer} from '../../services/notifications'
import moment from 'moment';
import { DATE_FORMAT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../store/notificationSlice';
import { loadingOff, loadingOn } from '../../store/authSlice';
import logo from "../../assets/logo.svg"

export const NotificationsTable = () => {
    const [expandId, setExpandId] = useState(null)
    const data = useSelector(state => state.notification.data)
    const dispatch = useDispatch()

    const [remainTime, setRemainTime] = useState([]);

    // let remainTime = [];

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        
        const interval = setInterval(() => {
            const now = Date.now();
            setRemainTime(data?.map((item) => {
                return item.data?.map((childData) => {
                    const qued_time = new Date(childData.qued_timestamp)
                    qued_time.setMinutes(qued_time.getMinutes() + 5);
                    // console.log(now - qued_time.getTime());
                    const difference = qued_time.getTime() - now;
                    const durationDate = new Date(difference);

                    // Format the duration as a UTC time string (ignoring the date part)
                    const timeString = durationDate.toISOString().substr(11, 8); // "HH:mm:ss" format

                    // Extract minutes and seconds
                    const minutes = timeString.substr(3, 2);
                    const seconds = timeString.substr(6, 2);

                    // Return the time difference as a string in the format "M:S"
                    return `${parseInt(minutes, 10)}:${seconds}`;
                })
            }));
        }, 1000); // This will run every second
        
        // Clean up function
        return () => {
            clearInterval(interval);
        };
      
    }, [data, remainTime])

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
    const handlerDownloadProject = async (project_id) => {
        await downloadProjectMessage(project_id)
    }
    const handlerDownloadCustomer = async (customer_id) => {
        await downloadCustomerMessage(customer_id)
    }
    const handlerSetQued = async (project_id) => {
        await setQued(project_id)
    }
    const handlerCancelQued = async (project_id) => {
        await cancelQued(project_id)
    }
    const handlerSetSent = async (project_id) => {
        await setSent(project_id)
    }
    const handlerUpdateLastMessage = async (project_id, message) => {
        await updateLastMessage(project_id, message)
    }
    const handlerChangeCustomerStatus = async (project_id, method) => {
        alert(method);
        await changeCustomerStatus(customer_id, method)
    }
    const handleDeleteCustomer = async (project_id) => {
        await deleteCustomer(customer_id)
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
                                <th className="w-[10%] text-left p-2 text-lg text-white">Send On</th>
                                <th className="w-[10%] text-white text-lg text-left">Last Name</th>
                                <th className="w-[10%] text-white text-lg text-left">First Name</th>
                                <th className="w-[12%] text-white text-lg text-left">Claim</th>
                                <th className="w-[12%] text-white text-lg text-left">Status</th>
                                <th className="w-[41%] text-white text-lg text-left">Message</th>
                            </tr>
                        </thead>
                        
                        <tbody className="bg-white">
                            {data?.map((item, dataIndex) => {
                                let status = '';
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
                                            <td className="text-lg font-semibold text-white">{!(expandId === item.customer_id) && (item.sent_timestamp ? moment(item.sent_timestamp).format(DATE_FORMAT) : '-')}</td>
                                            <td className="text-lg font-semibold text-white">{!(expandId === item.customer_id)  && item.lastname}</td>
                                            <td className="text-lg font-semibold text-white">{!(expandId === item.customer_id)  && item.firstname}</td>
                                            <td className="text-lg font-semibold text-white">{!(expandId === item.customer_id)  && item.claim_number}</td>
                                            <td className="text-lg font-semibold text-white text-center">{!(expandId === item.customer_id)  && status}</td>
                                            <td>
                                                <div className='flex items-center justify-between'>
                                                    <div>
                                                        <p className="text-lg font-semibold text-white">{}</p>
                                                    </div>
                                                    <div className="flex justify-end mr-3 gap-3 items-center">
                                                        <LuMessagesSquare className="text-3xl text-white" />
                                                        {/* <IoMdRefresh className={`text-3xl ${expandId === item.project_id? 'text-green-500': 'text-white'}`} /> */}
                                                        {item.sending_method == 1 ? (<IoMdRefresh className="text-3xl text-white" onClick={() => handlerChangeCustomerStatus(item.customer_id, 1)}/>) : (<IoMdRefresh className="text-3xl text-white" onClick={() => handlerChangeCustomerStatus(item.customer_id, 2)}/>)}
                                                        <FiDownload className="text-3xl text-white"  onClick={() => handlerDownloadCustomer(item.customer_id)}/>
                                                        <IoCloseSharp className="text-3xl text-white" />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {expandId === item.customer_id && item.data.map((childData, childIndex) => {
                                            let childStatus = '';
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
                                                                {/* {childIndex} */}
                                                                <p>{(childStatus === "QUED") && remainTime[dataIndex][childIndex]}</p> 
                                                                <BsCheckLg className="text-3xl text-gray-400" />
                                                                <FiDownload className="text-3xl" onClick={() => handlerDownloadProject(childData.project_id)}/>
                                                                <AiOutlineMinusCircle className="text-3xl text-red-500" /> 
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
                </div>
            </div>
        </div>
    )
}
