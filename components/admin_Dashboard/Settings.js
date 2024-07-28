import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { ConfirmationModal } from "../others/ConfirmationModal";
import { useEffect } from "react";
import LoadingModal from "../others/LoadingModal";

import TextField from '@mui/material/TextField';
import { RxCross2 } from "react-icons/rx";

import InputAdornment from '@mui/material/InputAdornment';
import { MdSettingsBackupRestore } from "react-icons/md";

import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { MessageModal } from "../others/MessageModal";

import { useRouter } from "next/router";
export default function Settings(props) {
  
  
  const router = useRouter()
  const [passmodal,setpassmodal]=useState(false)
  const [editpass,seteditpass]= useState("")
  const [visible,setvisible]=useState(false)
  const [loading,setloading]=useState(false)
  const [adminname, setadminname] = useState("");
  const [adminemail, setadminemail] = useState("");
  const [newname, setnewname]=useState("")
  const [namemodal, setnamemodal]=useState(false)
  const [newemail, setnewemail]=useState("")
  const [emailmodal, setemailmodal]=useState(false)
  const [error, seterror]=useState(false)

  useEffect(() => {

    setadminemail(localStorage.getItem("adminemail"));
    setadminname(localStorage.getItem("adminname"));
    
  },[]);

  const changepassword=async()=>{
    try{
        setloading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_NODE}admin/changepass`, {
        method: "POST",
        body: JSON.stringify({ email: adminemail, password: editpass }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setloading(false)
    }catch(e){

    }
  }

  const changeusername=async()=>{
    try{
        setloading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_NODE}admin/changename`, {
        method: "POST",
        body: JSON.stringify({ email: adminemail, name: newname }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setloading(false)
      if (data.success==true){
        localStorage.setItem("adminname",data.name)
        setadminname(data.name)
        props.onchange(data.name)
      }
    }catch(e){

    }
  }

  const changeuseremail=async()=>{
    try{
        setloading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_NODE}admin/changeemail`, {
        method: "POST",
        body: JSON.stringify({ email: adminemail, newemail: newemail }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setloading(false)
      if (data.success==true){
        localStorage.setItem("adminemail",data.email)
        setadminemail(data.email)
      }
      else{
        seterror(true)
        console.log(data.mess)

      }
    }catch(e){

    }
  }

  const logout=()=>{
    setloading(true)
    localStorage.removeItem("adminname")
    localStorage.removeItem("adminemail")
    localStorage.removeItem("usertype")
    router.replace({pathname :"/admin/login"})
  }

  return (
    <div className="w-full h-full ">
      <div className="flex border-2 h-20 text-[20px] font-semibold items-center">
        <div className="border-r-2 mx-4 pr-4">
          {/* <AiOutlineArrowLeft
            className="text-black bg-white w-10 h-10"
            onClick={() => props.allusers()}
          /> */}
        </div>
        <div className="text-[22px] font-semibold">
          Personal Accounts Settings
        </div>
      </div>
      <div className="flex w-full mt-10 justify-center items-center">
        <div className="pl-12 pt-6 border-2 border-gray-200 rounded-lg shadow-2xl w-[80%]  h-96">
          <div className=" text-2xl font-semibold">Account Details:</div>
          <div className="flex mt-12 text-xl  w-full justify-center">
            <div className="flex flex-col gap-3">
              <div className="flex">
                <div className=" font-semibold mr-2">Name :</div> {adminname}
              </div>
              <div className="flex">
                <div className=" font-semibold mr-2">Email :</div>{adminemail}
              </div>
              <div className="flex">
                <div className=" font-semibold mr-2">Account Type :</div> Admin
              </div>
            </div>
            <div className="flex flex-col gap-3 ml-14 font-semibold cursor-pointer " >
              <div className="flex hover:text-green-600" onClick={()=>setnamemodal(true)}>
                Change name{" "}
                <MdSettingsBackupRestore className="w-8 h-6 ml-2  text-green-600" />
              </div>
              <div className="flex hover:text-green-600" onClick={()=>setemailmodal(true)}>
                Change email{" "}
                <MdSettingsBackupRestore className="w-8 h-6 ml-2  text-green-600" />
              </div>
              <div className="flex hover:text-green-600" onClick={()=>setpassmodal(true)}>
                Change password{" "}
                <MdSettingsBackupRestore className="w-8 h-6 ml-2  text-green-600" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-8">
            <div
              className="py-2 px-4 hover:bg-green-600 rounded-2xl text-white bg-[#34bd32] font-normal cursor-pointer mr-12 flex gap-2"
              onClick={() => {
                  logout()
              }}
            >
              Logout
              <FiLogOut className=" font-bold w-6 h-6" />
            </div>
          </div>
        </div>
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
    {namemodal && <div>
    <div className="bg-gray-400 opacity-40 h-full w-full absolute top-0 left-0 " ></div>
    <div className="bg-transparent h-full w-full absolute top-0 left-0 flex justify-center items-center" >
    <div className=" w-[90%] h-[30%] md:w-[50%] lg:w-[23%] px-6 bg-white shadow-2xl rounded-2xl flex flex-col justify-center items-center  z-[1000]" > 
        <div className="w-full flex justify-end"><RxCross2 className="h-8 w-8 hover:cursor-pointer hover:w-10" onClick={()=>setnamemodal(false)}></RxCross2></div>
        <div className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]"> Change Name</div> 
        <div className="font-serif text-md lg:text-lg font-bold text-[#2f9c5e] mt-5">Enter New Admin Name</div>
        <TextField
              margin="dense"
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              onChange={(e) => {
                setnewname(e.target.value);
              }}
            />
        <button
                className="bg-[#14af4f] h-10 text-white rounded-xl w-[150px] hover:bg-[#32dd66] text-xl mt-5"
                onClick={()=>{setnamemodal(false);changeusername()}}
              >
                Confirm
              </button>
        </div>
    </div>
    </div>}
    {emailmodal && <div>
    <div className="bg-gray-400 opacity-40 h-full w-full absolute top-0 left-0 " ></div>
    <div className="bg-transparent h-full w-full absolute top-0 left-0 flex justify-center items-center" >
    <div className=" w-[90%] h-[30%] md:w-[50%] lg:w-[23%] px-6 bg-white shadow-2xl rounded-2xl flex flex-col justify-center items-center  z-[1000]" > 
        <div className="w-full flex justify-end"><RxCross2 className="h-8 w-8 hover:cursor-pointer hover:w-10" onClick={()=>setemailmodal(false)}></RxCross2></div>
        <div className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]"> Change Email</div> 
        <div className="font-serif text-md lg:text-lg font-bold text-[#2f9c5e] mt-5">Enter New Admin Email</div>
        <TextField
              margin="dense"
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              onChange={(e) => {
                setnewemail(e.target.value);
              }}
            />
        <button
                className="bg-[#14af4f] h-10 text-white rounded-xl w-[150px] hover:bg-[#32dd66] text-xl mt-5"
                onClick={()=>{setemailmodal(false);changeuseremail()}}
              >
                Confirm
              </button>
        </div>
    </div>
    </div>}
    <LoadingModal state={loading}></LoadingModal>
    {error && <MessageModal message="Account of this Email Already Exists." onsubmit={seterror} />}
      </div>
    </div>
  );
}
