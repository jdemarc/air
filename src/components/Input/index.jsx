import React from 'react';
import './Input.css';

const Input = ({message, setMessage, handleSubmit}) => {

  return (
    <div className="d-flex w-100">
      <form className="d-flex w-100 mt-3 mb-3"
      onSubmit={handleSubmit}>
        <input className="d-flex w-100"
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
  );
}

export default Input;