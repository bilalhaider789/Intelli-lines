import { AiOutlineArrowLeft } from "react-icons/ai";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { useState, useContext } from "react";
import { MessageModal } from "../others/MessageModal";
import { SuccessModal } from "../others/SuccessModal";

import Switch from "@mui/material/Switch";

export default function EditUser(props) {
  const [name, setname] = useState(props.user.name);
  const [visible, setvisible] = useState(false);
  const [cvisible, setcvisible] = useState(false);
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [error, seterror] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.user.package);
  const [message, setmessage] = useState("");
  const [successmodal, setsuccessmodal] = useState(false);
  const [selected, setselected] = useState(false);
  const user = props.user;

  const EditUserFunction=async()=>{
    if (selected){
      if (name.length < 4){
        seterror(true)
        setmessage("Name can't be smaller than 4 characters")
        return
      }
      if(password.length<6){
        seterror(true)
        setmessage("Password can't be less than 6 characters")
        return
      }
      if(password!=cpassword){
        seterror(true)
        setmessage("Password and Confirm Password must be same")
        return
      }
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_NODE}admin/edituser`, {
          method: "POST",
          body: JSON.stringify({ name, email:user.email, password, package: selectedOption, selected }),
          headers: { "Content-Type": 'application/json' },
        });
        const data = await response.json();
        if(data.success==true){
          console.log(data)
          setsuccessmodal(true)
        }
        if (data.success==false){
          seterror(true)
          setmessage("User of this email already exists, Try with some other Email")
        }
      }
      catch(e){
        console.log(e)
      }
    }
    else{
      if (name.length < 4){
        seterror(true)
        setmessage("Name can't be smaller than 4 characters")
        return
      }
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_NODE}admin/edituser`, {
          method: "POST",
          body: JSON.stringify({ name, email:user.email, package: selectedOption, selected }),
          headers: { "Content-Type": 'application/json' },
        });
        const data = await response.json();
        if(data.success==true){
          console.log(data)
          setsuccessmodal(true)
        }
        if (data.success==false){
          seterror(true)
          setmessage("Can't update User. Try Again Later")
        }
      }
      catch(e){
        console.log(e)
      }
    }
  }

  return (
    <div>
      <div className="w-full h-full ">
        <div className="flex border-2 h-20 text-[20px] font-semibold items-center">
          <div className="border-r-2 mx-4 pr-4">
            <AiOutlineArrowLeft
              className="text-black bg-white w-10 h-10"
              onClick={() => props.changescreen("allusers")}
            />
          </div>
          <div className="text-[22px] font-semibold">
            Enter Details for Edit User
          </div>
        </div>
        <div className="flex w-full mt-10 justify-center items-center">
          <div className=" border-2 border-gray-200 rounded-lg shadow-2xl w-[80%]">
            <div className="flex w-full justify-evenly p-10">
              <div>
                <div>
                  <div className="mt-4 font-semibold text-[26px] mb-10">
                    Personal Details :
                  </div>

                  <div className="mt-8">
                    <div className="text-xl font-semibold">
                      User's Email Address:
                    </div>
                    <div className="text-xl font-semibold text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <div className="text-xl font-semibold mt-8">
                    Edit User Name:
                  </div>
                  <TextField
                    className="w-96"
                    margin="normal"
                    label="Username"
                    autoComplete="normal"
                    variant="outlined"
                    fullWidth
                    size="small"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    value={name}
                  />
                </div>

                <div className="mt-6 text-xl">
                  <div className=" font-semibold">Select User Package :</div>

                  <div className="flex mt-4 cursor-pointer">
                    <div
                      className={`p-2 border-2 border-gray-300 w-28 flex justify-center rounded-l-xl hover:bg-green-400 hover:text-white ${
                        selectedOption == "free" ? "bg-green-400" : ""
                      }`}
                      onClick={() => setSelectedOption("free")}
                    >
                      Basic
                    </div>
                    <div
                      className={`p-2 border-2 border-gray-300 w-28 flex justify-center hover:bg-green-400 hover:text-white ${
                        selectedOption == "Silver" ? "bg-green-400" : ""
                      }`}
                      onClick={() => setSelectedOption("Silver")}
                    >
                      Silver
                    </div>
                    <div
                      className={`p-2 border-2 border-gray-300 w-28 flex justify-center  rounded-r-xl hover:bg-green-400 hover:text-white ${
                        selectedOption == "Gold" ? "bg-green-400" : ""
                      }`}
                      onClick={() => setSelectedOption("Gold")}
                    >
                      Gold
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className=" mt-24">
                    <div className=" text-lg font-semibold">
                      <div className="flex">
                        <div className="mr-8">Want to Change Password?</div>
                        <Switch
                          color="warning"
                          checked={selected}
                          onChange={(e) => setselected(e.target.checked)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </div>
                      <div className={selected?"cursor-pointer":"cursor-not-allowed"}>
                      <div className="text-xl font-semibold mt-12">Enter New Password:</div>
                      {!selected? <div className="border-2 border-gray-200 text-gray-500 rounded-sm w-96 px-4 py-1 mt-4 mb-2"> Password</div>:
                      <TextField
                        className="w-96"
                        margin="normal"
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
                          setpassword(e.target.value);
                        }}
                      />}
                    
                  
                    <div className="text-xl font-semibold mt-8">
                      Confirm New Password:
                    </div>
                    {!selected? <div className="border-2 border-gray-200 text-gray-500 rounded-sm w-96 px-4 py-1 mt-2"> Password</div>:
                    <TextField
                      className="w-96"
                      margin="dense"
                      label="Confirm Password"
                      type={cvisible ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={(e) => {
                                setcvisible(!cvisible);
                              }}
                            >
                              {cvisible ? (
                                <MdVisibilityOff />
                              ) : (
                                <MdVisibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setcpassword(e.target.value);
                      }}
                    />}
                  </div>
                  </div></div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center cursor-pointer">
              <div
                className="text-lg font-semibold border-2 py-4 px-8 mb-8 rounded-2xl bg-green-500 text-white"
                onClick={() => EditUserFunction()}
              >
                Edit User
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <MessageModal message={message} onsubmit={seterror}/>}
      {successmodal && <SuccessModal message="User Successfully Updated" button="Okay" onsubmit={(e)=>props.changescreen()} />}
    
    </div>
  );
}
