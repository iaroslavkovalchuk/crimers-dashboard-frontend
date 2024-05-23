import { useState, useEffect } from 'react'
import { TbPlus, TbMinus } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { FiDownload, FiMinusCircle } from "react-icons/fi";
import { AiFillDelete, AiFillLike } from "react-icons/ai";
import { LuMessagesSquare, LuPencil } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { combineSlices } from '@reduxjs/toolkit';
import {getNotifications, setQued, cancelQued, setSent, updateLastMessage, downloadProjectMessage, downloadCustomerMessage, changeCustomerStatus, deleteCustomer, setVariables, getTimer, rerunChatGPT, getNewProjects, sendOptInEmail, getVariables, checkMainTableUpdate} from '../../services/notifications'

import moment from 'moment';
import { DATE_FORMAT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setSendTimer, updateMessageStatus } from '../../store/notificationSlice';
import { loadingOff, loadingOn } from '../../store/authSlice';
import logo from "../../assets/logo.svg";
import messageIcon from "../../assets/message.svg";
import phoneIcon from "../../assets/phone.svg";
import PhoneOptInIcon from "../../assets/phone-icon.jsx";
import EmailOptInIcon from "../../assets/email-icon.jsx";
import { useNavigate } from 'react-router-dom';
import { EditMessageModal } from '../common/EditMessageModal';
import { SettingsModal } from '../common/SettingsModal'; // Import the SettingsModal component
import toast from "react-hot-toast"


