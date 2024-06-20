// src/components/AttractiveTable.js
import React, { useEffect, useState } from 'react';
import { getIpTable } from '../../services/iptable';
import 'tailwindcss/tailwind.css';
import Modal from './AdminModal';

const AdminBox = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        getIpTable()
            .then(response => response.json())
            .then(result => {
                setData(result);
            });
    }, []);

    const openModal = (item) => {
        setModalData(item);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="container mx-auto p-2 sm:p-6">
            <div className='flex' style={{marginBottom: "10px"}}>
                <img src="Favicon.png" className='ml-1 mt-3' alt="Logo" height={"70px"} width={"70px"} />
                <h1 className="text-3xl sm:text-4xl font-bold ml-3 text-center" style={{fontFamily: "auto", fontSize: "35px", letterSpacing: "5px", paddingTop: "30px"}}>User Status</h1>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((item, index) => (
                    <div key={index} className="relative bg-white shadow-lg rounded-lg p-4">
                        <div className="flex items-center mb-4">
                            <img
                                alt={item.country}
                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.countryCode}.svg`}
                                height="40px"
                                width="40px"
                                className="mr-4 rounded-full"
                            />
                            <div>
                                <h2 className="text-md font-semibold">{item.email}</h2>
                                <p className="text-sm text-gray-600">{item.city}, {item.country}</p>
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                            <p className="text-sm text-gray-600">IP: {item.ipaddress}</p>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => openModal(item)}
                                className="text-blue-500 underline"
                            >
                                Show more detail
                            </button>
                        </div>
                        <span className="absolute bottom-2 right-2 text-gray-500 text-xs">{index + 1}</span>
                    </div>
                ))}
            </div>

            <Modal isOpen={modalIsOpen} onClose={closeModal} data={modalData} />
        </div>
    );
};

export default AdminBox;