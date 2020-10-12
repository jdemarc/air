import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import UserPanel from '../../components/UserPanel';
import ChannelPanel from '../../components/ChannelPanel';
import ChatWindow from '../../components/ChatWindow';
import './Dashboard.css';
import io from 'socket.io-client'
import messageService from '../../utils/messageService';

let socket;
const ENDPOINT = 'http://localhost:3000/'

const Dashboard = (props) => {
  const [message, setMessage] = useState(''); // TO DO
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);


  }, [ENDPOINT])

  useEffect(() => {
    socket.on('init', pastMessages => {
      let reversedPastMessages = pastMessages.reverse();
      setMessages(messages => [...messages, ...reversedPastMessages])
      scrollToBottom();
    })
  }, [])

  useEffect(() => {
    socket.on('message', newMessage => {
      setMessages(messages => [...messages, newMessage]);
    });

  }, [])

  // useEffect(() => {
  //   socket.on('push', msg => {
  //     setMessages(messages => [...messages, msg])
  //   })
  // })

  const handleAddMessage = async (newMsg) => {
    const newMessage = await messageService.create(newMsg);

    socket.on('push', newMessage => {
      setMessages(messages => [...messages, newMessage]);
    })

    // socket.emit("message", newMessage);
  }

  // Ensure chat is loaded at the bottom.
  const scrollToBottom = () => {
    const chat = document.getElementById('chatbox');
    chat.scrollTop = chat.scrollHeight;
  }


  return (
    <div>
      <div>
        <Header
          user={props.user}
          handleLogout={props.handleLogout}
        />
      </div>

      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col bg-primary">
              <ChannelPanel />
            </div>
            <div className="col-8 bg-warning">
              <ChatWindow
                user={props.user}
                messages={messages}
                handleAddMessage={handleAddMessage}
              />
            </div>
            <div className="col bg-secondary">
              <UserPanel
                users={props.users}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default Dashboard;