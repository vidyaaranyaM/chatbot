import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [chatLog, setChatLog] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);
  const focusForm = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8000/chat/responses/").then((res) => {
      setChatLog(
        res.data.sort((a, b) => {
          return a.id - b.id;
        })
      );
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      focusForm.current.focus();
    });
  }, []);

  const onSubmit = () => {
    const human_response = {
      id: chatLog.length,
      agent: "human",
      response: inputValue,
    };
    if (inputValue !== "") {
      axios
        .post("http://localhost:8000/chat/human/responses/", human_response)
        .then((res) => console.log(res));

      axios
        .post("http://localhost:8000/chat/bot/responses/", human_response)
        .then((res) => console.log(res));
    }
  };

  return (
    <div className="container mx-auto max-w-[700px]">
      <div className="flex flex-col h-screen bg-gray-900">
        <div className="shadow-2xl border-b border-green-200">
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
            CustomBot
          </h1>
        </div>

        <div className="flex-grow p-6 overflow-scroll" ref={chatContainerRef}>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-start">
              <div className="bg-blue-500 rounded-lg p-4 text-white max-w-sm break-words">
                Hello! How may I help you today?
              </div>
            </div>
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.agent === "human" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.agent === "human" ? "bg-purple-500" : "bg-blue-500"
                  } rounded-lg p-4 text-white max-w-sm break-words`}
                >
                  {message.response}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={(event) => onSubmit(event)}
          className="flex-none mb-4 mx-4"
        >
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="Type here ..."
              value={inputValue}
              ref={focusForm}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="text-blue bg-black text-white px-2 rounded-md"
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
