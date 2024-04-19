import { useState, useEffect } from 'react'
import { TbPlus, TbMinus } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { BsFillPencilFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { AiFillDelete, AiOutlineMinusCircle, AiFillLike } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import {getNotifications} from '../../services/notifications'
import moment from 'moment';
import { DATE_FORMAT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../store/notificationSlice';
import { loadingOff, loadingOn } from '../../store/authSlice';

export const NotificationsTable = () => {
    const [expandId, setExpandId] = useState(null)
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

    console.log(data)

    return (
        <div>
            <div className="w-[400px] pl-8 pt-8">
                <img src="https://delmar-react-tailwind.vercel.app/static/media/logo.9f804465c04a053b763ff5493042c6f5.svg" alt="logo" 
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
                            {data?.map((item) => {
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
                                        <tr key={item.project_id} className={`${expandId === item.project_id ? "bg-red-700": "bg-gray-400"} border-t-2 border-t-white `}>
                                            <td className="text-center p-2">
                                                {expandId === item.project_id ? <TbMinus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(null)}/> : 
                                                    <TbPlus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(item.project_id)}/> }
                                            </td>
                                            <td className="text-lg font-semibold text-white">{item.sent_timestamp ? moment(item.sent_timestamp).format(DATE_FORMAT) : '-'}</td>
                                            <td className="text-lg font-semibold text-white">{item.lastname}</td>
                                            <td className="text-lg font-semibold text-white">{item.firstname}</td>
                                            <td className="text-lg font-semibold text-white">{item.claim_number}</td>
                                            <td className="text-lg font-semibold text-white text-center">{status}</td>
                                            <td>
                                                <div className='flex items-center justify-between'>
                                                    <div>
                                                        <p className="text-lg font-semibold text-white">{}</p>
                                                    </div>
                                                    <div className="flex justify-end mr-3 gap-3 items-center">
                                                        {expandId === item.project_id && <LuMessagesSquare className="text-3xl text-white" />}
                                                        <IoMdRefresh className={`text-3xl ${expandId === item.project_id? 'text-green-500': 'text-white'}`} />
                                                        {expandId !== item.project_id && <BsFillPencilFill className="text-2xl text-white" /> }
                                                        <FiDownload className="text-3xl text-white" />
                                                        {expandId === item.project_id ? <IoCloseSharp className="text-3xl text-white" />:  
                                                            <AiFillDelete className="text-3xl text-white" /> }
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

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
                                                                <BsCheckLg className="text-3xl text-gray-400" />
                                                                <FiDownload className="text-3xl" />
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
