import React from 'react';

const Input = ({message, setMessage, handleSubmit}) => {

  return (
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
  );
}

export default Input;