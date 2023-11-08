import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Message from "./../components/Message";

const chat = ({ room, setRoom }) => {
  //get ref for data to be updated
  const messagesCol = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  //adds messages to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    //add docs create auto Id  (thats++)
    // two params
    //(reference of the collection to be added , data)
    await addDoc(messagesCol, {
      text,
      room,
      user: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      },
      // get server time .
      createdAt: serverTimestamp(),
    });

    e.target[0].value = "";
  };

  useEffect(() => {
    //filter setting
    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // watch the collection for every changes
    onSnapshot(queryOptions, (snapshot) => {
      let tempMessages = [];
      //

      snapshot.docs.forEach((doc) =>
        tempMessages.push({ id: doc.id, ...doc.data() })
      );

      setMessages(tempMessages);
    });
  }, []);

  return (
    <div className="chat">
      <header>
        <p className="user">
          <img src={auth?.currentUser?.photoURL} alt="" />
          {auth?.currentUser?.displayName}
        </p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Change Room</button>
      </header>
      <main>
        {messages?.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="enter messages..." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default chat;
