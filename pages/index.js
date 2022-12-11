import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { Modal } from "../components/modal";
import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";

export default function Home() {
  const[view,setview]=useState(true)
  const maintail= " md:bg-blue-300 sm:bg-blue-600 bg-slate-600";

  return (
    <div>
      
      <div>
        <div className={maintail}>
          <div className="w-full py-16 text-white px-4">
            <div className="max-w-[1240px] mx-auto grid lg:grid-cols-4">
              <div className="lg:col-span-3 my-4 ">
                <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2" >
                  Want to learn latest I.T skills?
                </h1>
                <p>Sign up to our newsletter and stay up to date.</p>
              </div>
              <div className="lg:col-span-1 my-4">
                <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                  <input
                    className="p-3 flex w-full rounded-md text-black"
                    type="email"
                    placeholder="Enter Email"
                  />
                  <Button variant="outlined" color="primary">
                    Primary
                  </Button>
                </div>
                <p>
                  We care bout the protection of your data. Read our{" "}
                  <span className="text-black">Privacy Policy.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-blue-400  h-64  flex-row justify-between  px-32 grid lg:grid-cols-3">
          <div className=" bg-red-100 lg:col-span-2">
            <div className="flex justify-center">
              <div>
                <div className="text-white text-4xl mb-3">
                  Want to learn IT sills{" "}
                </div>
                <div className="text-white text-xl">SIgn in to our app </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between bg-green-400 lg:col-1">
            <div>bilal haider</div>
            <div>comsats</div>
            <Button
              variant="contained"
              style={{ color: "white", background: "black", width: 150 }}
            >
              Contained
            </Button>
            <Slider
              defaultValue={50}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-8 bg-slate-600  h-52">
          <div className="lg:col-span-2 bg-red-400 h-52">
            <div className="grid lg:grid-cols-2  h-52">
              <div className="lg:col-span-1 bg-red-600 h-52"></div>
            </div>
          </div>
        </div>
        <div className="bg-transparent h-full w-full absolute top-0 left-0 flex items-center justify-center">
          <div className="h-[100px] bg-black w-52 text-white  " onClick={(e)=>setview(true)}>
            i am in center
          </div>
        </div>
        Index page
      </div>
      {view && <Modal onsubmit={setview}>
        
        </Modal>}
    </div>
  );
}
