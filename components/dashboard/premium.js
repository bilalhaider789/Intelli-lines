import { useEffect } from "react";
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { ConfirmationModal } from "../others/ConfirmationModal";
import LoadingModal from "../others/LoadingModal";
import { MessageModal } from "../others/MessageModal";

const key =
  "pk_test_51MnlBxJcmIhVRf5doaOP4WWXJ6a4ff8ID8b0MF2UAfhIK8ETqrOtdCW25Kba2wQihx6Qu17T3CorYEXINurk3CaP00apHemX7U";

export default function Premium() {
  const [value, setvalue] = useState(null);
  const [cancelbutton, setcancelbutton] = useState(true);
  const [activatedPackage, setactivatedPackage] = useState("");
  const [userid, setuserid]=useState("")
  const [username, setusername]=useState("")
  const [email, setemail]=useState("")
  const [loading,setloading]=useState(false)
  const [errormess, seterrormess]=useState("")
  const [error, seterror]=useState(false)
  const [packageexpiry,setpackageexpiry]=useState("")
  const [confirmation,setconfirmation]=useState(false)

  useEffect(()=>{
    setuserid(localStorage.getItem("userid"))
    setusername(localStorage.getItem("username"))
    setemail(localStorage.getItem("email"))
    setpackageexpiry(localStorage.getItem("userexpiry"))
    setactivatedPackage(localStorage.getItem("userpackage"))
  })

  const ontokengold = async (token) => {
    try {
      setloading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE}payment/subscribe`,
        {
          method: "POST",
          body: JSON.stringify({ tokenId: token.id, amount: 2000, userid: userid, username: username, packagename: "Gold", packageprice: "20", email: email  }),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(12312);
      const data = await res.json();
      console.log(data);
      localStorage.setItem("userpackage",data.packagename)
      localStorage.setItem("userexpiry",data.expiry)
      setactivatedPackage("Gold")
      setpackageexpiry(data.expiry)
      seterror(false)
      setloading(false)

    } catch (e) {
      setloading(false)
      seterror(true)
      seterrormess("Cant subscribe Package Due to server Error")
      console.log(e);
    }
  };
  const ontokensilver = async (token) => {
    try {
      setloading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE}payment/subscribe`,
        {
          method: "POST",
          body: JSON.stringify({ tokenId: token.id, amount: 1000, userid: userid, username: username, packagename: "Silver", packageprice: "10", email: email }),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(12312);
      const data = await res.json();
      console.log(data);
      localStorage.setItem("userpackage",data.packagename)
      localStorage.setItem("userexpiry",data.expiry)
      setactivatedPackage("Silver")
      setpackageexpiry(data.expiry)
      setloading(false)
    } catch (e) {
      seterror(true)
      seterrormess("Can't subscribe Package Due to server Error")
      setloading(false)
      console.log(e);
    }
  };

  const cancelSubscription= async()=>{
    setconfirmation(false)
    try {
      setloading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE}payment/cancel`,
        {
          method: "POST",
          body: JSON.stringify({ email: email }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success=="1"){
      localStorage.setItem("userpackage","free")
      activatedPackage("free")}
      setloading(false)
    } catch (e) {
      setloading(false)
      console.log(e);
    }
  }
  return (
    <div className="bg-blue-100 h-full w-full flex justify-center items-center font-['Poppins']">
      <div className="bg-white h-[95%] w-[90%] shadow-2xl rounded-lg">
        <div className="flex items-center justify-between px-8 py-4 border-b-2 flex-col lg:flex-row font-semibold text-[20px]">
          <div></div>
          <div className="ml-48">Pay For Your Package</div>
          {activatedPackage == "Silver" || activatedPackage=="Gold" ? (
            <div className="bg-red-500 text-white p-2 rounded-xl font-thin text-[16px] cursor-pointer shadow-xl" onClick={()=>setconfirmation(true)}>
              {" "}
              Cancel Subscription
            </div>
          ) : (
            <div className="w-48"></div>
          )}
        </div>
        <div className="flex justify-center gap-20 items-center pt-12 w-full">
          <div className="flex flex-col h-[500px] w-[300px] bg-blue-100 rounded-2xl shadow-2xl">
            <div className="w-full h-16 bg-green-400 rounded-t-2xl text-center font-semibold text-[22px] pt-4">
              {" "}
              Basic
            </div>
            <div className="mx-2 mt-10">
              <div className="flex">
                <div className="text-[24px] mt-2">✔️</div>
                <div className="ml-2 text-[18px]">
                  {" "}
                  Video Summarization of upto 30 Minutes Video
                </div>
              </div>
              <div className="flex mt-6">
                <div className="text-[24px] mt-2">✔️</div>
                <div className="ml-2 text-[18px]">
                  {" "}
                  Text Summarization of upto 1000 Words
                </div>
              </div>
              <div className="flex mt-6">
                <div className="text-[24px] mt-2">✔️</div>
                <div className="ml-2 text-[18px]">
                  {" "}
                  Scan upto 3 Pages Using OCR
                </div>
              </div>
              <div className="flex mt-6 items-center">
                <div className="text-[24px]">❌</div>
                <div className="ml-2 text-[18px] "> Urdu Language Support</div>
              </div>
              <div className="text-[20px] p-2 rounded-lg border-black bg-slate-400 text-center m-8 cursor-pointer">
                Free
              </div>
            </div>
          </div>
          <div className="flex flex-col h-[500px] w-[300px] bg-blue-100 rounded-2xl shadow-2xl">
            <div className="w-full h-16 bg-gray-300 rounded-t-2xl text-center font-semibold text-[22px] pt-4">
              {" "}
              Silver
            </div>
            <div className="mx-2 mt-10">
              <div className="flex">
                <div className="text-[24px] mt-2">✔️</div>
                <div className="ml-2 text-[18px]">
                  {" "}
                  Video Summarization of upto 1 hour Video
                </div>
              </div>
              <div className="flex mt-6">
                <div className="text-[24px] mt-2">✔️</div>
                <div className="ml-2 text-[18px]">
                  {" "}
                  Text Summarization of upto 2000 Words
                </div>
              </div>
              <div className="flex mt-6">
                <div className="text-[24px] mt-2">✔️</div>
                <div className="ml-2 text-[18px]">
                  {" "}
                  Scan upto 10 Pages Using OCR
                </div>
              </div>
              <div className="flex mt-6 items-center">
                <div className="text-[24px]">❌</div>
                <div className="ml-2 text-[18px] "> Urdu Language Support</div>
              </div>
              {activatedPackage == "Silver" ? (
                <div
                  className="text-[20px] p-2 rounded-lg border-black bg-orange-400 text-center mx-8 mt-8 cursor-pointer"
                >
                  ✔️ Subscribed
                </div>
              ) : (
                <StripeCheckout
                  name="Intelli-Lines"
                  image="/images/logo.png"
                  description="You are buying Silver Package "
                  amount={1000}
                  token={ontokensilver}
                  stripeKey={key}
                >
                  <div
                    className="text-[20px] p-2 rounded-lg border-black bg-slate-400 text-center mx-8 mt-8 cursor-pointer"
                    onClick={() => setvalue(2000)}
                  >
                    Buy For only 10$
                  </div>
                </StripeCheckout>
              )}

              {activatedPackage == "Silver" && <div className="text-center text-red-600 mt-2">
                Expires on {packageexpiry}
              </div>}
            </div>
          </div>
          <div className="flex flex-col h-[500px] w-[300px] bg-blue-100 rounded-2xl shadow-2xl">
            <div className="w-full h-16 bg-yellow-500 rounded-t-2xl text-center font-semibold text-[22px] pt-4">
              {" "}
              Gold
            </div>
            <div className="mx-2 mt-10">
              <div className="flex">
                <div className="text-[24px] mt-2">✔️</div>
                <div className="ml-2 text-[18px]">
                  {" "}
                  Video Summarization of upto 2 hour Video
                </div>
              </div>
              <div className="flex mt-6">
                <div className="text-[24px] mt-2">✔️</div>
                <div className="ml-2 text-[18px]">
                  {" "}
                  Text Summarization of upto 5000 Words
                </div>
              </div>
              <div className="flex mt-6">
                <div className="text-[24px] mt-2">✔️</div>
                <div className="ml-2 text-[18px]">
                  {" "}
                  Scan upto 20 Pages Using OCR
                </div>
              </div>
              <div className="flex mt-6 items-center">
                <div className="text-[24px]">✔️</div>
                <div className="ml-2 text-[18px] "> Urdu Language Support</div>
              </div>
              {activatedPackage == "Gold" ? (
                <div
                  className="text-[20px] p-2 rounded-lg border-black bg-orange-400 text-center mx-8 mt-8 cursor-pointer"
                >
                  ✔️ Subscribed
                </div>
              ) :  <StripeCheckout
                name="Intelli-Lines"
                image="/images/logo.png"
                description="You are buying Gold Package "
                amount={2000}
                token={ontokengold}
                stripeKey={key}
              >
                <div
                  className="text-[20px] p-2 rounded-lg border-black bg-slate-400 text-center m-8 cursor-pointer"
                  onClick={() => setvalue(2000)}
                >
                  Buy For only 20$
                </div>
              </StripeCheckout>}
              {activatedPackage == "Gold" && <div className="text-center text-red-600 mt-2">
                Expires on {packageexpiry}
              </div>}
            </div>
          </div>
      <LoadingModal state={loading}></LoadingModal>
      {error && <MessageModal message={errormess} onsubmit={seterror} ></MessageModal>

      }
      {confirmation && <ConfirmationModal message={"Are you Sure You want to cancel Subscription. No amount will be refunded"} onsubmit={()=>cancelSubscription()} oncancel={setconfirmation}></ConfirmationModal>}

        </div>
      </div>
    </div>
  );
}
