import React, { useState } from 'react';

const Input = (props) => {
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
  );
}

export default Input