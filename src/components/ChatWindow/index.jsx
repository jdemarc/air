import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages } ) => {

  return (
    <div className="wrapper">
    <div className="d-flex flex-column bg-light mt-3" id="chatbox"
      style={{overflowY: 'auto'}}
    >
        {messages.map((message, idx) =>
        <div className="message-row" key={message.user+idx}>
          <div className="font-weight-bold"> {message.username} </div> {message.message}
        </div>
        )}
    </div>
    </div>
  )
}

export default ChatWindow;