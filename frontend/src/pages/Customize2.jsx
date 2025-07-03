import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";

function Customize2() {
  const { userData } = useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.AssistantName || ""
  );
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] ">
      <h1 className="text-white mb-[30px] text-[30px] text-center">
        {" "}
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg: Shagun"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] rounded-full py-[10px] text-[18px]"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
      {assistantName && (
        <button
          className="min-w-[300px] h-[60px] bg-white rounded-3xl text-black font-semibold cursor-pointer text-[19px] mt-[26px]"
          onClick={() => navigate("/customize2")}
        >
          Finally Create Your Assistant
        </button>
      )}
    </div>
  );
}

export default Customize2;
