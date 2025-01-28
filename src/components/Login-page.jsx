import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import GoogleButton from "./google";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("user Login successfully", { position: "top-center", });
      setTimeout(() => {
        navigate("/dentist/Profile/");
      }, 1000);
      
      
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      toast.error(error.message,{position:"top-center",});
    }
  };

 

  
  return (
    <>
      <section className="w-screen h-screen bg-gray-900">
        <Nav />
        <div className="flex flex-col items-center justify-center h-[80%]">
          <h1 className="text-white text-xl text-gray-500 mb-6">Login</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-[15rem] items-center">
            <input
              type="text"
              placeholder="Email"
              value={email}
              className="bg-gray-800 text-white p-2 w-[100%] mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-800 text-white p-2 w-[100%] mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-gray-800 text-white p-2">Login</button>
          </form>
          <GoogleButton />
        </div>
      </section>
    </>
  );
}
