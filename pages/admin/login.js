
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { useState,useEffect,useContext } from "react";
import { useRouter } from "next/router";
import React from "react";
import LoadingModal from '../../components/others/LoadingModal';
import { Modal } from '../../components/modal';



export default function login() {

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
  
  
  const onSubmit = async (event) => {
    console.log(123)
    event.preventDefault();
    
    regEmail.test(email) ? setvalidemail(true) : setvalidemail(false);
    password.length > 5 ? setvalidpassword(true) : setvalidpassword(false);
    if (regEmail.test(email) && password.length > 5) {
        console.log("ready for login")

        try{
          setloading(true)
          
          const response = await fetch(`${process.env.NEXT_PUBLIC_NODE}admin/login`, {
            method: "POST",
            body: JSON.stringify({email, password }),
            headers: { "Content-Type": 'application/json' },
          });
          const data = await response.json();
          
          if(data.success==true){
            router.replace({pathname :"/admin/dashboard"})
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
    else{

    }
}


  return (
    <div>
      <div
        className="w-screen h-screen lg:block hidden"
        style={{
          background: `linear-gradient(90deg, rgba(50,221,102,1) 0%, rgba(50,181,147,1) 53%, rgba(50,116,221,1) 100%)`,
        }}
      ></div>
      <div className="bg-transparent h-full w-full absolute top-0 left-0 flex items-center justify-center ">
        <div className="h-full w-full lg:h-4/5 bg-white lg:w-[65%] lg:rounded-2xl  grid lg:grid-cols-2 ">
          <div className=" rounded-tl-xl rounded-bl-xl lg:flex flex-col justify-center items-center lg:col-span-1 border-r-2 hidden bg-white">
            <img src="/images/logobg.png" className="h-[35%]   "></img>
            <p className="text-2xl pt-10 px-[20%] text-center font-serif font-bold text-[#2f9c5e]">
              An Intelligent Tool For Video & Text Summarization
            </p>
          </div>
          <div className="lg:col-span-1 sm:col-span-2 flex flex-col md:justify-center  pt-[5%] items-center bg-[#F5F5F5] lg:bg-white rounded-tr-xl rounded-br-xl">
            <img
              src="/images/logobg.png"
              className="h-[25%] mb-[10px] sm:block lg:hidden "
            ></img>

            <div className="flex flex-col justify-center text-center">
              <div className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]">
                Welcome To Admin Login
              </div>
              
              <div className="mt-[6%] ">Use your Email for Signing In</div>

              <div className=" px-[8%] mt-[2%]">
                {eerror && (
                  <div className="text-red-600">*Invalid Credentials*</div>
                )}
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
                        setemail(e.target.value), setvalidemail(true);
                        seteerror(false);
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
                        !validpassword &&
                        "Password can't be less than 5 characters"
                      }
                      onChange={(e) => {
                        setpassword(e.target.value);
                        setvalidpassword(true);
                        seteerror(false);
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
              {cmodal && <Modal onsubmit={setcmodal}></Modal>}
            </div>
          </div>
        </div>
      </div>
      {/* <LoadingModal state={loading}></LoadingModal> */}
    </div>
  );
}
