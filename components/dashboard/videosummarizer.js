import { Box, Slider } from "@mui/material";
import { useState } from "react";
import { GoCloudUpload } from "react-icons/go";
import { MdOutlineSummarize, MdSummarize } from "react-icons/md";
import Inputslider from "./inputslider";

export default function VideoSummarizer() {
  const [videourl, setvideourl] = useState("");
  const [uploadtype, setuploadtype] = useState("");
  const [vfile, setvfile] = useState("");
  const [youtubelink, setyoutubelink] = useState("");
  const [language, setlanguage] = useState("eng");
  const [sumtype, setsumtype] = useState("key");

  const handleChange = (event) => {
    try {
      // Get the uploaded file
      const file = event.target.files[0];

      // Transform file into blob URL
      setvfile(URL.createObjectURL(file));
      setuploadtype("local");
      setyoutubelink("");
      setvideourl("")
    } catch (error) {
      console.error(error);
    }
  };
  const linkhandler = () => {
    var ytcode = videourl.split("=")[1].split("&")[0];
    setyoutubelink("https://www.youtube.com/embed/" + ytcode);
    setuploadtype("youtube");
    setvfile("");
  };

  const localhandler = () => {};

  return (
    <div className="bg-blue-100 h-full w-full flex justify-center items-center font-['Poppins']">
      <div className="bg-white h-[90%] w-[90%] shadow-2xl rounded-lg">
        <div className="flex items-center justify-between px-8 py-4 border-b-2 flex-col lg:flex-row">
          <div className="text-[30px] font-['Poppins'] font-semibold">
            Video Sumamrizer
          </div>
          {/* <div className="flex text-[18px] py-4 lg:py-0 ">
                  <div className="border-2 w-28 text-center border-slate-500 hover:cursor-pointer bg-gray-500 text-[white] rounded-l-xl">
                    Key Points
                  </div>
                  <div className="border-2 w-28 text-center border-slate-500 rounded-r-xl hover:cursor-pointer">
                    Paragraph
                  </div>
                </div>
                <div className="flex text-[18px] py-4 lg:py-0 ">
                  <div className="border-2 w-28 text-center border-slate-500 hover:cursor-pointer bg-gray-500 text-[white] rounded-l-xl">
                    English
                  </div>
                  <div className="border-2 w-28 text-center border-slate-500 rounded-r-xl hover:cursor-pointer">
                    Urdu
                  </div>
                </div> */}
          <div className="flex flex-row border-2 rounded-2xl px-4 items-center">
            <div> Select Summary Length</div>
            <div className="pl-2">5%</div>
            {/* <input type="range" /> */}
            {/* <span>  
              <Slider
                      className="w-40 text-[green]"
                      aria-label="Temperature"
                      defaultValue={30}
                      valueLabelDisplay="auto"
                      step={5}
                      min={5}
                      max={80}
                      onChange={(e)=>console.log(e.target.value)}
                    />
            </span> */}
            {/* <Inputslider/> */}
            <div> 80%</div>
          </div>
        </div>

        <div className="w-full grid lg:grid-cols-2">
          <div className=" pl-4 border-r-2 flex flex-col items-center ">
            <div className="">
              <div className=" font-semibold mt-2">Enter YouTube Video URL</div>
              <div className="flex items-center">
                <input
                  type={"text"}
                  className=" border-2 w-96 h-10 px-4 bg-slate-100 rounded-l-lg my-4"
                  placeholder="YouTube Link"
                  onChange={(e) => {
                    setvideourl(e.target.value);
                  }}
                  value={videourl}
                ></input>
                <div
                  className="border-2 h-10 flex items-center text-white bg-slate-500 rounded-r-lg p-2 hover:cursor-pointer hover:bg-[#38f034]"
                  onClick={linkhandler}
                >
                  Fetch
                </div>
              </div>
            </div>
            {uploadtype == "" && (
              <div>
                <div className="w-full text-center text-[20px] text-gray-500">
                  or
                </div>

                <div className=" border-2 rounded-xl p-2 border-gray-400 hover:cursor-pointer mb-10 mt-4 hover:bg-[#F3F4F6]" onClick={() => {
                    document.getElementById("in").click();
                  }} >
                  <GoCloudUpload className="w-24 h-14 text-gray-500" />
                  <p className="font-[poppins] text-[18px]">Upload Video</p>
                </div>
              </div>
            )}
            {uploadtype == "youtube" && (
              <div className="flex justify-center my-6">
                <iframe width={450} height={250} src={youtubelink}></iframe>
              </div>
            )}
            {
              uploadtype =="local" && (
                <div>
                    <div className="w-[450px] h-[250px] my-6">
            <video src={vfile} controls>
              This video cant' run
            </video>
          </div>
                </div>
              )
            }
            <div className="flex justify-evenly w-full px-[10%]">
              <div className="flex text-[18px] py-4 lg:py-0 ">
                <div
                  className="border-2 w-28 text-center border-slate-500 hover:cursor-pointer   rounded-l-xl"
                  style={
                    sumtype == "key"
                      ? { backgroundColor: "gray", color: "white" }
                      : {}
                  }
                  onClick={(e) => {
                    setsumtype("key");
                  }}
                >
                  Key Points
                </div>

                <div
                  className="border-2 w-28 text-center border-slate-500 hover:cursor-pointer   rounded-r-xl"
                  style={
                    sumtype == "sum"
                      ? { backgroundColor: "gray", color: "white" }
                      : {}
                  }
                  onClick={(e) => {
                    setsumtype("sum");
                  }}
                >
                  Paragraph
                </div>
              </div>
              <div className="flex text-[18px] py-4 lg:py-0 ">
                <div
                  className="border-2 w-28 text-center border-slate-500 hover:cursor-pointer rounded-l-xl"
                  style={
                    language == "eng"
                      ? { backgroundColor: "gray", color: "white" }
                      : {}
                  }
                  onClick={(e) => {
                    setlanguage("eng");
                  }}
                >
                  English
                </div>
                <div
                  className="border-2 w-28 text-center border-slate-500 hover:cursor-pointer rounded-r-xl"
                  style={
                    language == "ur"
                      ? { backgroundColor: "gray", color: "white" }
                      : {}
                  }
                  onClick={(e) => {
                    setlanguage("ur");
                  }}
                >
                  Urdu
                </div>
              </div>
            </div>
            <div className="flex justify-evenly items-center w-full px-[10%] mt-4">
              <input
                id="in"
                type="file"
                accept=".mp4"
                onChange={handleChange}
                className="hidden"
              />
              {uploadtype == "youtube" && (
                <div
                  className="border-4 rounded-2xl px-2 py-1 flex items-center hover:cursor-pointer hover:bg-[#38f034]"
                  onClick={() => {
                    document.getElementById("in").click();
                  }}
                >
                  {" "}
                  <GoCloudUpload className="w-10 h-7 text-gray-500" />
                  Upload Video
                </div>
              )}
              <div
                className="border-4 rounded-2xl px-2 py-1 flex items-center hover:cursor-pointer hover:bg-[#38f034]"
                onClick={() => {}}
              >
                {" "}
                <GoCloudUpload className="w-10 h-7 text-gray-500" />
                Extract Script
              </div>
              <div className="border-4 rounded-2xl px-2 py-1 flex items-center hover:cursor-pointer hover:bg-[#38f034]  text-xl">
                {" "}
                <MdOutlineSummarize className="w-10 h-7 text-gray-500" />{" "}
                Summarize
              </div>
            </div>
          </div>

          {/* <div className="">
            <video src={vfile} controls>
              This video cant' run
            </video>
          </div> */}
        </div>
      </div>
    </div>
  );
}
