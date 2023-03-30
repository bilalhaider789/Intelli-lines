import { Box, Slider } from "@mui/material";
import { useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import { GoCloudUpload } from "react-icons/go";
import { MdOutlineSummarize, MdSummarize } from "react-icons/md";
import LoadingModal from "../others/LoadingModal";
import Inputslider from "./inputslider";

import { MessageModal } from "../others/MessageModal";

export default function VideoSummarizer() {
  const [videourl, setvideourl] = useState("");
  const [uploadtype, setuploadtype] = useState("");
  const [vfile, setvfile] = useState("");
  const [youtubelink, setyoutubelink] = useState("");
  const [language, setlanguage] = useState("eng");
  const [rlanguage, setrlanguage] = useState("eng");
  const [sumtype, setsumtype] = useState("key");
  const [rsumtype, setrsumtype]=useState("key");
  const [resulttype, setresultype] = useState("sum");
  const [sumRatio, setsumRatio]= useState(20)
  const [script,setscript]=useState("")
  const [result, setresult]=useState("")
  const [keywords, setkeywords]=useState([])
  const [points, setpoints]=useState([])
  const [loading,setloading]=useState(false)
  const [errormess, seterrormess]=useState("")
  const [error, seterror]=useState(false)
  const [stats, setstats]=useState([0,0])

  const handleChange = (event) => {
    try {
      // Get the uploaded file
      const file = event.target.files[0];

      // Transform file into blob URL
      setvfile(URL.createObjectURL(file));
      setuploadtype("local");
      setyoutubelink("");
      setvideourl("");
    } catch (error) {
      console.error(error);
    }
  };
  const linkhandler = () => {
    if (videourl != "") {
      var ytcode = videourl.split("=")[1].split("&")[0];
      setyoutubelink("https://www.youtube.com/embed/" + ytcode);
      setuploadtype("youtube");
      setvfile("");
    }
  };

  const changeRatio = (e) => {
    setsumRatio(e)
  };


  const youtubesum=async()=>{
    setloading(true)
    try{
      var ytcode = videourl.split("=")[1].split("&")[0];
    const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK}video_sum` , {
        method: "POST",
        body: JSON.stringify({"code": ytcode, "sumRatio": sumRatio, "sumtype":sumtype, "language": language }),
        headers: { "Content-Type": 'application/json' },
      })
    const data = await response.json();
    if(data.success =="1"){
    setscript(data.script)
    // setresult(data.summary)
    setkeywords(JSON.parse(data.keywords))
    console.log(JSON.parse(data.keywords))
    console.log(typeof(JSON.parse(data.keywords)))
    setrlanguage(language)
    setrsumtype(sumtype)
    if (sumtype=="key"){
      const summary=data.summary
      let p_summary=[]
      if (language=="eng"){
        p_summary= summary.split(/[.]/)}
      else {
        p_summary= summary.split(/[۔]/)
      }
      setpoints(p_summary)
      setloading(false)
      let demostats= [0,0]
      demostats[0]=data.summary.split(/[.?!۔]+/).length
      demostats[1]=data.summary.split(/\s+/).filter((word) => word !== "").length
      setstats(demostats)
    }
    else{
      let demostats= [0,0]
      setresult(data.summary)
      demostats[0]=data.summary.split(/[.?!۔]+/).length
      demostats[1]=data.summary.split(/\s+/).filter((word) => word !== "").length
      setstats(demostats)
      setloading(false)
    }
  }
  else{
    console.log(data.message)
    seterror(true)
    seterrormess(data.message)
    setloading(false)
  }
  }
    catch(e){
      console.log(e)
      setloading(false)
    }
    
  }

  return (
    <div className="bg-blue-100 h-full w-full flex justify-center items-center font-['Poppins']">
      <div className="bg-white h-[95%] w-[90%] shadow-2xl rounded-lg">
        <div className="flex items-center justify-between px-8 py-4 border-b-2 flex-col lg:flex-row">
          <div className="text-[30px] font-['Poppins'] font-semibold">
            Video Sumamrizer
          </div>
         
          <div className="flex flex-row border-2 rounded-2xl px-4 items-center">
            <div> Select Summary Length</div>
            
            <div className="px-2">5%</div>
            <span className="mt-2 mr-2">
              <Inputslider changevalue={changeRatio}></Inputslider>
            </span>
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
                {/* <div className="w-full text-center text-[20px] text-gray-500">
                  or
                </div>

                <div className="border-dashed border-4 rounded-2xl p-6 mt-4 mb-8 bg-[#F3F9FF] border-[#6B7280]">
                  <div
                    className=" border-2 rounded-xl p-2 border-gray-400 hover:cursor-pointer hover:bg-[#F3F4F6] flex flex-col items-center shadow-2xl"
                    onClick={() => {
                      document.getElementById("in").click();
                    }}
                  >
                    <GoCloudUpload className="w-24 h-14 text-gray-700" />
                    <p className="font-[poppins] text-[18px]">Upload Video</p>
                  </div>
                </div> */}
              </div>
            )}
            {uploadtype == "youtube" && (
              <div className="flex justify-center my-6">
                <iframe width={450} height={250} src={youtubelink}></iframe>
              </div>
            )}
            {uploadtype == "local" && (
              <div>
                <div className="w-[450px] h-[250px] my-6">
                  <video src={vfile} controls className="w-[450px] h-[250px]">
                    This video cant' run
                  </video>
                </div>
              </div>
            )}
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
                    sumtype == "para"
                      ? { backgroundColor: "gray", color: "white" }
                      : {}
                  }
                  onClick={(e) => {
                    setsumtype("para");
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
              { (uploadtype == "youtube" ||
                uploadtype == "local") && (
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
              {/* <div
                className="border-4 rounded-2xl px-2 py-1 flex items-center hover:cursor-pointer hover:bg-[#38f034]"
                onClick={() => {}}
              >
                {" "}
                <GoCloudUpload className="w-10 h-7 text-gray-500" />
                Extract Script
              </div> */}
              <div className="border-4 rounded-2xl px-2 py-1 flex items-center hover:cursor-pointer hover:bg-[#38f034]  text-xl" onClick={()=>{uploadtype=="youtube"? youtubesum(): console.log("local function ")}}>
                {" "}
                <MdOutlineSummarize className="w-10 h-7 text-gray-500" />{" "}
                Summarize
              </div>
            </div>
            <div className="flex flex-wrap mt-4 w-full px-4 gap-y-2 cursor-pointer">
              <p className=" pl-2 mx-2 text-[18px] font-semibold text-green-700">Keywords:</p>
              {
                keywords.map(item => <p className="border-2 rounded-2xl px-2 py-1 mx-2 border-black  font-urdu ">
                {item}
              </p>)
              }
            </div>
          </div>
          <div className="h-full w-full flex flex-col items-center">
            {/* <div className="w-[80%] flex flex-col  font-semibold">
              <p className="ml-4 my-4">
                Extracted Clean Audio of Provided Video :
              </p>
              <audio
                controls
                src="/audio/a1.mp3"
                className=" text-green-500 w-full"
              />
            </div> */}
            <div className=" w-[95%] h-[530px] mt-4 border-2 rounded-xl">
              <div className=" flex ml-4 text-[18px] cursor-pointer">
                <p
                  className="mr-4 pr-4 border-r-2 "
                  style={
                    resulttype == "sum"
                      ? { fontWeight: "bold", textDecoration: "underline" }
                      : {}
                  }
                  onClick={() => {
                    setresultype("sum");
                  }}
                >
                  Summary
                </p>
                <p
                  onClick={() => {
                    setresultype("script");
                  }}
                  style={
                    resulttype == "script"
                      ? { fontWeight: "bold", textDecoration: "underline" }
                      : {}
                  }
                >
                  Script
                </p>
              </div>
              {(resulttype == "sum" && rlanguage=="eng" && rsumtype=="key") && (
                <div className="w-full h-[500px] overflow-auto px-4 py-4 text-justify">
                  {points.map(item => item!="" && <p> ◉ {item}.</p>)}
                </div>
              )}
              {(resulttype == "sum" && rlanguage=="eng" && rsumtype=="para") && (
                <div className="w-full h-[500px] overflow-auto px-4 py-4 text-justify">
                  <p> {result}</p>
                </div>
              )}
              {(resulttype == "sum" && rlanguage=="ur" && rsumtype=="key") && (
                <div className="w-full h-[500px] overflow-auto px-4 py-4 text-right font-urdu">
                  {points.map(item => item != "" && <p>  {item} ◉</p>)}
                </div>
              )}
              {(resulttype == "sum" && rlanguage=="ur" && rsumtype=="para") && (
                <div className="w-full h-[500px] overflow-auto px-4 py-4 text-right font-urdu">
                  <p> {result}</p>
                </div>
              )}
              {resulttype == "script" && (
                <div className="w-full h-[500px] overflow-auto px-4 py-4 text-justify">
                  {script}
                </div>
              )}
              <div className="flex justify-between mt-2 items-center">
                <div className="font-semibold mt-2 ml-2">
                  {" "}
                  {stats[0]} Sentences. {stats[1]} words
                </div>
                <div className="flex">
                  
                  <p className="border-2 rounded-2xl px-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white" >Save</p>
                  <p className="border-2 rounded-2xl px-2 mx-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white">Download in PDF</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="">
            <video src={vfile} controls>
              This video cant' run
            </video>
          </div> */}
        </div>
        <LoadingModal state={loading}/>
      </div>
      {error && <MessageModal message={errormess} onsubmit={seterror} ></MessageModal>

      }
    </div>
  );
}
