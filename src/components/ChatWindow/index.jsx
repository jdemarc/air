import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = ( props ) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newMessage = {
      message,
      username: props.user.name,
      user: props.user._id
    }
    
    props.handleAddMessage(newMessage);
    setMessage('');
  }

  return (
    <div>

    <div className="d-flex flex-column bg-light mt-3 p-2" id="chatbox"
      style={{overflowY: 'auto', height: 400}}
    >
        {props.messages.map((message, idx) =>
        <div className="message-row" key={message.user+idx}>
          {message.username}: {message.message}
        </div>
        )}
    </div>

      <div>
        <form className="text-center d-flex mt-2"
        onSubmit={handleSubmit}>
          <input className="form-control"
            type="text"
            placeholder="Type your message"
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? handleSubmit(e) : null}
          />
          <button className="btn btn-info"> Send </button>
        </form>
      </div>

    </div>
  )
}

export default ChatWindow;