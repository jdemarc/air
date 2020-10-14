import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import UserPanel from '../../components/UserPanel';
import ChatWindow from '../../components/ChatWindow';
import Input from '../../components/Input';
import io from 'socket.io-client'
import messageService from '../../utils/messageService';
import './Dashboard.css';

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
    socket.on("connect", () => {
      socket.emit("sign-on", user.name);
    });
  
    socket.on("connected", (user) => {
      console.log('connected socket', user)
      setUsers(users => [...users, user]);
    });
  
    socket.on("users", users => {
      console.log('users socket', users)
      setUsers(users);
    });
    
    socket.on("disconnected", (id) => {
      setUsers(users => {
        return users.filter(user => user.id.toString() !== id.toString());
      });
    });
    
    return () => {
      socket.disconnect();
    }

  }, [user.name])

  // Message effects.
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
    <div className="dashboard-container">
      <div className="centering-container border border-secondary rounded p-3 ">
        <Header
          user={user}
          handleLogout={handleLogout}
        />
        <ChatWindow
          messages={messages}
        />
        <Input
          message={message}
          handleSubmit={handleSubmit}
          setMessage={setMessage}
        />

        <UserPanel
          users={users}
        />
      </div>
    </div>
  )
};

export default Dashboard;