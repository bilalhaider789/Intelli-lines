import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useState,useContext } from "react";
import LoadingModal from "../../components/others/LoadingModal";
import { useRouter } from "next/router";
import { Modal } from "../../components/modal";
import Authcontext from "../../components/contexts/authcontext";

export default function ResetPass() {
  const router = useRouter();
  const { email } = router.query;
  const [cmodal, setcmodal] = useState(false);
  const [loading, setloading] = useState(false);
  const [eerror, seteerror] = useState(false);
  const [visible, setvisible] = useState(false);
  const [password, setpassword] = useState("");
  const [validpassword, setvalidpassword] = useState(true);
  const [cvisible, setcvisible] = useState(false);
  const [cpassword, setcpassword] = useState("");
  const ctx= useContext(Authcontext);

  const onSubmit = async (event) => {
    event.preventDefault();
    password.length > 5 ? setvalidpassword(true) : setvalidpassword(false);
    password === cpassword ? seteerror(false) : seteerror(true);
    if (password.length > 5 && password === cpassword) {
      try{
      setloading(true);
      console.log(123)
      const response = await fetch("http://localhost:5000/resetpass", {
        method: "PATCH",
        body: JSON.stringify({ email: email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      
      if (data.success == true) {
        ctx.login(data);
        router.replace("/dashboard")
      }
      else{
        setloading(false);
      }
    }catch(e){
      setloading(false);
      setcmodal(true)
    }
    }
  };

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
                Password Reset
              </div>

              <div className="mt-[2%] ">Please Enter Your New Password</div>

              <div className="mt-[2%]">
                {eerror && (
                  <div className="text-red-600 mb-[2%]">
                    *Enter Same Password in both fields*
                  </div>
                )}
                <div className="max-w-sm px-[8%]">
                  <form onSubmit={onSubmit}>
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
                              {visible ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
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
                    <TextField
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
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setcpassword(e.target.value);
                        seteerror(false);
                      }}
                    />
                    <div className="w-full flex justify-center mt-[5%]">
                      <button
                        className="bg-[#2f9c5e] h-10 text-white rounded-xl w-[150px] hover:bg-[#32dd66] text-xl"
                        onClick={(e) => console.log()}
                        type="submit"
                      >
                        Reset
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
    </div>
  );
}

// linear-gradient(90deg, rgba(50,116,221,1) 1%, rgba(17,200,72,1) 100%)
// #F5F5F5
