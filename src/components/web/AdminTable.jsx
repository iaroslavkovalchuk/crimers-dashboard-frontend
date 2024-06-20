// src/components/AttractiveTable.js
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getIpTable } from '../../services/iptable';
import 'tailwindcss/tailwind.css';

const AdminTable = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getIpTable()
            .then(response => response.json())
            .then(result => {
                setData(result)
            })
    }, [])

    return (
        <div className="container mx-auto p-6">
            <div className='flex' style={{marginBottom: "10px"}}>
                <img src="Favicon.png" alt="Logo" className="ml-auto" height={"90px"} width={"90px"} style={{marginLeft: "200px"}}/>
                <h1 className="text-4xl font-bold text-center" style={{fontFamily: "auto", fontSize: "55px", letterSpacing: "10px", paddingTop: "20px", marginLeft: "250px"}}>User Status</h1>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg h-screen bg-gray-100">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr className="text-white uppercase text-sm leading-normal text-center" style={{backgroundColor: "cadetblue"}}>
                            <th className="py-3 px-6">Id</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">IP address</th>
                            <th className="py-3 px-6">Device</th>
                            <th className="py-3 px-6">Browser</th>
                            <th className="py-3 px-6">OS</th>
                            <th className="py-3 px-6">Country</th>
                            <th className="py-3 px-6">City</th>
                            <th className="py-3 px-6">Region</th>
                        </tr>
                    </thead>
                    <tbody className="text-black text-md text-center">
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-100 transition duration-150 ease-in-out`}
                            >
                                <td className="py-3 px-6 whitespace-nowrap">{index + 1}</td>
                                <td className="py-3 px-6 whitespace-nowrap">{item.email}</td>
                                <td className="py-3 px-6">{item.ipaddress}</td>
                                <td className="py-3 px-6">{item.device}</td>
                                <td className="py-3 px-6">{item.browser}</td>
                                <td className="py-3 px-6">{item.os}</td>
                                <td className="flex py-3 px-6 items-center text-center">
                                    <img
                                        alt={item.country}
                                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.countryCode}.svg`}
                                        height={"20px"}
                                        width={"20px"}
                                        className="mr-2"
                                    />
                                    {item.country}
                                </td>
                                <td className="py-3 px-6">{item.city}</td>
                                <td className="py-3 px-6">{item.region}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTable;