
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect } from "react";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("tab2");

  const navigate = useNavigate();

  const fetchUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User detected:", user); // Debugging
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          toast.error("User not logged in or document does not exist", {
            position: "center"
          });
        }
      } else {
        console.log("No user detected"); // Debugging
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  async function handLogout() {
    try {
      await auth.signOut();
      toast.success("User logged out successfully", { position: "top-center" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error(error.message, { position: "top-center" });
    }
  }

  return (
    <section className="w-screen h-screen bg-white relative flex items-center justify-center">
      <div className="bg-[#000000] w-full h-[30vh] absolute top-0"></div>

      <div className="w-[90%] h-[80vh] z-0 pt-[5rem] flex gap-[2rem] p-4 max-lg:flex-col max-lg:items-center max-lg:pt-4 max-md:h-auto">
        {/* Sidebar */}

        <div className="h-[40vh] max-md:h-auto w-[30%] p-4 flex flex-col gap-[1rem] items-center bg-white rounded-[5px] shadow max-lg:w-full">
          <img
            className="rounded-full h-24 w-24 object-cover"
            src={userDetails?.photo || "/default-photo.png"}
            alt="user"
          />
          <h1 className="text-xl mb-6 max-md:text-[1rem]">
            Welcome, {userDetails?.Firstname || "Guest"}{" "}
            {userDetails?.Lastname || ""}
          </h1>
        </div>

        {/* Main Content */}

        <div className="bg-white w-[70%] max-lg:w-full h-full rounded-[5px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex flex-col">

          {/* Tabs Navigation */}
          <div className="w-full p-4 border-b border-gray-300">
            <div className="flex space-x-4">
              
              <button
                onClick={() => setActiveTab("tab2")}
                className={`p-2 cursor-pointer max-md:text-[.75rem] ${
                  activeTab === "tab2"
                    ? "border-b-2 border-[#5bc8a8] text-[#5bc8a8]"
                    : "text-gray-500"
                }`}
              >
                Appointments
              </button>
              
              <button
                onClick={() => setActiveTab("tab1")}
                className={`p-2 cursor-pointer max-md:text-[.75rem] ${
                  activeTab === "tab1"
                    ? "border-b-2 border-[#5bc8a8] text-[#5bc8a8]"
                    : "text-gray-500"
                }`}
              >
                Account settings
              </button>


              {/* <button
                onClick={() => setActiveTab("tab3")}
                className={`p-2 cursor-pointer ${
                  activeTab === "tab3"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Tab 3
              </button> */}
            </div>
          </div>

          {/* Tabs Content */}
          <div className="border-b-2 border-[#eef0f0] max-md:h-full w-full py-8 px-8 max-md:p-4">
            {activeTab === "tab1" && (
              <div className="grid grid-cols-2 gap-8 h-auto max-md:flex max-md:flex-col">
                <div className="flex flex-col gap-2">
                  <h1 className="max-md:text-[.75rem]">First Name</h1>
                  <input
                    disabled
                    className="bg-[#fbfdff] rounded-[5px] uppercase py-2 px-4 border-[1px] border-[#ddd] outline-none select-none max-md:text-[.75rem]"
                    value={userDetails?.Firstname || "N/A"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="max-md:text-[.75rem]">Last Name</h1>
                  <input
                    disabled
                    className="bg-[#fbfdff] rounded-[5px] uppercase py-2 px-4 border-[1px] border-[#ddd] outline-none select-none max-md:text-[.75rem]"
                    value={userDetails?.Lastname || "N/A"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="max-md:text-[.75rem]">Phone Number</h1>
                  <input
                    disabled
                    className="bg-[#fbfdff] rounded-[5px] uppercase py-2 px-4 border-[1px] border-[#ddd] outline-none select-none max-md:text-[.75rem]"
                    value={userDetails?.Phone|| "N/A"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="max-md:text-[.75rem]">E-mail address</h1>
                  <input
                    disabled
                    className="bg-[#fbfdff] rounded-[5px] py-2 px-4 border-[1px] border-[#ddd] outline-none select-none max-md:text-[.75rem]"
                    value={userDetails?.email || "N/A"}
                  />
                </div>
              </div>
            )}

            {activeTab === "tab2" && (
              <div className="h-full flex items-center justify-center">
                <p>No appointments available</p>
              </div>
            )}

            {/* {activeTab === "tab3" && (
              <div className="h-full flex items-center justify-center">
                <p>Content for Tab 3</p>
              </div>
            )} */}
          </div>

          <div className="w-full p-8 max-md:p-4">
          <button onClick={handLogout} className="relative cursor-pointer overflow-hidden rounded bg-[#ff2b2b] px-[2rem] py-2.5 text-white transition-all duration-200 hover:bg-red-500 hover:ring-offset-2 active:ring-2 active:ring-neutral-800">Logout</button>
          </div>
        </div>
      </div>
    </section>
  );
}
