import { useRouter } from "next/router";
import { useState, useEffect, useContext, useDebugValue } from "react";
import { useSession, signOut } from "next-auth/react";

import IconButton from "@mui/material/IconButton";
import { TfiMenu } from "react-icons/tfi";
import { MdExtension, MdOutlineCloudUpload, MdPersonOutline } from "react-icons/md";
import { BsCloudUpload, BsPersonCircle } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiPagesLine } from "react-icons/ri";
import { AiTwotoneSetting } from "react-icons/ai";
import { MdVideoSettings } from "react-icons/md";
import { GiCutDiamond } from "react-icons/gi";
import { MdOutlineExtension } from "react-icons/md";

import { FaUserFriends } from "react-icons/fa";
import LoadingModal from "../../../components/others/LoadingModal";
import Users from "../../../components/admin_Dashboard/Users";
import AddUsers from "../../../components/admin_Dashboard/AddUser";

export default function adminDashboard() {

    const router = useRouter();
  const { data: session, status } = useSession();
  const [drop, setdrop] = useState(false);
  const [side, setside] = useState(true);
  const [username, setusername] = useState("");
  const [useremail, setuseremail] = useState("");
  const [loading, setloading] = useState(false);
  const [screen, setscreen] = useState("adduser");




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
          <div className="lg:col-span-1 pt-4     bg-gray text-[20px] flex flex-col hover:cursor-pointer  bg-gray-100 font-['Poppins']">
            <div
              className="border-y-2 py-4 hover:bg-[#38f034] hover:text-white px-2 flex items-center"
              style={
                screen == "video"
                  ? { backgroundColor: "#2fcf2c", color: "white" }
                  : {}
              }
              onClick={() => setscreen("users")}
            >
              <FaUserFriends className="w-10 h-8 mx-5 text-red-600" />
              <p> Users</p>
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
              <RiPagesLine className="w-10 h-8 mx-5 text-orange-500" />
              Subscriptions
            </div>
            <div
              className="border-y-2 py-4 hover:bg-[#38f034] hover:text-white px-2 flex items-center"
              style={
                screen == "extension"
                  ? { backgroundColor: "#2fcf2c", color: "white" }
                  : {}
              }
              onClick={() => setscreen("extension")}
            >
              <MdExtension className="w-10 h-7 mx-5 text-gray-500" />
              Chrome Extension
            </div>
            
            <div
              className="border-y-2 py-4 hover:bg-[#38f034] hover:text-white px-2 flex items-center"
              style={
                screen == "extension"
                  ? { backgroundColor: "#2fcf2c", color: "white" }
                  : {}
              }
              onClick={() => setscreen("extension")}
            >
              <AiTwotoneSetting className="w-10 h-7 mx-5 text-gray-500" />
              Account Settings
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
          {screen == "users" && <Users adduser={()=>{setscreen("adduser");console.log("add button")}}/>}
          {screen=="adduser" && <AddUsers allusers={()=>setscreen("users")}/>}
          
        </div>
      </div>

      <LoadingModal state={loading}></LoadingModal>
    </div>
        )



}