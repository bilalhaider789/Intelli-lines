import { useRouter } from "next/router";
import Loadingmodal from "../../components/others/LoadingModal";

import { useState, useEffect, useContext, useDebugValue } from "react";
import Authcontext from "../../components/contexts/authcontext";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import { useSession, signOut } from "next-auth/react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { TfiMenu } from "react-icons/tfi";
import { MdPersonOutline } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiPagesLine } from "react-icons/ri";
import { MdOutlineFindInPage } from "react-icons/md";
import { MdVideoSettings } from "react-icons/md";
import { GiCutDiamond } from "react-icons/gi";
import { MdOutlineExtension } from "react-icons/md";

import { RxCross2 } from "react-icons/rx";
import { MdSettingsBackupRestore } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import LoadingModal from "../../components/others/LoadingModal";
import Profile from "../../components/dashboard/profile";

export default function Dashboard() {
  const router = useRouter();
  const ctx = useContext(Authcontext);
  const { data: session, status } = useSession();
  const [drop, setdrop] = useState(false);
  const [side, setside] = useState(true);
  const [username,setusername]=useState("")
  const [useremail,setuseremail]=useState("")
  const [loading,setloading]=useState(false)

  useEffect(()=>{
    setuseremail(localStorage.getItem("email"))
    setusername(localStorage.getItem("username"))
  })

  return (
    <div>
      <div
        className="bg-blue-300 w-screen h-14 pl-5 flex items-center justify-between absolute top-0 shadow-xl"
        style={{
          background: `linear-gradient(90deg, rgba(50,221,102,1) 0%, rgba(50,181,147,1) 53%, rgba(50,116,221,1) 100%)`,
        }}
      >
        <div>
          <IconButton className="" onClick={() => setside(!side)}>
            <TfiMenu className="fill-black h-16 w-8" />
          </IconButton>
        </div>
        <div className="flex ">
          <div>
            <img src="/images/logo.png" className="w-16 mr-5"></img>
          </div>
          <div className="font-[poppins] text-[40px] text-[#0a0a0a] ">
            Intelli-Lines
          </div>
        </div>
        <div className="mr-8 ">
          <div className="flex">
            <div className="mt-3 text-[20px] font-[poppins] font-semibold">
              {username}
            </div>
            <IconButton
              className=" bg-black h-12 "
              onMouseEnter={() => setdrop(true)}
              onMouseLeave={() => setdrop(false)}
            >
              <MdPersonOutline className="fill-black h-20 w-12" />
            </IconButton>
          </div>
          {drop && (
            <div
              className="absolute text-[18px]  bg-white rounded-xl right-4 flex flex-col justify-center px-4 py-4 border-2"
              onMouseEnter={() => setdrop(true)}
              onMouseLeave={() => setdrop(false)}
            >
              <div className="">
                <div>Email</div>
                <div>{useremail}</div>
              </div>
              <div
                className="border-t-2 border-b-2 mt-2 mb-1 flex items-center py-2"
                onClick={() => {
                  console.log("accout");
                }}
              >
                <BsPersonCircle className="w-6 h-6 mr-2 ml-1" />
                Account Details
              </div>
              <div
                className="flex items-center cursor-pointer hover:bg-red-400"
                onClick={() => {
                  ctx.logout();
                  setloading(true)
                  signOut({ callbackUrl: "http://localhost:3000/auth" });
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
          <div className="lg:col-span-1 pt-4 bg-gray text-[20px] flex flex-col hover:cursor-pointer  bg-gray-100">
            <div className="border-y-2 py-4 hover:bg-[#2fcf2c] hover:text-white px-10 flex items-center">
              <MdVideoSettings className="w-10 h-8 mr-2 text-red-600" />
              <p> Video Summarizer</p>
            </div>
            <div className="border-y-1 py-4 hover:bg-[#2fcf2c] hover:text-white px-10 flex items-center">
              <RiPagesLine className="w-10 h-8 mr-2 text-orange-500" />
              Text Summarizer
            </div>
            <div className="border-y-2 py-4 hover:bg-[#2fcf2c] hover:text-white px-10 flex items-center">
              <MdOutlineFindInPage className="w-10 h-8 mr-2 text-green-600" />
              Text Extractor OCR
            </div>
            <div className="border-y-1 py-4 hover:bg-[#2fcf2c] hover:text-white px-10 flex items-center">
              <GiCutDiamond className="w-10 h-8 mr-2 text-[#e7e733]" />
              Premium Version
            </div>
            <div className="border-y-2 py-4 hover:bg-[#2fcf2c] hover:text-white px-10 flex items-center">
              <MdOutlineExtension className="w-10 h-8 mr-2 text-blue-400" />
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
          <Profile session={session}></Profile>
          
        </div>
      </div>
    
    
    <LoadingModal state={loading}></LoadingModal>
    </div>
  );
}

