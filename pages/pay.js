import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

export default function Pay() {

    const key="pk_test_51MnlBxJcmIhVRf5doaOP4WWXJ6a4ff8ID8b0MF2UAfhIK8ETqrOtdCW25Kba2wQihx6Qu17T3CorYEXINurk3CaP00apHemX7U"

    const [stripetoken, setstripetoken]=useState(null)
    const ontoken=async(token)=>{
        // setstripetoken(token)
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODE}api/checkout/payment`, {
                method: "POST",
                body: JSON.stringify({tokenId:token.id, amount: 2000 }),
                headers: { "Content-Type": 'application/json' },
              })
            console.log(12312)
            const data = await res.json();
            console.log(data)
        }
        catch(e){
            console.log(e)
        }
    }
    // useEffect(()=>{
    //     const makerequest = async()=>{
    //         try{
    //             const res = await fetch(`${process.env.NEXT_PUBLIC_NODE}api/checkout/payment`, {
    //                 method: "POST",
    //                 body: JSON.stringify({tokenId:stripetoken.id, amount: 2000 }),
    //                 headers: { "Content-Type": 'application/json' },
    //               })
    //             console.log(12312)
    //             console.log(res.data)
    //         }
    //         catch(e){
    //             console.log(e)
    //         }
    //     }
    // },[stripetoken])

  return (
    <div className="rounded-xl p-2 bg-slate-500 w-16 text-center">
      <StripeCheckout 
      name="Intelli-Lines" 
      image="/images/logo.png"
      description="Total 10 dolar " 
      amount={1000}
      token={ontoken}
      stripeKey={key}
      >
        <div>Bilal</div>
      </StripeCheckout>
      {/* <div onClick={()=>onsubmit(222222)}>Haider</div> */}
    </div>
  );
}
