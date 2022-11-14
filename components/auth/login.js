import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
export default function Login() {
  const router = useRouter();
  const [visible, setvisible] = useState(false);
  const [email, setemail] = useState("");
  const [validemail, setvalidemail] = useState(true);
  const [password, setpassword] = useState("");
  const [validpassword, setvalidpassword] = useState(true);
  const regEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

  const onSubmit = (event) => {
    event.preventDefault();
    regEmail.test(email) ? setvalidemail(true) : setvalidemail(false);
    password.length > 5 ? setvalidpassword(true) : setvalidpassword(false);
    if (regEmail.test(email) && password.length > 5) {
      console.log("Ready to Login");
    }
    else{
      console.log("Invalid Data")
    }
  };
  return (
    <div className="flex flex-col justify-center text-center">
      <div className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]">
        Welcome Back
      </div>
      <div className="mt-[2%]">Sign In to your account</div>
      <div className="flex flex-row justify-center mt-[2%] ">
        <div className="border-4 rounded-full mx-4">
          <IconButton>
            <img src="/images/google.png" className="h-[30px]"></img>
          </IconButton>
        </div>
        <div className="border-4 rounded-full mx-4">
          <IconButton>
            <img src="/images/facebook.png" className="h-[30px]"></img>
          </IconButton>
        </div>
      </div>
      <div className="mt-[2%] ">Use your Email for Signing In</div>
      <div className=" px-[8%] mt-[2%]">
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
    </div>
  );
}

// linear-gradient(90deg, rgba(50,116,221,1) 1%, rgba(17,200,72,1) 100%)
// #F5F5F5
