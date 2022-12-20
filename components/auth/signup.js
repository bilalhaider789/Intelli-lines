import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { useState,useContext } from "react";
import { useRouter } from "next/router";
import LoadingModal from "../others/LoadingModal";
import { Modal } from "../modal";
import Authcontext from "../contexts/authcontext"

export default function Signup() {
  const router= useRouter()
  const [loading,setloading]=useState(false)
  const [cmodal, setcmodal]=useState(false)
  const [eerror, seteerror]=useState(false);
  const [visible, setvisible] = useState(false);
  const [name, setname] = useState("");
  const [validname, setvalidname] = useState(true);
  const [email, setemail] = useState("");
  const [validemail, setvalidemail] = useState(true);
  const [password, setpassword] = useState("");
  const [validpassword, setvalidpassword] = useState(true);
  const regEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
  const ctx= useContext(Authcontext)

  const onSubmit = async(event) => {
    event.preventDefault();
    regEmail.test(email) ? setvalidemail(true) : setvalidemail(false);
    password.length > 5 ? setvalidpassword(true) : setvalidpassword(false);
    name.length > 0 ? setvalidname(true) : setvalidname(false);
    if (regEmail.test(email) && password.length > 5 && name.length > 0) {
      console.log("Ready to Login");
      setloading(true)
      try{
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": 'application/json' },
      });
      const data = await response.json();
      
      if(data.success==true){
        ctx.login(data)
        router.replace("/dashboard")
      }
      if(data.success==false){
        setloading(false)
        seteerror(true)
      }
      console.log(data);
    }catch(e){
      setloading(false)
          setcmodal(true)
    }
    } else {
      console.log("Invalid Data");
    }
  };

  async function HandleGoogleSignIn(){
    signIn('google')
}
async function HandleFBSignIn(){
    signIn('facebook')
}
async function HandleGitSignIn(){
    signIn('github')
}

  return (
    <div className="flex flex-col text-center">
      <div className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]">
        Create Account
      </div>
      <div className="flex flex-row justify-center mt-[5%] ">
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
      <div className="mt-[2%]">Use your Email for Registration</div>
      <div className="px-[8%] ">
        <div className="max-w-sm mt-5">
          <form onSubmit={onSubmit}>
            <TextField
            margin="dense"
              label="Name"
              autoComplete="name"
              variant="outlined"
              fullWidth
              size="small"
              error={!validname}
              helperText={!validname && "Please enter name"}
              onChange={(e) => {
                setname(e.target.value), setvalidname(true);
              }}
            />
            <TextField
            margin="dense"
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
                      {visible ? <MdVisibilityOff /> : <MdVisibility />}
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
              }}
            />
            {eerror && <div className="text-red-600">*User of this email already exists*</div>}
            <div className="w-full flex justify-center mt-[5%]">
              <button
                className="bg-[#2f9c5e] h-10 text-white rounded-xl w-[150px] hover:bg-[#32dd66] text-xl"
                type="submit"
              >
                SIGN UP
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
