import React from 'react';
import './Input.css';

const Input = ({message, setMessage, handleSubmit}) => {

  return (
    <div className="form-group">
      <form className="form-inline text-center"
      onSubmit={handleSubmit}>
      <div className="form-group mt-2">
        <input className="form-control"
          type="text"
          placeholder="Type your message"
          value={message}
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? handleSubmit(e) : null}
          />
        <button className="btn btn-info"> Send </button>
      </div>
      </form>
    </div>
  );
}

export default Input;