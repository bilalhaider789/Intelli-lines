import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
export default function Auth() {
  const [visible, setvisible] = useState(false);
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
            
            <img src="/images/logobg.png" className="h-[25%] mb-[10px] sm:block lg:hidden "></img>
            
            <div className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]">
              Welcome Back
            </div>
            <div className="mt-[2%]">Sign In to your account</div>
            <div className="flex flex-row justify-evenly mt-[2%] ">
              <div className="border-4 rounded-full mx-4">
                <IconButton>
                  <img src="/images/google.png" className="h-[30px]"></img>
                </IconButton>
              </div>
              <div className="border-4 rounded-full mx-4">
                <IconButton>
                  <img
                    src="/images/facebook.png"
                    className="h-[30px]"
                  ></img>
                </IconButton>
              </div>
            </div>
            <div className="mt-[2%]">Use your Email for Signing In</div>
            <div className="px-[15%] lg:px-[20%] mt-[2%]">
              <div className="max-w-sm">
                <TextField
                  margin="normal"
                  required
                  label="Email Address"
                  autoComplete="email"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
                <TextField
                  margin="normal"
                  required
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
                />
                <div className="flex justify-end text-red-600 hover:font-bold">
                  <button>Forgot Password ?</button>
                </div>
              </div>

              <div className="w-full flex justify-center mt-[5%]">
                <button className="bg-[#2f9c5e] h-10 text-white rounded-xl w-[150px] hover:bg-[#32dd66] text-xl">
                  LOG IN
                </button>
              </div>
              <div className="mt-[5%] flex justify-center">
                <div>Don't have an account?</div>
                <button className="ml-2 text-[#327FD0] font-bold hover:text-green-600">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// linear-gradient(90deg, rgba(50,116,221,1) 1%, rgba(17,200,72,1) 100%)
// #F5F5F5
