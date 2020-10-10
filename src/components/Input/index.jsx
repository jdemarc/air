import React from 'react';

const Input = (props) => {
  return (
    <div>
      <form onSubmit={props.handleMessageSubmit}>
        <input
          type="text"
          placeholder="blah blah blah"
          value={props.messages}
          name="messages"
          onChange={props.handleChange}
        />
      <button>Enter</button>
      </form>
    </div>
  );
}

export default Input