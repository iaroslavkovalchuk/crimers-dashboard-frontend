import { useState } from 'react'
import { TbPlus, TbMinus } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { BsFillPencilFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { AiFillDelete, AiOutlineMinusCircle, AiFillLike } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";

import {notificationsData} from '../../constants/notificationsData'

export const NotificationsBox = () => {
    const [expandId, setExpandId] = useState(null)
    const [expandChildId, setExpandChildId] = useState(null)

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
                    { notificationsData.map((item, i) => {
                        return (
                            <>
                                <div key={i} className={`p-2 flex justify-between border-t-[1px] border-t-gray-700 ${expandId === i ? "bg-red-700": "bg-gray-400"}`}>
                                    <div>
                                        {expandId === i ? <TbMinus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(null)}/> : 
                                            <TbPlus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(i)}/> }
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-white">
                                            {item.lastName}, {item.firstName}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <IoMdRefresh className='text-3xl text-white' />
                                        <IoCloseSharp className="text-3xl text-white" />
                                    </div>
                                </div>

                                {expandId === i && item.data.map((childData, ind) => {
                                    return (
                                        <>
                                            <div key={ind} className={`p-2 flex justify-between ${childData.status === 'REVIEW' ? 'bg-yellow-500' : childData.status === 'QUED' ? 'bg-yellow-300' : 'bg-green-300'}`}>
                                                <div className='flex items-center gap-2'>
                                                    {expandChildId === ind ? <TbMinus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandChildId(null)}/> : 
                                                        <TbPlus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandChildId(ind)}/> }
                                                    
                                                        <p className="text-lg font-semibold">
                                                            {childData.status}
                                                        </p>
                                                </div>
                                                <div className="flex gap-3 items-center">
                                                    <BsCheckLg className="text-3xl text-gray-400" />
                                                    <FiDownload className="text-3xl" />
                                                    <AiOutlineMinusCircle className="text-3xl text-red-500" /> 
                                                </div>
                                            </div>

                                            {expandChildId === ind && (
                                                <div className='bg-white p-2 flex flex-col gap-1'>
                                                    <p className='font-light text-xl'>{childData.sendOn}</p>
                                                    <p className='font-light text-xl'>{childData.claim}</p>
                                                    <p className='text-xl'>Message:</p>
                                                    <p className='font-light text-xl'>{childData.message}</p>
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
