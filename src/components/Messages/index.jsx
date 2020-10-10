import React from 'react';

const Messages = (props) => {

  return (
    <div className="d-flex flex-column bg-light">
        {props.messages.map((message, idx) =>
        <div key={message.user+idx}>
          {message.username}: {message.message}
        </div>
        )}
    </div>
  )
}

export default Messages