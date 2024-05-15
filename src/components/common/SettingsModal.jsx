import { useState } from "react";

export const SettingsModal = ({ isOpen, onSave, onSavePrompts, onCancel, settings, onRerun, onUpdateData}) => {
    const [openAIKey, setOpenAIKey] = useState(settings.openAIKey || "");
    const [twilioPhoneNumber, setTwilioPhoneNumber] = useState(settings.twilioPhoneNumber || "");
    const [twilioAccountSID, setTwilioAccountSID] = useState(settings.twilioAccountSID || "");
    const [twilioAuthToken, setTwilioAuthToken] = useState(settings.twilioAuthToken || "");
    const [sendgridEmail, setSendgridEmail] = useState(settings.sendgridEmail || "");
    const [sendgridApiKey, setSendgridApiKey] = useState(settings.sendgridApiKey || "");
    
    const [prompts, setPrompts] = useState(settings.prompts || "");
    const [timer, setTimer] = useState(settings.timer || "");
    const [editingChatbot, setEditingChatbot] = useState(false);
    

    // New functions to handle chatbot textarea
    const handleChatbotSave = () => {
        setEditingChatbot(false);
        onSavePrompts({
            openAIKey,
            twilioPhoneNumber,
            twilioAccountSID,
            twilioAuthToken,
            sendgridEmail,
            sendgridApiKey,
            prompts,
            timer
        });
    };

    const handleChatbotCancel = () => {
        setEditingChatbot(false);
        setPrompts(settings.prompts || ""); // Reset to initial value
    };


    const handleSave = () => {
        console.log(timer);
        onSave({
            openAIKey,
            twilioPhoneNumber,
            twilioAccountSID,
            twilioAuthToken,
            sendgridEmail,
            sendgridApiKey,
            prompts,
            timer
        });
    };

    if (!isOpen) return null;

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                        <div className="relative w-full max-w-lg p-4 overflow-hidden text-left transition-all bg-white rounded-lg shadow-xl sm:my-8">
                            <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-xl font-medium leading-6 text-gray-900 mb-2" id="modal-title">Settings</h3>
                                        <div className="text-sm font-medium text-red-900">(Please make sure all variables are correct! Invalid keys or tokens may cause an error!)</div>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="OpenAI API Key"
                                                value={openAIKey}
                                                onChange={(e) => setOpenAIKey(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="w-full p-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Twilio Phone Number"
                                                value={twilioPhoneNumber}
                                                onChange={(e) => setTwilioPhoneNumber(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="w-full p-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Twilio Account SID"
                                                value={twilioAccountSID}
                                                onChange={(e) => setTwilioAccountSID(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="w-full p-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Twilio Auth Token"
                                                value={twilioAuthToken}
                                                onChange={(e) => setTwilioAuthToken(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="w-full p-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Sendgrid Email"
                                                value={sendgridEmail}
                                                onChange={(e) => setSendgridEmail(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="w-full p-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Sendgrid API Key"
                                                value={sendgridApiKey}
                                                onChange={(e) => setSendgridApiKey(e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                className="w-full p-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Please set timer (default: 5)"
                                                value={timer}
                                                onChange={(e) => setTimer(e.target.value)}
                                                min="0" // This ensures the number is greater than 0
                                                onKeyDown={(e) => {
                                                    const controlKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Delete'];
                                                    if (!controlKeys.includes(e.key) && !/^[0-9]+$/.test(e.key)) {
                                                        e.preventDefault(); // Prevent non-integer input
                                                    }
                                                }}
                                            />
                                            <textarea
                                                className="w-full p-2 mt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Custom Prompt (Up to 2000 characters)"
                                                value={prompts}
                                                onChange={(e) => setPrompts(e.target.value)}
                                                disabled={!editingChatbot} // Disable textarea when not in edit mode
                                            ></textarea>
                                            {/* Conditional rendering for Save/Cancel buttons */}
                                            {editingChatbot && (
                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 mr-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
                                                        onClick={handleChatbotSave}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                                                        onClick={handleChatbotCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                            {/* Button to enable editing of chatbot settings */}
                                            {!editingChatbot && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                                                        onClick={() => setEditingChatbot(true)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                        onClick={onRerun}
                                                    >
                                                        Run
                                                    </button>
                                                </>
                                            )}
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    type="button"
                                                    className="px-6 py-3 text-lg font-bold text-white bg-green-600 rounded-md shadow-lg hover:bg-green-700 focus:outline-none"
                                                    onClick={() => onUpdateData("BuilderTrend")}
                                                >
                                                    Get BuilderTrend
                                                </button>
                                                <button
                                                    type="button"
                                                    className="px-6 py-3 ml-7 text-lg font-bold text-white bg-green-600 rounded-md shadow-lg hover:bg-green-700 focus:outline-none"
                                                    onClick={() => onUpdateData("XactAnalysis")}
                                                >
                                                    Get Xactanalysis
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
