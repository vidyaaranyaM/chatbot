import React, { useState } from "react";

function App() {
  const [chatLog, setChatLog] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (event, agent) => {
    event.preventDefault();
    if (inputValue !== "") {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: agent, message: inputValue },
      ]);
    }
  };

  return (
    <div className="container mx-auto max-w-[700px]">
      <div className="flex flex-col h-screen bg-gray-900">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
          CustomBot
        </h1>

        <div className="flex-grow p-6 overflow-scroll">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.type === "user" ? "bg-purple-500" : "bg-blue-500"
                  } rounded-lg p-4 text-white max-w-sm break-words`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={(event) => onSubmit(event, "bot")}
          className="flex-none"
        >
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="Bot types here"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="text-blue bg-white px-2 rounded-md"
            >
              Send
            </button>
          </div>
        </form>
        <form
          onSubmit={(event) => onSubmit(event, "user")}
          className="flex-none"
        >
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="User types here"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="text-blue bg-white px-2 rounded-md"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
