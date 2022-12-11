import TextField from "@material-ui/core/TextField";
import { useRef, useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import LoadingModal from "../../components/others/LoadingModal";
import { Modal } from "../../components/modal";

export default function Auth() {
  const router = useRouter();
  const [loading,setloading]=useState(false)
  const [cmodal, setcmodal]=useState(false)
  const [otp,setotp]=useState(null)
  const [eerror,seteerror]=useState(false);
  const [screen, setscreen] = useState("forget");
  const [dig1,setdig1]=useState("");
  const [dig2,setdig2]=useState("");
  const [dig3,setdig3]=useState("");
  const [dig4,setdig4]=useState("")
  const [email, setemail] = useState("");
  const [validemail, setvalidemail] = useState(true);
  const regEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
  
  
  const onSubmit = async(event) => {
    event.preventDefault();
    regEmail.test(email) ? setvalidemail(true) : setvalidemail(false);
    if (regEmail.test(email)) {
      console.log("Ready to Login");
      try{
      setloading(true)
      const response = await fetch("http://localhost:5000/forget", {
        method: "POST",
        body: JSON.stringify({email}),
        headers: { "Content-Type": 'application/json' },
      });
      const data = await response.json();
      setloading(false)
      console.log(data);
      if(data.success==true){
        setscreen("otp")
        setotp(data.otp)
      }
      if(data.success==false){
        seteerror(true)
      }
    }catch(e){
      setloading(false)
       setcmodal(true)
    }
    } else {
      console.log("Invalid Data");
    }
  };


  const verifyOtp=(event)=>{
    event.preventDefault();
    console.log((dig1+dig2+dig3+dig4)==otp)
    if((dig1+dig2+dig3+dig4)==otp){
      Router.replace({pathname: "/auth/resetpass", query: {email}})
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
          <div className="lg:col-span-1 sm:col-span-2 flex flex-col justify-center items-center  lg:bg-white rounded-tr-xl rounded-br-xl px-[10%]">
            <img
              src="/images/logobg.png"
              className="h-[25%] mb-[10px] sm:block lg:hidden "
            ></img>
            {screen === "forget" ? (
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]">
                  Password Reset
                </h1>
                <div className="font-serif text-xm lg:text-md text-[grey] text-center mt-5">
                  Enter your email, and we’ll send you verifivation code to
                  reset your password.
                </div>
                <div className="w-full px-[10%]">
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
                    {eerror && <div className="text-center text-red-600">*Account of this Email doesn't exists*</div>}
                    <div className="w-full flex justify-center mt-[5%]">
                      <button
                        className="bg-[#14af4f] h-10 text-white rounded-xl w-[120px] hover:bg-[#32dd66] text-xl"
                        type="submit"
                      >
                        Send Code
                      </button>
                    </div>
                  </form>
                </div>

                <button
                  className=" text-[#327FD0]  hover:text-green-600 mt-[3%] underline"
                  onClick={(e) => router.replace("/auth")}
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <div></div>
            )}
            {screen == "otp" ? (
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-serif text-2xl lg:text-4xl font-bold text-[#2f9c5e]">
                  Verify Account
                </h1>
                <div className="font-serif text-xm lg:text-md text-[grey] text-center mt-5 ">
                  Enter verfication code that you received on your email
                </div>
                <form onSubmit={verifyOtp}>
                  <div className="flex justify-center mt-5 flex-row-reverse">
                    <input
                      autocomplete="off"
                      type="text"
                      id="4"
                      maxLength="1"
                      className="bg-[#eef2f3] h-14 w-14 text-2xl border-none rounded-md text-center mx-1"
                      onKeyUp={(e) => {document.getElementById("4").blur();setdig4(e.target.value)}}
                    ></input>
                    <input
                    autocomplete="off"
                      type="text"
                      id="3"
                      maxLength="1"
                      className="bg-[#eef2f3] h-14 w-14 text-2xl border-none rounded-md text-center mx-1"
                      onKeyUp={(e) => {focusevent("3", "4");setdig3(e.target.value)}}
                    ></input>
                    <input
                    autocomplete="off"
                      type="text"
                      id="2"
                      maxLength="1"
                      className="bg-[#eef2f3] h-14 w-14 text-2xl border-none rounded-md text-center mx-1"
                      onKeyUp={(e) => {focusevent("2", "3");setdig2(e.target.value)}}
                    ></input>
                    <input
                    autocomplete="off"
                      type="text"
                      id="1"
                      maxLength="1"
                      className="bg-[#eef2f3] h-14 w-14 text-2xl border-none rounded-md text-center mx-1"
                      onKeyUp={(e) => {focusevent("1", "2");setdig1(e.target.value)}}
                    ></input>
                  </div>
                  <div className="flex justify-end w-full pr-5">
                    <button className=" text-[#327FD0]  hover:text-green-600 mt-[3%] underline" onClick={onSubmit}>
                      Resend Code
                    </button>
                  </div>
                  <div className="w-full flex justify-center mt-[5%]">
                    <button className="bg-[#2f9c5e] h-10 text-white rounded-xl w-[120px] hover:bg-[#11A683] text-xl" type="submit">
                      Verify
                    </button>
                  </div>
                </form>

                <button
                  className=" text-[#327FD0]  hover:text-green-600 mt-[3%] underline"
                  onClick={(e) => router.replace("/auth")}
                >
                  <div>Back to Sign In</div>
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <LoadingModal state={loading}></LoadingModal>
      {cmodal && <Modal onsubmit={setcmodal}>
        
        </Modal>}
    </div>
  );
}

function focusevent(fid, did) {
  if (document.getElementById(fid).value != "") {
    document.getElementById(did).focus();
  }
}
