import { useState } from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { BsFillPencilFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { AiFillDelete, AiOutlineMinusCircle, AiFillLike } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";

const data = [
    {
        sendOn: "6/10/2024",
        lastName: "POLTOATSKI",
        firstName: "YURI",
        claim: "USAA:123456",
        status: "INCOMPLETE",
        data: [
            {
                sendOn: "6/10/2024",
                lastName: "ABDULLA",
                firstName: "RABA",
                claim: "USAA:123456",
                status: "REVIEW",
                message: "SERVII WE HAVE YOUR PERMITS"
            },
            {
                sendOn: "6/10/2024",
                lastName: "ABDULLA",
                firstName: "RABA",
                claim: "APPEARANCE",
                status: "QUED",
                message: "SERVII WE HAVE YOUR PERMITS"
            },
            {
                sendOn: "6/10/2024",
                lastName: "ABDULLA",
                firstName: "RABA",
                claim: "USAA:123456",
                status: "SENT",
                message: ""
            }
        ]
    },
    {
        sendOn: "6/10/2024",
        lastName: "POLTOATSKI",
        firstName: "YURI",
        claim: "USAA:123456",
        status: "INCOMPLETE",
        data: [
            {
                sendOn: "6/10/2024",
                lastName: "ABDULLA",
                firstName: "RABA",
                claim: "USAA:123456",
                status: "REVIEW",
                message: "SERVII WE HAVE YOUR PERMITS"
            },
            {
                sendOn: "6/10/2024",
                lastName: "ABDULLA",
                firstName: "RABA",
                claim: "APPEARANCE",
                status: "QUED",
                message: "SERVII WE HAVE YOUR PERMITS"
            },
            {
                sendOn: "6/10/2024",
                lastName: "ABDULLA",
                firstName: "RABA",
                claim: "USAA:123456",
                status: "SENT",
                message: ""
            }
        ]
    },
    {
        sendOn: "6/10/2024",
        lastName: "POLTOATSKI",
        firstName: "YURI",
        claim: "USAA:123456",
        status: "INCOMPLETE",
        data: []
    },
    {
        sendOn: "6/10/2024",
        lastName: "POLTOATSKI",
        firstName: "YURI",
        claim: "USAA:123456",
        status: "INCOMPLETE",
        data: [
            {
                sendOn: "6/10/2024",
                lastName: "ABDULLA",
                firstName: "RABA",
                claim: "USAA:123456",
                status: "REVIEW",
                message: "SERVII WE HAVE YOUR PERMITS"
            },
            {
                sendOn: "6/10/2024",
                lastName: "ABDULLA",
                firstName: "RABA",
                claim: "APPEARANCE",
                status: "QUED",
                message: "SERVII WE HAVE YOUR PERMITS"
            },
            {
                sendOn: "6/10/2024",
                lastName: "ABDULLA",
                firstName: "RABA",
                claim: "USAA:123456",
                status: "SENT",
                message: ""
            }
        ]
    }
]

export const Notifications = () => {
    const [expandId, setExpandId] = useState(null)
    
    return (
        <div className="w-[100%] h-[100vh] bg-cover bg-[url('/bg.png')]"> 
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
                            {data.map((item, i) => {
                                return (
                                    <>
                                        <tr key={i} className={`${expandId === i ? "bg-red-700": "bg-gray-400"} border-t-2 border-t-white `}>
                                            <td className="text-center p-2">
                                                {expandId === i ? <TbMinus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(null)}/> : 
                                                    <TbPlus className="text-3xl text-white font-bold cursor-pointer" onClick={() => setExpandId(i)}/> }
                                            </td>
                                            <td className="text-lg font-semibold text-white">{item.sendOn}</td>
                                            <td className="text-lg font-semibold text-white">{item.lastName}</td>
                                            <td className="text-lg font-semibold text-white">{item.firstName}</td>
                                            <td className="text-lg font-semibold text-white">{item.claim}</td>
                                            <td className="text-lg font-semibold text-white text-center">{item.status}</td>
                                            <td>
                                                <div className="flex justify-end mr-3 gap-3 items-center">
                                                    {expandId === i && <LuMessagesSquare className="text-3xl text-white" />}
                                                    <IoMdRefresh className={`text-3xl ${expandId === i? 'text-green-500': 'text-white'}`} />
                                                    {expandId !== i && <BsFillPencilFill className="text-2xl text-white" /> }
                                                    <FiDownload className="text-3xl text-white" />
                                                    {expandId === i ? <IoCloseSharp className="text-3xl text-white" />:  
                                                        <AiFillDelete className="text-3xl text-white" /> }
                                                </div>
                                            </td>
                                        </tr>

                                        {expandId === i && item.data.map((childData, ind) => {
                                            return (
                                                <tr key={ind} className={`bg-white border-t-2 border-t-gray-300`}>
                                                    <td />
                                                    <td className="text-lg font-semibold py-2">{childData.sendOn}</td>
                                                    <td className="text-lg font-semibold">{childData.lastName}</td>
                                                    <td className="text-lg font-semibold">{childData.firstName}</td>
                                                    <td className="text-lg font-semibold">{childData.claim}</td>
                                                    <td className="text-lg font-semibold">
                                                        <div className={`w-[80%] mx-auto text-orange-900 text-center py-1
                                                            ${childData.status === 'REVIEW' ? 'bg-yellow-500' : childData.status === 'QUED' ? 'bg-yellow-300' : 'bg-green-300'}`}>
                                                            {childData.status}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between mr-3 gap-3 items-center">
                                                            <p className="text-lg font-semibold text-orange-900">{childData.message}</p>
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
