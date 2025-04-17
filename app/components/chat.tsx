'use client';

import { useState } from 'react';

// Define the message type
interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

export default function ChatBox() {
  const [input, setInput] = useState<string>('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setChatLog([...chatLog, { sender: 'user', message: input }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setChatLog((prev) => [...prev, { sender: 'bot', message: data.reply }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-gray-800 border-b">
        <h2 className="text-lg font-semibold text-white">Chat Assistant</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {chatLog.length === 0 ? (
          <div className="text-center text-white mt-8">
            <p>Start a conversation with the assistant.</p>
            <p className="text-sm mt-2">Ask questions about Dart programming!</p>
          </div>
        ) : (
          chatLog.map((entry, i) => (
            <div 
              key={i} 
              className={`mb-4 p-3 rounded-lg max-w-3/4 ${
                entry.sender === 'user' 
                  ? 'ml-auto bg-blue-800 text-white' 
                  : 'mr-auto bg-gray-800 text-white'
              }`}
            >
              <div className="whitespace-pre-wrap">{entry.message}</div>
            </div>
          ))
        )}
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-gray-500 bg-black">
        <div className="flex">
          <input
            className="flex-1 px-4 py-2 border rounded-2xl mr-5 border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Dart programming..."
          />
          <button
            className="px-4 py-2 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}