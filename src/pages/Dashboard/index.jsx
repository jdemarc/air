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

const Dashboard = ( {user, handleLogout} ) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  // Set up socket
  useEffect(() => {
    socket = io(ENDPOINT);
  }, [])

  useEffect(() => {
    // When connecting, assign username and socket id to active user.
      socket.on("connect", () => {
        socket.emit("sign-on", user.name);
      });
  
      socket.on("users", users => {
        setUsers(users);
      });
  
      socket.on("connected", user => {
        setUsers(users => [...users, user]);
      });
  
      socket.on("disconnected", id => {
        setUsers(users => {
          return users.filter(user => user.id !== id);
        });
      });

  }, [])

  // Get initial messages. Reverse them, and scroll to the bottom of the box.
  useEffect(() => {
    socket.on('init', pastMessages => {
      let reversedPastMessages = pastMessages.reverse();
      setMessages(messages => [...messages, ...reversedPastMessages])
      scrollToBottom();
    })

    socket.on('push', msg => {
      setMessages(messages => [...messages, msg])
      scrollToBottom();
    })

    socket.on('message', newMessage => {
      setMessages(messages => [...messages, newMessage]);
    });

  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newMessage = {
      message,
      username: user.name,
      user: user._id
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
          user={user}
          handleLogout={handleLogout}
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
                users={users}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default Dashboard;