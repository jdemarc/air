import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages } ) => {

  return (
    <div className="d-flex flex-column bg-light mt-3 p-2" id="chatbox"
      style={{overflowY: 'auto', height: 400}}
    >
        {messages.map((message, idx) =>
        <div className="message-row" key={message.user+idx}>
          {message.username}: {message.message}
        </div>
        )}
    </div>
  )
}

export default ChatWindow;