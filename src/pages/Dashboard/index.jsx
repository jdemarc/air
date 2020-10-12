import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import UserPanel from '../../components/UserPanel';
import ChannelPanel from '../../components/ChannelPanel';
import ChatWindow from '../../components/ChatWindow';
import messageService from '../../utils/messageService';
import './Dashboard.css';
import io from 'socket.io-client'

const Dashboard = (props) => {
  const socket = io('http://localhost:3000/')
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('init', msgs => {
      let msgsReversed = msgs.reverse();

      setMessages([...messages, ...msgsReversed]);
    })

  }, [0])

  useEffect(() => {
    socket.on('push', newMsg => {
      setMessages([...messages, newMsg])
    })

    scrollToBottom();
  }, [])

  const handleAddMessage = async (newMsg) => {
    const newMessage = await messageService.create(newMsg);
    
    socket.emit("message", newMessage);
  }

  const scrollToBottom = () => {
    const chat = document.getElementById('chatbox');
    chat.scrollTop = chat.scrollHeight;
  }

//   useEffect(() => {

//     props.socket.on('init', (msgs) => {
//       let msgsReversed = msgs.reverse();

//       this.setState((state) => ({
//         messages: [...state.messages, ...msgsReversed]
//       }));

//     })
//  }, [props.socket])

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