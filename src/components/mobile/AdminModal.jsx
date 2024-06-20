// src/components/Modal.js
import React from 'react';
import 'tailwindcss/tailwind.css';

const Modal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs sm:max-w-xl mx-auto z-50">
                <h2 className="text-2xl font-bold mb-4">User Detail</h2>
                <div className="flex flex-col space-y-2">
                    <div><strong>Email:</strong> {data.email}</div>
                    <div><strong>IP Address:</strong> {data.ipaddress}</div>
                    <div><strong>Device:</strong> {data.device}</div>
                    <div><strong>Browser:</strong> {data.browser}</div>
                    <div><strong>OS:</strong> {data.os}</div>
                    <div><strong>Country:</strong> {data.country}</div>
                    <div><strong>City:</strong> {data.city}</div>
                    <div><strong>Region:</strong> {data.region}</div>
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;