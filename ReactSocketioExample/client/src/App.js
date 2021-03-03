import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

var socket = io();

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const room = "123";
  const [userName, setUserName] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
       if(message !== null && message !== " " && message !== "" )
       {
          let messageContent = {
            room: room,
            content: {
              uname: userName,
              message: message,
            },
        }
        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage("");
    };
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input type="text" placeholder="Adınızı Girin..." onChange={(e) => {setUserName(e.target.value);}}/>
          </div>
          <button onClick={connectToRoom}>Sohbete Katıl</button>
        </div>
      ) : (
        <>
        <div style={{overflowY: "scroll",display:"flex", flexDirection: "column"}} className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div className="messageContainer" id={val.uname === userName ? "second" : "first"}>
                  <div className="messageIndividual">
                    {val.uname}: {val.message}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
          <div className="messageInputs">
            <input type="text" value={message} placeholder="Mesajınızı girin..." onChange={(e) => {setMessage(e.target.value);}}/>
            <button onClick={sendMessage}>Gönder</button>
        </div>
      </>
      )}
    </div>
  );
}

export default App;
