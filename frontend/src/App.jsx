import { useEffect, useState } from "react";
import socket from "./socket/MySocket.js";



function App() {
  const[messageHistory, setMessageHistory] = useState([]);
  const handleSendMessage = (event) => {
    event.preventDefault();
    const input = event.target.elements.msg;
    const message = input.value;
    socket.emit("message", message);
    input.value = "";
  };

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("message:", message);
      setMessageHistory((prevMessages) => [...prevMessages, message])
    });
  }, [])

  return (
    <>
      <h1>Socket.IO Chat</h1>
      <h2>Message History</h2>
      <ul>
        {messageHistory.map((msg,index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSendMessage}>
        <input id="input" autoComplete="off" name="msg" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;