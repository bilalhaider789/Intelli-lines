import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useState,useEffect,useContext } from "react";
import { useRouter } from "next/router";
import React from "react";
import LoadingModal from "../others/LoadingModal";
import { Modal } from "../modal";
import {signIn} from "next-auth/react"
import Authcontext from "../contexts/authcontext"

export default function Login() {
  const router = useRouter()
  const [cmodal, setcmodal]=useState(false)
  const [loading,setloading]=useState(false)
  const [eerror, seteerror]=useState(false);
  const [visible, setvisible] = useState(false);
  const [email, setemail] = useState("");
  const [validemail, setvalidemail] = useState(true);
  const [password, setpassword] = useState("");
  const [validpassword, setvalidpassword] = useState(true);
  const regEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
  const ctx= useContext(Authcontext)
  
  


  const onSubmit = async (event) => {
    event.preventDefault();
    regEmail.test(email) ? setvalidemail(true) : setvalidemail(false);
    password.length > 5 ? setvalidpassword(true) : setvalidpassword(false);
    if (regEmail.test(email) && password.length > 5) {
        try{
        console.log("Ready to Login");
        setloading(true)
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          body: JSON.stringify({email, password }),
          headers: { "Content-Type": 'application/json' },
        });
        const data = await response.json();
        
        if(data.success==true){
          ctx.login(data);
          router.replace({pathname :"/dashboard"})
        }
        if(data.success==false){
          setloading(false)
          seteerror(true)
        }
        console.log(data);
      } 
      catch(e){
          setloading(false)
          setcmodal(true)
      }
    }
    else {
      console.log("Invalid Data");
    }
  };

  async function HandleGoogleSignIn(){
    setloading(true)
    signIn('google')
}
async function HandleFBSignIn(){
  setloading(true)  
  signIn('facebook')
}
async function HandleGitSignIn(){
  setloading(true)  
  signIn('github')
}




  return (
    <div className="flex flex-col justify-center text-center">
      <div className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]">
        Welcome Back
      </div>
      <div className="mt-[2%]">Sign In to your account</div>
      <div className="flex flex-row justify-center mt-[2%] ">
        <div className="border-4 rounded-full mx-4">
          <IconButton onClick={HandleGoogleSignIn}>
            <img src="/images/google.png" className="h-[30px]"></img>
          </IconButton>
        </div>
        <div className="border-4 rounded-full mx-4">
          <IconButton onClick={HandleFBSignIn}>
            <img src="/images/facebook.png" className="h-[30px]"></img>
          </IconButton>
        </div>
        <div className="border-4 rounded-full mx-4">
          <IconButton onClick={HandleGitSignIn}>
            <img src="/images/github.png" className="h-[30px]"></img>
          </IconButton>
        </div>
      </div>
      <div className="mt-[2%] ">Use your Email for Signing In</div>
      
      <div className=" px-[8%] mt-[2%]">
      {eerror && <div className="text-red-600">*Invalid Credentials*</div>}
        <div className="max-w-sm">
          <form onSubmit={onSubmit}>
            <TextField
              margin="normal"
              label="Email Address"
              autoComplete="email"
              variant="outlined"
              fullWidth
              size="small"
              error={!validemail}
              helperText={!validemail && "Please enter valid email"}
              onChange={(e) => {
                setemail(e.target.value), setvalidemail(true); seteerror(false)
              }}
            />
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
                setpassword(e.target.value);
                setvalidpassword(true);
                seteerror(false)
              }}
            />
            <div className="flex justify-end text-red-600 hover:text-green-700">
              <button onClick={(e) => router.push("/auth/forget")}>
                Forgot Password ?
              </button>
            </div>
            <div className="w-full flex justify-center mt-[5%]">
              <button
                className="bg-[#2f9c5e] h-10 text-white rounded-xl w-[150px] hover:bg-[#32dd66] text-xl"
                onClick={(e) => console.log()}
                type="submit"
              >
                LOG IN
              </button>
            </div>
          </form>
        </div>
      </div>
      <LoadingModal state={loading}></LoadingModal>
      {cmodal && <Modal onsubmit={setcmodal}>
        
        </Modal>}
    </div>
  );
}

// linear-gradient(90deg, rgba(50,116,221,1) 1%, rgba(17,200,72,1) 100%)
// #F5F5F5
