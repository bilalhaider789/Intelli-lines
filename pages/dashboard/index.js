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

export default function Dashboard() {
  const router = useRouter();
  const ctx = useContext(Authcontext);
  const { data: session, status } = useSession();
  const [email, setemail] = useState("");
  const [drop, setdrop] = useState(false);
  const [side, setside] = useState(true);
  const [box, setbox]= useState(true);
  const [namemodal,setnamemodal]=useState(false)
  const [editname,seteditname]= useState("")
  const [passmodal,setpassmodal]=useState(false)
  const [editpass,seteditpass]= useState("")
  const [visible, setvisible] = useState(false);
  const [eerror, seteerror]=useState(false);
  const [validpassword, setvalidpassword] = useState(true);
  const [username,setusername]=useState("")
  const [useremail,setuseremail]=useState("")
  const [loading,setloading]=useState(false)

  useEffect(()=>{
    setuseremail(localStorage.getItem("email"))
    setusername(localStorage.getItem("username"))
  })

  // useEffect(()=>{
  //   if(session != null){
  //     setemail(session.user.email)
  //   }
  // })

  const changepassword=async()=>{
    try{
      const response = await fetch("http://localhost:5000/changepass", {
        method: "PATCH",
        body: JSON.stringify({ email: useremail, password: editpass }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
    }catch(e){

    }
  }
  
  const updateusername=()=>{
    console.log(editname)
    localStorage.setItem("username",editname)
    setusername(editname)
    setnamemodal(false)
  }

  const ch = () => {
    ctx.login("abc", 123);
  };


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
        
        <div
          className={
            side
              ? `lg:col-span-5  mt-4 flex flex-col `
              : `lg:col-span-6  mt-4 flex flex-col `
          }
        >
          <div className="bg-white w-full h-[75%] flex ">
            <div className="flex flex-col justify-center items-center px-16">
              
              {
                session ? <img src={session.user.image} className="h-44 w-44 rounded-full"></img>: <div className="h-44 w-44 bg-[#E0E0E0] rounded-full flex flex-col justify-center items-center text-[#5F6368] text-[88px]">
                {username.charAt(0).toUpperCase()}
              </div>
              }
              <p className="mt-10 mb-2 text-[26px]">{username}</p>
              <p className="font-semibold text-[22px]">
                {useremail}
              </p>
            </div>
            <div className="flex flex-col justify-center items-start pr-16 w-full">
              <div className="flex text-[18px]">
                <p className="mr-12 hover:cursor-pointer" onClick={()=>setbox(true)}>Profile</p>
                <p className="hover:cursor-pointer" onClick={()=>setbox(false)}>Your Plan</p>
              </div>
              { box ? <div className="w-full h-[380px] bg-[#F3F4F6] my-4 text-[22px] rounded-xl shadow-lg px-10  grid lg:grid-cols-2 hover:cursor-pointer">
                <div className="py-10 lg:col-span-1">
                  <div>
                    <p className="font-semibold text-[22px]">Name</p>
                    <p>{username}</p>
                  </div>
                  <div className="my-14">
                    <p className="font-semibold text-[22px]">Email</p>
                    <p>{useremail}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[22px]">Subscription</p>
                    <p>Free</p>
                  </div>
                </div>
                <div className="py-10 lg:col-span-1">
                  <div>
                    <p className="font-semibold text-[22px]">Account</p>
                    <p className="text-[16px] flex hover:font-bold" onClick={()=>setnamemodal(true)}>Change UserName <MdSettingsBackupRestore className="w-8 h-6  text-green-600" /></p>
                    <p className="text-[16px] flex hover:font-bold" onClick={()=>setpassmodal(true)}>Change Password<MdSettingsBackupRestore className="w-8 h-6 ml-2 text-green-600" /></p>
                  </div>
                </div>
              </div>: <div className="w-full h-[180px] mb-52 bg-[#F3F4F6] my-4 text-[22px] rounded-xl shadow-lg px-10  grid lg:grid-cols-2 hover:cursor-pointer">
                <div className="py-10 lg:col-span-2">
                  <div>
                    <p className="font-semibold text-[22px]">Current Plan</p>
                    <p>Free Basic Plan</p>
                    <p className="text-[16px] text-gray-600">Valid forever</p>
                  </div>
                  
                </div>
                
              </div>}
            </div>
          </div>
          <div className="bg-blue-200 w-full h-[25%] flex justify-around hover:cursor-pointer">
            <div className="flex flex-col">
              <p className="font-bold text-[18px] my-2">Services</p>
              <p>Video Summarization</p>
              <p>Abstractive Summary</p>
              <p>Extractive Summary</p>
              <p>Key Points Generation</p>
              <p>Text Extractor</p>
              <p>Spelling Mender</p>
            </div>
            <div className="">
              <p className="font-bold text-[18px] my-2">Products</p>
              <p>Website</p>
              <p>Premium Version</p>
              <p>Free Version</p>
              <p>Chrome Extension</p>
            </div>
            <div className="">
              <p className="font-bold text-[18px] my-2">Conect with us</p>
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
      </div>
      {namemodal && <div>
    <div className="bg-gray-400 opacity-40 h-full w-full absolute top-0 left-0 " ></div>
    <div className="bg-transparent h-full w-full absolute top-0 left-0 flex justify-center items-center" >
    <div className=" w-[90%] h-[30%] md:w-[50%] lg:w-[20%] px-6 bg-white shadow-2xl rounded-2xl flex flex-col justify-center items-center  z-[1000]" > 
        <div className="w-full flex justify-end"><RxCross2 className="h-8 w-8 hover:cursor-pointer hover:w-10" onClick={()=>setnamemodal(false)}></RxCross2></div>
        <div className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]"> Account</div> 
        <div className="font-serif text-md lg:text-lg font-bold text-[#2f9c5e] mt-5">Enter New UserName</div>
        <TextField
              margin="normal"
              label="UserName"
              variant="outlined"
              fullWidth
              size="small"
              // error={editname == ""}
              // helperText={!validemail && "Please enter valid Username"}
              onChange={(e) => {
                seteditname(e.target.value)
              }
            }
            />
        <button
                className="bg-[#14af4f] h-10 text-white rounded-xl w-[150px] hover:bg-[#32dd66] text-xl mt-5"
                onClick={updateusername}
              >
                Confirm
              </button>
        </div>
    </div>
    </div>}
    {passmodal && <div>
    <div className="bg-gray-400 opacity-40 h-full w-full absolute top-0 left-0 " ></div>
    <div className="bg-transparent h-full w-full absolute top-0 left-0 flex justify-center items-center" >
    <div className=" w-[90%] h-[30%] md:w-[50%] lg:w-[23%] px-6 bg-white shadow-2xl rounded-2xl flex flex-col justify-center items-center  z-[1000]" > 
        <div className="w-full flex justify-end"><RxCross2 className="h-8 w-8 hover:cursor-pointer hover:w-10" onClick={()=>setpassmodal(false)}></RxCross2></div>
        <div className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]"> Change Password</div> 
        <div className="font-serif text-md lg:text-lg font-bold text-[#2f9c5e] mt-5">Enter New Password</div>
        <TextField
              margin="dense"
              label="Password"
              type={visible ? "text" : "password"}
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => {
                        setvisible(!visible);
                      }}
                    >
                      {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!validpassword}
              helperText={
                !validpassword && "Password can't be less than 5 characters"
              }
              onChange={(e) => {
                seteditpass(e.target.value);
                // setvalidpassword(true);
                // seteerror(false)
              }}
            />
        <button
                className="bg-[#14af4f] h-10 text-white rounded-xl w-[150px] hover:bg-[#32dd66] text-xl mt-5"
                onClick={()=>{setpassmodal(false);changepassword()}}
              >
                Confirm
              </button>
        </div>
    </div>
    </div>}
    
    <LoadingModal state={loading}></LoadingModal>
    </div>
  );
}

{
  /* <button onClick={()=>{ctx.logout();signOut({ callbackUrl: 'http://localhost:3000/auth' })}}> logout social</button> */
}

{
  /* <div>this is Dashboard</div>
      <div> username: {ctx.useremail} </div>
      <button onClick={ctx.logout}>logout</button>
      <button onClick={ch}>login</button><br></br>
      <button onClick={()=>localStorage.setItem('username',123123)}>change</button>
      <br></br>
      <button onClick={()=>localStorage.setItem('username',123123)}>change</button>
      <button onClick={()=>{ctx.logout();signOut({ callbackUrl: 'http://localhost:3000/auth' })}}> logout social</button>
      <Loadingmodal state={false}></Loadingmodal> */
}
