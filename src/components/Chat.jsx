// components/Chat.js
import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaPaperclip, FaImage, FaFile } from "react-icons/fa";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm having issues with my printer.",
      sender: "user",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      text: "I'm here to help. Can you describe the problem?",
      sender: "support",
      timestamp: "10:01 AM",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: "support",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessage("");
      // Simulate user typing response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Thank you for the response. Could you please provide more details?",
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 2000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      const fileName = file.name;
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: `File uploaded: ${fileName}`,
          sender: "support",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isFile: true,
          fileName: fileName,
        },
      ]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow flex flex-col h-[80vh]">
        {/* Chat Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Ticket #123 - Printer Issue</h2>
              <p className="text-gray-500">Started 2 hours ago</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaImage className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaFile className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "support" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === "support"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.isFile ? (
                  <div className="flex items-center space-x-2">
                    <FaFile />
                    <span>{msg.fileName}</span>
                  </div>
                ) : (
                  <p>{msg.text}</p>
                )}
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === "support" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex gap-2">
              <button className="px-8 py-2 bg-blue-200 rounded-md text-white font-bold">
                AI
              </button>
              <button className="px-8 py-2 bg-blue-200 rounded-md text-white font-bold">
                Human
              </button>
            </div>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <FaPaperclip className="text-gray-500" />
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
            >
              <span>Send</span>
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
