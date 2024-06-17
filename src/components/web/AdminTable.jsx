// src/components/AttractiveTable.js
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getIpTable } from '../../services/iptable';
import { useSelector } from 'react-redux';
import 'tailwindcss/tailwind.css';

const AdminTable = () => {

    const [data, setData] = useState([]);

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        getIpTable({"email": auth.user.email})
            .then(response => response.json())
            .then(result => {
                setData(result)
            })
    }, [])

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center" style={{fontFamily: "auto", fontSize: "50px", letterSpacing: "10px"}}>User Status</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg h-screen bg-gray-100">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr className="text-white uppercase text-sm leading-normal" style={{backgroundColor: "cadetblue"}}>
                            <th className="py-3 px-6 text-left">Id</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">IP address</th>
                            <th className="py-3 px-6 text-left">Device</th>
                            <th className="py-3 px-6 text-left">Browser</th>
                            <th className="py-3 px-6 text-left">OS</th>
                            <th className="py-3 px-6 text-left">Country</th>
                            <th className="py-3 px-6 text-left">City</th>
                            <th className="py-3 px-6 text-left">Region</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-100 transition duration-150 ease-in-out`}
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{item.email}</td>
                                <td className="py-3 px-6 text-left">{item.ipaddress}</td>
                                <td className="py-3 px-6 text-left">{item.device}</td>
                                <td className="py-3 px-6 text-left">{item.browser}</td>
                                <td className="py-3 px-6 text-left">{item.os}</td>
                                <td className="flex py-3 px-6 text-left items-center">
                                    <img
                                        alt={item.country}
                                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.countryCode}.svg`}
                                        height={"20px"}
                                        width={"20px"}
                                        className="mr-2"
                                    />
                                    {item.country}
                                </td>
                                <td className="py-3 px-6 text-left">{item.city}</td>
                                <td className="py-3 px-6 text-left">{item.region}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTable;