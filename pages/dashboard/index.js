import { useRouter } from "next/router";
import { useState, useEffect, useContext, useDebugValue } from "react";
import Authcontext from "../../components/contexts/authcontext";
import { useSession, signOut } from "next-auth/react";

import IconButton from "@mui/material/IconButton";
import { TfiMenu } from "react-icons/tfi";
import { MdExtension, MdOutlineCloudUpload, MdPersonOutline } from "react-icons/md";
import { BsCloudUpload, BsPersonCircle } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiPagesLine } from "react-icons/ri";
import { MdOutlineFindInPage } from "react-icons/md";
import { MdVideoSettings } from "react-icons/md";
import { GiCutDiamond } from "react-icons/gi";
import { MdOutlineExtension } from "react-icons/md";

import { FaHistory } from "react-icons/fa";


import { GoCloudUpload } from "react-icons/go";

import LoadingModal from "../../components/others/LoadingModal";
import Profile from "../../components/dashboard/profile";
import VideoSummarizer from "../../components/dashboard/videosummarizer";
import TextSummarizer from "../../components/dashboard/textsummarizer";
import OCRExtractor from "../../components/dashboard/ocrextractor";
import Premium from "../../components/dashboard/premium";
import History from "../../components/dashboard/history";

export default function Dashboard() {
  const router = useRouter();
  const ctx = useContext(Authcontext);
  const { data: session, status } = useSession();
  const [drop, setdrop] = useState(false);
  const [side, setside] = useState(true);
  const [username, setusername] = useState("");
  const [useremail, setuseremail] = useState("");
  const [loading, setloading] = useState(false);
  const [screen, setscreen] = useState("video");

  useEffect(() => {

    setuseremail(localStorage.getItem("email"));
    setusername(localStorage.getItem("username"));
    
  });

  useEffect(() => {

    if (status === "authenticated") {
    
      sociallogin();
  
    }
  },[status]);
  

  const sociallogin= async()=>{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NODE}social`, {
        method: "PATCH",
        body: JSON.stringify({
          email: session.user.email,
          name: session.user.name,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data)
      if (data.success==true){
        ctx.login(data);
        console.log("abc");
        router.replace("/dashboard");
      }
    } catch (e) {
      console.log("error")
    }
  }


  

  return (
    <div>
      <div
        className=" w-screen h-16 pl-5 flex items-center justify-between absolute top-0 shadow-xl bg-gray-200 font-['Poppins']"
        style={{
          // background: `linear-gradient(90deg, rgba(50,221,102,1) 0%, rgba(50,181,147,1) 53%, rgba(50,116,221,1) 100%)`,
        }}
      >
        <div>
          <IconButton className="" onClick={() => setside(!side)}>
            <TfiMenu className="text-black h-16 w-8" />
          </IconButton>
        </div>
        <div className="flex ">
          <div>
            <img src="/images/logo.png" className="w-16 mr-5"></img>
          </div>
          <div className="font-['Poppins'] text-[40px] text-[#0a0a0a]  ">
            Intelli-Lines
          </div>
        </div>
        <div className="mr-8 ">
          <div className="flex">
            <div className="mt-3 text-[20px] font-[poppins] font-semibold">
              {username}
            </div>
            <IconButton
              className=" h-12 "
              onMouseEnter={() => setdrop(true)}
              onMouseLeave={() => setdrop(false)}
            >
              <MdPersonOutline className="fill-black h-20 w-12" />
            </IconButton>
          </div>
          {drop && (
            <div
              className="absolute text-[18px]  bg-white rounded-xl right-4 flex flex-col justify-center px-4 py-4 border-2 z-10"
              onMouseEnter={() => setdrop(true)}
              onMouseLeave={() => setdrop(false)}
            >
              <div className="">
                <div>Email</div>
                <div>{useremail}</div>
              </div>
              <div
                className="border-t-2 border-b-2 mt-2 mb-1 flex items-center py-2 cursor-pointer hover:bg-blue-200"
                onClick={() => {
                  setscreen("account");
                }}
              >
                <BsPersonCircle className="w-6 h-6 mr-2 ml-1" />
                Account Details
              </div>
              <div
                className="flex items-center cursor-pointer hover:bg-blue-200"
                onClick={() => {
                  ctx.logout();
                  setloading(true);
                  signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}auth` });
                }}
              >
                <RiLogoutBoxRLine className="w-8 h-8 mr-2 " />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="  w-screen h-screen pt-10 mx-auto grid lg:grid-cols-6">
        {side && (
          <div className="lg:col-span-1 pt-4 bg-gray text-[20px] flex flex-col hover:cursor-pointer  bg-gray-100 font-['Poppins']">
            <div
              className="border-y-2 py-4 hover:bg-[#38f034] hover:text-white px-2 flex items-center"
              style={
                screen == "video"
                  ? { backgroundColor: "#2fcf2c", color: "white" }
                  : {}
              }
              onClick={() => setscreen("video")}
            >
              <MdVideoSettings className="w-10 h-8 mr-2 text-red-600" />
              <p> Video Summarizer</p>
            </div>
            <div
              className="border-y-1 py-4 hover:bg-[#38f034] hover:text-white px-2 flex items-center"
              style={
                screen == "text"
                  ? { backgroundColor: "#2fcf2c", color: "white" }
                  : {}
              }
              onClick={() => setscreen("text")}
            >
              <RiPagesLine className="w-10 h-8 mr-2 text-orange-500" />
              Text Summarizer
            </div>
            <div
              className="border-y-2 py-4 hover:bg-[#38f034] hover:text-white px-2 flex items-center"
              style={
                screen == "ocr"
                  ? { backgroundColor: "#2fcf2c", color: "white" }
                  : {}
              }
              onClick={() => setscreen("ocr")}
            >
              <MdOutlineFindInPage className="w-10 h-8 mr-2 text-green-600" />
              Text Extractor OCR
            </div>
            <div
              className="border-y-1 py-4 hover:bg-[#38f034] hover:text-white px-2 flex items-center"
              style={
                screen == "history"
                  ? { backgroundColor: "#2fcf2c", color: "white" }
                  : {}
              }
              onClick={() => setscreen("history")}
            >
              <FaHistory className="w-10 h-7 mr-2 text-[#71a0f7]" />
              History
            </div>
            <div
              className="border-y-1 py-4 hover:bg-[#38f034] hover:text-white px-2 flex items-center"
              style={
                screen == "premium"
                  ? { backgroundColor: "#2fcf2c", color: "white" }
                  : {}
              }
              onClick={() => setscreen("premium")}
            >
              <GiCutDiamond className="w-10 h-7 mr-2 text-[#e7e733]" />
              Premium Version
            </div>
            <div
              className="border-y-2 py-4 hover:bg-[#38f034] hover:text-white px-2 flex items-center"
              style={
                screen == "extension"
                  ? { backgroundColor: "#2fcf2c", color: "white" }
                  : {}
              }
              onClick={() => window.open('https://www.youtube.com/watch?v=p0iPX7SkteI&t=68s&ab_channel=BrutAmerica', '_blank')}
            >
              <MdExtension className="w-10 h-7 mr-2 text-gray-500" />
              Chrome Extension
            </div>
          </div>
        )}
        {/* <Profile session={session}></Profile> */}
        <div
          className={
            side
              ? `lg:col-span-5  mt-4 flex flex-col`
              : `lg:col-span-6  mt-4 flex flex-col `
          }
        >
          {screen == "account" && <Profile session={session}></Profile>}
          {screen =="video" && <VideoSummarizer/>}
          {screen =="text" && <TextSummarizer/>}
          {screen =="ocr" && <OCRExtractor/>}
          {screen =="premium" && <Premium/>} 
          {screen =="history" && <History/>}  
          
        </div>
      </div>

      <LoadingModal state={loading}></LoadingModal>
    </div>
  );
}
