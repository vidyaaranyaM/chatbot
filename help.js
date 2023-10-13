import React, { useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", isUser: false },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserMessage = () => {
    if (userInput.trim() === "") return;

    // Add user message to the chat
    setMessages([...messages, { text: userInput, isUser: true }]);
    setUserInput("");

    // Simulate a response from the chatbot (you can replace this with an actual API call)
    setTimeout(() => {
      setMessages([
        ...messages,
        { text: "Sure! Here is your response.", isUser: false },
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4">
          <div className="overflow-y-auto h-40">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.isUser ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleUserMessage();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

// 1st iteration
<div className="mt-32 mx-64 bg-blue-200 rounded-lg shadow-lg pb-6">
  {/* Header */}
  <h1 className="text-center font-bold text-6xl py-6 bg-yellow-200">SAM</h1>

  <div className="container flex flex-col overflow-auto h-80 bg-white rounded-md p-5">
    <div className="flex flex-col space-y-4 items-start">
      <span className="bg-green-200 rounded-lg text-sm p-4">Hello User</span>
    </div>
    <div className="flex flex-col space-y-4 items-end">
      <span className=" bg-purple-200 rounded-lg text-sm p-4">Hello Bot</span>
    </div>
  </div>

  {/* User Input */}
  <form className="px-32 mx-32 mt-4">
    <input
      type="text"
      placeholder="Type Here"
      className="bg-yellow-200 rounded-full text-center focus:border-blue-500 focus:outline-None w-full p-2"
    />
  </form>
</div>;
