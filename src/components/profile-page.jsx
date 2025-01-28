import Nav from "./navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  
    const navigate = useNavigate();
  const fetchUser = async () => {
      auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          setUserDetails(docSnap.data());
         
        } else
      {
         toast.error("Your are not logend In", { position: "center" });
          }
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);
    async function handLogout() {
        
        try {
             await auth.signOut();
            toast.success("user logout successfully", { position: "top-center" });
            setTimeout(() => {navigate("/login") }, 1000);
            
        } catch (error) { 
            console.error("Error signing out:", error);
            toast.error(error.message, { position: "top-center" });
        };
    }
    
    
  return (
    <>
      <section className="w-screen  bg-gray-900  h-screen">
        <Nav />
        <div className="flex flex-col items-center justify-center gap-11 h-[80%]">
          {userDetails ? (
            <>
              <img
                className="rounded-full h-24 w-24 object-cover"
                src={userDetails.photo}
                alt="user"></img>
              
              <div className="">
                <h1 className="text-white text-xl  mb-6">
                  Welcome, {userDetails.Firstname} {userDetails.Lastname}
                </h1>
                              <h6 className="text-white">First name: {userDetails.Firstname}</h6>
                <h6 className="text-white">lastname: {userDetails.Lastname}</h6>
                              
                <h6 className="text-white">email: {userDetails.email}</h6>
               
                <button onClick={handLogout} className=" bg-gray-500 p-2 mt-2 cursor-pointer rounded">
                  logout
                </button>
              </div>
            </>
          ) : (<>
              <p>loading....</p>
              
            </> 
              )}
        </div>
      </section>
    </>
  );
}
