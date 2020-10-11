import React, { useEffect, useState } from 'react';

const ChatWindow = ( props ) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newMessage = {
      message,
      username: props.user.name,
      user: props.user._id
    }

    props.socket.emit("send-message", newMessage);

    props.handleAddMessage(newMessage);
    setMessage('');
  }

  return (
    <div className="d-flex flex-column bg-light mt-3">
        {props.messages.map((message, idx) =>
        <div key={message.user+idx}>
          {message.username}: {message.message}
        </div>
        )}

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Enter</button>
        </form>
      </div>

    </div>
  )
}

export default ChatWindow;