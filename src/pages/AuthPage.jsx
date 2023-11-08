import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase/config";

const AuthPage = ({ setIsAuth }) => {
  //sign in func
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem("token", res.user.refreshToken);
        setIsAuth(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Front Chat Room</h1>
        <p>Sign in for continue</p>
        <button onClick={handleClick}>
          <img src="/google.png" alt="" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
