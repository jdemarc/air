import React from 'react';
import './ChatWindow.css';
import moment from 'moment';

const ChatWindow = ({ messages } ) => {

  return (
    <div className="border-bottom border-left border-right border-secondary text-left w-100" id="chatbox"
      style={{overflowY: 'auto'}}
    >
        {messages.map((message, idx) =>
        <div className="d-flex border-bottom" id='message-row' key={message.user+idx}>
            <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" className="bi bi-person-fill d-flex flex-column m-3 align-self-start border border-warning" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>

              <div className="col">
                <div className="row mt-2">
                  <span className="font-weight-bold pr-2"> {message.username} </span> 

                  <span className="text-secondary">{moment(message.createdAt).format('lll')} </span>
                </div>
                <div className="row pb-2">
                  {message.message}
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default ChatWindow;