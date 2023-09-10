
import React, { useState } from 'react';
const Chat = () => {
    const [isContractPopupOpen, setContractPopupOpen] = useState(false);

  const handleOpenContractPopup = () => {
    setContractPopupOpen(true);
  };

  const handleCloseContractPopup = () => {
    setContractPopupOpen(false);
  };
  return (
    <>
    <div className="max-w-3xl mx-auto my-4">
      {/* Chat Box */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        {/* Chat Messages */}
        <h2 className="text-2xl font-semibold mb-4">Small Business Chat</h2>
        <div className="mb-4">
          {/* Small Business's Message */}
          <div className="flex justify-start mb-2">
            <div className="bg-green-500 text-white rounded-lg p-2 max-w-xs">
              Hi there! We're a small business looking for volunteers.
            </div>
          </div>

          {/* Volunteer's Message */}
          <div className="flex justify-end mb-2">
            <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
              Hello! I'm interested in volunteering. How can I help?
            </div>
          </div>

          {/* Small Business's Follow-up Message */}
          <div className="flex justify-start mb-2">
            <div className="bg-green-500 text-white rounded-lg p-2 max-w-xs">
              That's great! We need help with events and social media.
            </div>
          </div>

          {/* Volunteer's Response */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
              I can assist with social media. Let's discuss details.
            </div>
          </div>
        </div>
        <div className="flex justify-start mb-2">
            <div className="bg-green-500 text-white rounded-lg p-2 max-w-xs">
              That's great! We need help with events and social media.
            </div>
          </div>

          {/* Volunteer's Response */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
              I can assist with social media. Let's discuss details.
            </div>
          </div>
        </div>
        
        

        {/* Message Input */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow border rounded-full py-2 px-4 mr-2"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2">
            Send
          </button>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleOpenContractPopup}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
          >
            Sign Contract
          </button>
        </div>
        <br></br>
        {isContractPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Start a Contract with This Business
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Contract Title
                </label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Enter contract title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Terms and Conditions
                </label>
                <textarea
                  className="border rounded w-full py-2 px-3 h-32"
                  placeholder="Enter terms and conditions"
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
                >
                  Submit
                </button>
                <button
                  onClick={handleCloseContractPopup}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
   
    </>
  );
};

export default Chat;
