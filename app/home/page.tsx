'use client';

import React from 'react';
import Navbar from '../components/NavBar';
import ChatBox from '../components/chat';

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left side: ChatBox */}
        <div className="w-1/3 border-r border-gray-300 flex flex-col">
          <ChatBox />
        </div>

        {/* Right side: Dart Playground */}
        <div className="w-2/3 bg-gray-50">
          <iframe
            src="https://dartpad.dev/embed-inline.html?id=your_gist_id&hideConsole=true&run=true&theme=dark"
            width="100%"
            height="100%"
            frameBorder={0}
          >
          </iframe>

        </div>
      </div>
    </div>
  );
};

export default HomePage;