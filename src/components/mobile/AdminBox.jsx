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
                setData(result);
            });
    }, []);

    return (
        <div className="container mx-auto p-2 sm:p-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center" style={{fontFamily: "auto", fontSize: "30px", letterSpacing: "5px"}}>User Status</h1>
            <div className="shadow-lg rounded-lg bg-gray-100">
                <table className="min-w-full bg-white rounded-lg">
                    <thead className="hidden sm:table-header-group">
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
                                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-100 transition duration-150 ease-in-out flex sm:table-row flex-wrap sm:flex-no-wrap`}
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap w-full sm:w-auto flex-1 sm:flex-none">{index + 1}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap w-full sm:w-auto flex-1 sm:flex-none">{item.email}</td>
                                <td className="py-3 px-6 text-left w-full sm:w-auto flex-1 sm:flex-none">{item.ipaddress}</td>
                                <td className="py-3 px-6 text-left w-full sm:w-auto flex-1 sm:flex-none">{item.device}</td>
                                <td className="py-3 px-6 text-left w-full sm:w-auto flex-1 sm:flex-none">{item.browser}</td>
                                <td className="py-3 px-6 text-left w-full sm:w-auto flex-1 sm:flex-none">{item.os}</td>
                                <td className="flex py-3 px-6 text-left items-center w-full sm:w-auto flex-1 sm:flex-none">
                                    <img
                                        alt={item.country}
                                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.countryCode}.svg`}
                                        height={"20px"}
                                        width={"20px"}
                                        className="mr-2"
                                    />
                                    {item.country}
                                </td>
                                <td className="py-3 px-6 text-left w-full sm:w-auto flex-1 sm:flex-none">{item.city}</td>
                                <td className="py-3 px-6 text-left w-full sm:w-auto flex-1 sm:flex-none">{item.region}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTable;