/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import GoogleButton from "./google";
import Button from "./Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("user Login successfully", { position: "top-center" });
      setTimeout(() => {
        navigate("/Profile");
      }, 1000);
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      toast.error(error.message, { position: "top-center" , margi: "1rem" });
    }
  };

  return (
    <>
      <Nav/>

      <section className="w-screen h-screen flex flex-col items-center justify-center">
        <form onSubmit={handleLogin} className="w-[80%] h-auto flex flex-col justify-center gap-[2rem] p-4 max-[450px]:w-full md:w-[70%] lg:w-[60%] lg:p-8 xl:w-[30%]">
          <h1 className="font-bold text-[2rem]">
            Hey ,<br className="md:hidden"/>
            Login now
          </h1>
          <h3 className="text-[#747474]">No account? Register here.</h3>
          <input
            type="text"
            className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full bg-[#eee] px-4 py-2 rounded-[5px] outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="relative h-12 overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
            <span className="relative">Log In</span>
          </button>

          <GoogleButton />

         
        </form>
      </section>
    </>
  );
}
