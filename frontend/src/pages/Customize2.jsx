import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import {MdKeyboardBackspace} from "react-icons/md"
import { useNavigate } from "react-router-dom";

function Customize2() {
  const { userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.AssistantName || ""
  );
  const [loading,setLoading] = useState(false)
  const navigate= useNavigate()


const handleUpdateAssistant = async () => {
    setLoading(true)
    try {
        let formData = new FormData()
        formData.append("assistantName", assistantName)
        
        if (selectedImage === "input" && backendImage) {
            // User uploaded a custom image
            formData.append("assistantImage", backendImage)
        } else if (selectedImage && selectedImage !== "input") {
            // User selected a preset image
            formData.append("imageUrl", selectedImage)
        } else {
            // No image selected
            alert("Please select or upload an assistant image!")
            setLoading(false)
            return
        }
        console.log("selectedImage:", selectedImage);
        console.log("backendImage:", backendImage);
        console.log("FormData contents:");
        for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
        }

        const result = await axios.post(`${serverUrl}/api/user/update`, 
            formData, {withCredentials: true})
        
        setLoading(false)
        console.log(result.data)
        setUserData(result.data)
        navigate("/")
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
}

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] relative">
      <MdKeyboardBackspace className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer"
      onClick={()=>navigate("/customize")}
      />
      <h1 className="text-white mb-[30px] text-[30px] text-center">
        {" "}
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg: Sifra"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] rounded-full py-[10px] text-[18px]"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
      {assistantName && (
        <button
          className="min-w-[300px] h-[60px] bg-white rounded-3xl text-black font-semibold cursor-pointer text-[19px] mt-[26px]"
          disabled={loading}
          onClick={() => {
            // navigate("/customize2")
            handleUpdateAssistant()
          }}>
          {!loading? "Finally Create Your Assistant":"Loading.."}
        </button>
      )}
    </div>
  );
}

export default Customize2;
