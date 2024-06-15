import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const appStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "'Poppins', sans-serif",
  };

  const joinChatContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    padding: "15px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ddd",
    width: "100%",
    maxWidth: "300px",
    fontSize: "16px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
  };

  const buttonStyle = {
    padding: "15px 30px",
    marginTop: "20px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #42e695, #3bb2b8)",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
  };

  const buttonHoverStyle = {
    background: "linear-gradient(135deg, #3bb2b8, #42e695)",
  };

  const headingStyle = {
    marginBottom: "20px",
    color: "#333",
  };

  const [hover, setHover] = useState(false);

  return (
    <div style={appStyle}>
      {!showChat ? (
        <div style={joinChatContainerStyle}>
          <h3 style={headingStyle}>Join A Chat</h3>
          <input
            style={inputStyle}
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button
            style={{ ...buttonStyle, ...(hover ? buttonHoverStyle : {}) }}
            onClick={joinRoom}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Join Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
