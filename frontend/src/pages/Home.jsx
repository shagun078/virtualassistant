import React, { useContext,useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();
  const [listening,setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef= useRef(null)
  const synth= window.speechSynthesis

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  const startRecognition = () =>{
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (error) {
      if(!error.message.includes("start")){
        console.error("Recognition error:",error);
      }
    }
  }

  const speak =(text)=>{
    const utterence= new SpeechSynthesisUtterance(text)
    isSpeakingRef.current = true
    utterence.onend=()=>{
      isSpeakingRef.current = false
      startRecognition()
      // recognitionRef.current?.start()
    }
    synth.speak(utterence)
  }

  const handleCommand=(data)=>{
    const {type,userInput,response}= data
    speak(response)
    if(type === 'google-search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`,
        '_blank');
    }
    if(type === 'calculator-open'){
      window.open(`https://www.google.com/search?q=calculator`,
        '_blank');
    }
    if(type === 'instagram-open'){
      window.open(`https://www.instagram.com/`,'_blank');
    }
    if(type === 'facebook-open'){
      window.open(`https://www.facebook.com/`,'_blank');
    }
    if(type === 'weather-show'){
      window.open(`https://www.google.com/search?q=weather`,
        '_blank'
      );
    }
    if(type === 'youtube-search' || type === 'youtube-play'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`,
        '_blank');
    }
  }

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    (recognition.continuous = true), (recognition.lang = "en-US");

    recognitionRef.current = recognition

    const isRecognizingRef ={current:false}

    const safeRecognition=()=>{
      if(!isSpeakingRef.current && !isRecognizingRef.current){
       try {
         recognition.start()
         console.log("Recognition requested to start");
       } catch (error) {
          if(error.name !== "InvalidStateError"){
            console.error("Start error:",error);
          }
       }

      }
    }
    recognition.onstart = ()=>{
      // console.log("Recognition started");
      isRecognizingRef.current = true;
      setListening(true);
    };
    recognition.onend = ()=>{
      // console.log("Recognition ended");
      isRecognizingRef.current = false;
      setListening(false);
    
    if(!isSpeakingRef.current){
      setTimeout(()=>{
        safeRecognition()
      },1000);
    }
  };

   recognition.onerror =(event) =>{
    console.warn("Recognition error: ", event.error);
    isRecognizingRef.current = false;
    setListening(false);
    if(event.error !== "aborted" && !isSpeakingRef.current){
      setTimeout(()=>{
        safeRecognition();
      },1000);
    }
   };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("heard: " + transcript);

      if (
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        recognition.stop()
        isRecognizingRef.current= false;
        setListening(false)
        const data = await getGeminiResponse(transcript);
        // console.log(data);
        handleCommand(data);
      }
    };


    const fallback = setInterval(()=>{
      if(!isSpeakingRef.current && !isRecognizingRef.current){
        safeRecognition()
      }
    },10000)
    safeRecognition()
    return ()=>{
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
      clearInterval(fallback)
    }
    // recognition.start();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[15px]">
      <button
        className="min-w-[150px] h-[60px] cursor-pointer absolute top-[20px] right-[20px] bg-white rounded-3xl text-black font-semibold text-[19px] mt-[26px]"
        onClick={handleLogOut}
      >
        Logout
      </button>
      <button
        className="min-w-[150px] h-[60px] cursor-pointer absolute top-[100px] right-[20px] px-[20px] py-[10px] bg-white rounded-3xl text-black font-semibold text-[19px] mt-[26px]"
        onClick={() => {
          navigate("/customize");
        }}
      >
        Customize your Assistant
      </button>
      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover "
        />
      </div>
      <h1 className="text-white text-[18px] ">I'm {userData?.assistantName}</h1>
    </div>
  );
}

export default Home;
