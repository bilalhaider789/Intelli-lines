
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  useEffect(()=>{
    router.replace("/auth");
  }, [])
  
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-[50px] font-semibold">
      Loading ...
    </div>
  );
}
export default Home;