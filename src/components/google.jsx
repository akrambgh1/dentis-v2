
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function GoogleButton() {
      const navigate = useNavigate();
    
const handleGRegister = async (e) => {
    e.preventDefault();
    try {
      
    const provider = new GoogleAuthProvider();
      
    signInWithPopup(auth, provider).then((result) => {
      console.log(result)
      if (result.user)
        setDoc(doc(db, "users", result.user.uid), {
          email: result.user.email,
          Lastname: result._tokenResponse.lastName,
          Firstname: result._tokenResponse.firstName,
          photo:result.user.photoURL,
          phoneNumber: result.user.phoneNumber,
        
  
      
        }); {setTimeout(() => {
        navigate("/Profile");
  }, 1000);;toast.success("user registered successfully", { position: "top-center", });}
    })
       
       
      }
      
      
     catch (error) {
      toast.error(error.message,{position:"top-center",});
    }
    
  };
    return (
        <button onClick={handleGRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign in with Google
        </button>
    )
}