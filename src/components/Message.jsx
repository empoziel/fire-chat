import React from "react";
import { auth } from "../firebase/config";

const Message = ({ msg }) => {
  //id of the user sending the message
  //if the same logged in person
  if (msg.user.uid === auth.currentUser.uid) {
    return <p className="msg-user">{msg.text}</p>;
  }

  //if sender is diff
  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={msg.user.photo} />
        <span>{msg.user.name} :</span>
      </p>

      <p className="msg-text">{msg.text}</p>
    </div>
  );
};

export default Message;
