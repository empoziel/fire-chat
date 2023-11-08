import AuthPage from "./pages/AuthPage";
import "./style.scss";
import { useState } from "react";
import Chat from "./pages/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  // state of the room the user entered
  const [room, setRoom] = useState(null);

  //determines the room when u submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoom(e.target[0].value);
  };

  // no authority > sign in
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }

  // authority > choose chat room
  return (
    <div className="container">
      {room ? (
        //if user seleted room > chat
        <Chat room={room} setRoom={setRoom} />
      ) : (
        // if user is did not select room > choose room
        <form onSubmit={handleSubmit} className="room-page">
          <h1>Chat Room</h1>
          <p>Enter the room name</p>

          <input type="text" placeholder="eg:fireroom" />

          <button type="submit">Enter the Room</button>
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  //delete token from locale
                  localStorage.removeItem("token");
                  setIsAuth(false);
                })
                .catch((err) => console.log(err));
            }}
            id="logout"
            type="button"
          >
            Log Out
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
