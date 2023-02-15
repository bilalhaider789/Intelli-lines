
import { useState, useEffect,useContext } from "react";
import Login from "../../components/auth/login";
import Signup from "../../components/auth/signup";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Authcontext from "../../components/contexts/authcontext";
import LoadingModal from "../../components/others/LoadingModal";

export default function Auth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logintype, setlogintype] = useState(true);
  const [loading,setloading]=useState(false)
  const ctx= useContext(Authcontext)
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      router.replace("/dashboard");
    }
    // if (status === "authenticated") {
    
    //   setloading(true)
  
    // }
  
    
  }, []);

  const sociallogin= async()=>{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NODE}social`, {
        method: "PATCH",
        body: JSON.stringify({
          email: session.user.email,
          name: session.user.name,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data)
      if (data.success==true){
        ctx.login(data);
        console.log("abc");
        router.replace("/dashboard");
      }
    } catch (e) {
      console.log("error")
    }
  }

  if (status === "authenticated") {
    
    sociallogin();

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

            {logintype ? <Login /> : <Signup />}
            <div className="mt-[5%] flex justify-center">
              {logintype ? (
                <div>Don't have an account?</div>
              ) : (
                <div>Already have an account?</div>
              )}
              <button
                className="ml-2 text-[#327FD0] font-bold hover:text-green-600"
                onClick={(e) => {
                  setlogintype(!logintype);
                }}
              >
                {logintype ? <div>Sign Up</div> : <div>Sign In</div>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <LoadingModal state={loading}></LoadingModal>
    </div>
  );
}

// linear-gradient(90deg, rgba(50,116,221,1) 1%, rgba(17,200,72,1) 100%)
// #F5F5F5
