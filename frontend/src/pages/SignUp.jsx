import React,{useState} from "react";
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full h-[100vh] bg-cover flex justify-center items-center" style={{backgroundImage:`url(${bg})`}} >
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000052] backdrop-blur rounded-lg flex flex-col justify-center items-center gap-[20px] px-[20px]'>
        <h1 className="text-white text-[30px] font-semibold mb-[30px]" >Register to <span className="text-blue-400" >Virtual Assistant</span></h1>
           <input type="text" placeholder="Enter your name" className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] rounded-full py-[10px] text-[18px]" />
           <input type="email" placeholder="Email" className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] rounded-full py-[10px] text-[18px]" />
            <div className="relative w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px]">
              <input type={showPassword?"text" : "password"} placeholder="Password" className="w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] rounded-full py-[10px]" />
              {!showPassword && <IoEye className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer" onClick={()=>setShowPassword(true)}/>}
              {showPassword && <IoEyeOff className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer" onClick={()=>setShowPassword(false)}/>}

            </div>
            <button className="min-w-[150px] h-[60px] bg-white rounded-3xl text-black font-semibold text-[19x] mt-[26px]">Sign Up</button>
            <p className="text-[white] text-[18px] cursor-pointer" >Already have an account? <span className="text-blue-400">Sign In</span></p>
      </form>
    </div>
  );
}
export default SignUp;