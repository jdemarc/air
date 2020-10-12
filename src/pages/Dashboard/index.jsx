import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import UserPanel from '../../components/UserPanel';
import ChannelPanel from '../../components/ChannelPanel';
import ChatWindow from '../../components/ChatWindow';
import './Dashboard.css';
import io from 'socket.io-client'
import messageService from '../../utils/messageService';
import Input from '../../components/Input';

let socket;
const ENDPOINT = 'http://localhost:3000/'

const Dashboard = (props) => {
  const [message, setMessage] = useState(''); // TO DO
  const [messages, setMessages] = useState([]);

  // Set up socket
  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT])

  // Get initial messages. Reverse them, and scroll to the bottom of the box.
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

  useEffect(() => {
    socket.on('push', msg => {
      setMessages(messages => [...messages, msg])
      scrollToBottom();
    })
  }, [])

  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newMessage = {
      message,
      username: props.user.name,
      user: props.user._id
    }
    
    handleAddMessage(newMessage);
    setMessage('');
  }
  
  const handleAddMessage = async (newMsg) => {
    const newMessage = await messageService.create(newMsg);

    // Emit new message to all users.
    socket.emit("message", newMessage);
    setMessages(messages => [...messages, newMessage])
    scrollToBottom();
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
                // user={props.user}
                messages={messages}
              />
              <Input
                message={message}
                handleSubmit={handleSubmit}
                setMessage={setMessage}
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