import { useState, useEffect, useContext, useDebugValue } from "react";

import { MdSettingsBackupRestore } from "react-icons/md";

import { RxCross2 } from "react-icons/rx";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import IconButton from '@mui/material/IconButton';
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";

export default function Profile(props){

    const session = props.session
    const [username,setusername]=useState("")
  const [useremail,setuseremail]=useState("")
  const [box, setbox]= useState(true);
  
  const [namemodal,setnamemodal]=useState(false)
  const [editname,seteditname]= useState("")
  const [passmodal,setpassmodal]=useState(false)
  const [editpass,seteditpass]= useState("")
  const [visible,setvisible]=useState(false)

  useEffect(()=>{
    setuseremail(localStorage.getItem("email"))
    setusername(localStorage.getItem("username"))
  })

  const changepassword=async()=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_NODE}changepass`, {
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


    return(
        <div
          className="lg:col-span-full  mt-4 flex flex-col flex-grow"
        >
          <div className="bg-white w-full flex flex-grow">
            <div className="flex items-center justify-center flex-col md:flex-row  w-full">
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
                    <p className={ box? "mr-12 hover:cursor-pointer font-semibold": "mr-12 hover:cursor-pointer "} onClick={()=>setbox(true)}>Profile</p>
                    <p className={ !box? "mr-12 hover:cursor-pointer font-semibold": "mr-12 hover:cursor-pointer "} onClick={()=>setbox(false)}>Your Plan</p>
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
          </div>
          <div className="bg-blue-200 w-full  pb-3 flex justify-around hover:cursor-pointer">
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
                      {visible ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                seteditpass(e.target.value);
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
        </div>
    )
}