export const NotificationsTable = () => {
    const [expandId, setExpandId] = useState(null)
    const data = useSelector(state => state.notification.data)
    const sendTimer = useSelector(state => state.notification.sendTimer)
    const [editMessage, setEditMessage] = useState('')
    const [turnOnEdit, setTurnOnEdit] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const dispatch = useDispatch()
    // State to manage the visibility and data of the settings modal
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [settingsData, setSettingsData] = useState({
        openAIKey: '',
        twilioPhoneNumber: '',
        twilioAccountSID: '',
        twilioAuthToken: '',
        sendgridEmail: '',
        sendgridApiKey: '',
        prompts: '',
        timer: 0,
    });


    const [remainTime, setRemainTime] = useState([]);
    const navigate = useNavigate()


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                      Handle Get Main Table Data

    useEffect(() => {
        fetchData();
        getVariables()
            .then(response => response.json())
            .then(result => {
                // console.log("result: ", result);
                console.log("settingsData: ", settingsData);
                setSettingsData(result);
            })
        
        // console.log(variables);
    }, [refetch, setSettingsData])

// -----------------------------------------------------------------------------------------
    

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                          Handle Countdown Clock

    useEffect(() => {
        const interval = setInterval(async () => {
            console.log("send_Timer: ", sendTimer);
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

                    qued_time.setUTCMinutes(qued_time.getUTCMinutes() + sendTimer); // Use UTC methods

                    // console.log("now", now)
                    console.log("now", `${today.getUTCHours()}:${today.getUTCMinutes()}:${today.getUTCSeconds()}`)
                    const difference = qued_time.getTime() - today.getTime();

                    console.log("difference: ", qued_time.getTime() < today.getTime());
                    
                    if(childData.message_status == 2 && qued_time.getTime() + 5< today.getTime()) {
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
      
    }, [data, remainTime, updateMessageStatus, sendTimer, dispatch])

// -----------------------------------------------------------------------------------------


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                          Get All Table Data and Timer Value

    const fetchData = async () => {
        dispatch(loadingOn())
        const res = await getNotifications();
        const timer = await getTimer();
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

        dispatch(setSendTimer(timer))
    }

// ----------------------------------------------------------------------------------------


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                      Real Time Check for Update of Main Table Data

    useEffect(() => {
        const interval = setInterval(() => {
            checkMainTableUpdate()
                .then(response => response.json())
                .then(result => {
                    if(result == true){
                        confirm("Table data updated! Shall you refresh the page?")
                        setRefetch(!refetch);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, 15000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []); // Empty array ensures the effect runs only once after the initial render

// ----------------------------------------------------------------------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                      Cancel Message Editing

    const handleCancelMessage = async () => {
        setEditMessage('');
        setTurnOnEdit(null)
    }

// ----------------------------------------------------------------------------------------


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
            toast.error("Can't find customer's email address.");
        }
        if(phone === ""){
            count += 1;
            toast.error("Can't find customer's phone number.");
        }

        if(count == 2){
            toast.error("Excuse me, you can't send message to this customer. There is no phone number or email address.");
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

    // Function to open the settings modal
    const openSettingsModal = () => {
        setIsSettingsModalOpen(true);
    };

    // Function to close the settings modal
    const closeSettingsModal = () => {
        setIsSettingsModalOpen(false);
    };

    // Function to save settings data
    const saveSettings = async (newSettings) => {
        // Perform validation or API requests here to save the settings
        console.log('Settings saved:', newSettings);
        // Update the state with the new settings
        setSettingsData(newSettings);

        const res = await setVariables(newSettings);
        console.log("settings: ", res);
        // Close the modal
        closeSettingsModal();
        setRefetch(!refetch);
    };

    const savePrompts = async (newSettings) => {
        // Perform validation or API requests here to save the settings
        console.log('Settings saved:', newSettings);
        // Update the state with the new settings
        setSettingsData(newSettings);
        dispatch(loadingOn());
        const res = await setVariables(newSettings);
        dispatch(loadingOff());
        if (typeof res === 'string') {
            toast.error(res);
            return;
        }
        if (res) {
            toast.success("Prompts updated successfully!");
            return
        }
    };

    const handleRerun = async () => {
        console.log(settingsData.prompts);
        // dispatch(loadingOn());
        toast.success("Updating messages started successfully!");
        const res = await rerunChatGPT();
        // dispatch(loadingOff());
        console.log(res);
        if (typeof res === 'string') {
            toast.error(res);
            return;
        }
        if (res) {
            return
        }
    }

    const handleUpdateData = async (source) => {
        toast.success("Updating projects started successfully!");
        const res = await getNewProjects(source);
        console.log(res);
        if (typeof res === 'string') {
            toast.error(res);
            return;
        }
        if (res) {
            return
        }
    }

    const handleSendOptInEmail = async(customer_id) => {
        dispatch(loadingOn());
        const res = await sendOptInEmail(customer_id, 1);
        dispatch(loadingOff());
        setRefetch(!refetch);
    }
    const handleUpdateOptInStatus = async(customer_id, opt_in_status) => {
        dispatch(loadingOn());
        const res = await sendOptInEmail(customer_id, opt_in_status);
        dispatch(loadingOff());
        setRefetch(!refetch);
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
                <div className="py-2 px-6 bg-green-700 inline-block mb-[1px] cursor-pointer" style={{"float": "right"}} onClick={openSettingsModal}>
                    <p className="text-xl font-semibold text-white">SETTINGS</p>
                </div>
                <div>
                    <table className="w-[100%]">
                        <thead className=" bg-red-700">
                            <tr>
                                <th className="w-[5%]"/>
                                <th className="w-[9%] text-center p-2 text-lg text-white">Send On</th>
                                <th className="w-[9%] text-white text-lg text-center">Last Name</th>
                                <th className="w-[9%] text-white text-lg text-center">First Name</th>
                                <th className="w-[18%] text-white text-lg text-center">Claim</th>
                                <th className="w-[12%] text-white text-lg text-center">Status</th>
                                <th className="w-[38%] text-white text-lg text-center">Message</th>
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
                                            <td className="text-lg font-semibold text-white text-center">{!(expandId === item.customer_id)  && item.last_name}</td>
                                            <td className="text-lg font-semibold text-white text-center">{!(expandId === item.customer_id)  && item.first_name}</td>
                                            <td className="text-lg font-semibold text-white text-center">
                                                {
                                                    !(expandId === item.customer_id)  && (
                                                        <>
                                                            {item.project_name}
                                                            <br />
                                                            {item.claim_number}
                                                        </>
                                                    )
                                                }
                                            </td>
                                            <td className="text-lg font-semibold text-white text-center">
                                                {
                                                    item.opt_in_status == 0 &&
                                                    (
                                                        <div
                                                            className="w-[80%] mx-auto text-center py-1 text-white"
                                                            style={{ borderRadius: '0.5rem', cursor: 'pointer', display: "flex", justifyContent: "center"}}
                                                            onClick={() => handleSendOptInEmail(item.customer_id)}
                                                            >
                                                            <div className='mx-auto' style={{width:"50px", height: "50px"}}>
                                                                <PhoneOptInIcon fill="white" />
                                                            </div>
                                                            <div className='mx-auto' style={{width:"50px", height: "50px"}}> 
                                                                <EmailOptInIcon fill="white"/ >
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    item.opt_in_status == 1 &&
                                                    (
                                                        <div
                                                            className="w-[80%] mx-auto text-center py-1 text-white"
                                                            style={{ borderRadius: '0.5rem', cursor: 'pointer', display: "flex", justifyContent: "center"}}
                                                            onClick={() => handleSendOptInEmail(item.customer_id)}
                                                            >
                                                            <div className='mx-auto' style={{width:"50px", height: "50px"}}>
                                                                <PhoneOptInIcon fill="red" />
                                                            </div>
                                                            <div className='mx-auto' style={{width:"50px", height: "50px"}}> 
                                                                <EmailOptInIcon fill="blue"/ >
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    item.opt_in_status == 2 &&
                                                    (!(expandId === item.customer_id)  && 
                                                        <div onDoubleClick={() => handleUpdateOptInStatus(item.customer_id,(item.opt_in_status + 1) % 4)}>
                                                            {status}
                                                        </div>
                                                    )
                                                    
                                                    
                                                }
                                                {
                                                    item.opt_in_status == 3 &&
                                                    (
                                                        <div
                                                            className={`w-[80%] mx-auto text-center py-1 bg-red-500 text-white`}
                                                            style={{borderRadius: "0.5rem"}}
                                                            onDoubleClick={() => handleUpdateOptInStatus(item.customer_id,(item.opt_in_status + 1) % 4)}
                                                        >
                                                            Refused
                                                        </div>
                                                    )
                                                }
                                            </td>


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
                                                <tr key={childData.project_id} className={`bg-white border-t-2 border-t-gray-300 text-center`}>
                                                    <td />
                                                    <td className="text-lg font-semibold py-2">{childData.sent_timestamp ? moment(item.sent_timestamp).format(DATE_FORMAT) : '-'}</td>
                                                    <td className="text-lg font-semibold">{childData.last_name}</td>
                                                    <td className="text-lg font-semibold">{childData.first_name}</td>
                                                    <td className="text-lg font-semibold">
                                                        {
                                                            <>
                                                                {childData.project_name}
                                                                <br />
                                                                {childData.claim_number}
                                                            </>
                                                        }
                                                    </td>
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
                    
                    {/* Settings Modal */}
                    <SettingsModal
                        isOpen={isSettingsModalOpen}
                        onSave={saveSettings}
                        onSavePrompts={savePrompts}
                        onCancel={closeSettingsModal}
                        settings={settingsData}
                        onRerun={handleRerun}
                        onUpdateData={handleUpdateData}
                    />
                </div>
            </div>
        </div>
    )
}
