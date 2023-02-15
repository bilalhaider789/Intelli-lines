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
  const [resulttype, setresultype] = useState("sum");
  const [sumRatio, setsumRatio]= useState(20)

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
                <div className="w-full text-center text-[20px] text-gray-500">
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
                </div>
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
              <div className="border-4 rounded-2xl px-2 py-1 flex items-center hover:cursor-pointer hover:bg-[#38f034]  text-xl">
                {" "}
                <MdOutlineSummarize className="w-10 h-7 text-gray-500" />{" "}
                Summarize
              </div>
            </div>
            <div className="flex flex-wrap mt-4 w-full px-4 gap-y-2 cursor-pointer">
              <p className=" pl-2 mx-2 text-[18px] font-semibold text-green-700">Keywords:</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">imran</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">khan</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">Keywords:</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">imran</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">khan</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">Keywords:</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">imran</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">khan</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">Keywords:</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">imran</p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">khan</p>
            </div>
          </div>
          <div className="h-full w-full flex flex-col items-center">
            <div className="w-[80%] flex flex-col  font-semibold">
              <p className="ml-4 my-4">
                Extracted Clean Audio of Provided Video :
              </p>
              <audio
                controls
                src="/audio/a1.mp3"
                className=" text-green-500 w-full"
              />
            </div>
            <div className=" w-[95%] h-[430px] mt-4 border-2 rounded-xl">
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
              {resulttype == "sum" && (
                <div className="w-full h-[400px] overflow-auto px-4 py-4">
                  Born to a Niazi Pashtun family in Lahore, Khan graduated from
                  Keble College, University of Oxford, England, in 1975. He
                  began his international cricket career at age 18, in a 1971
                  Test series against England. Khan played until 1992, served as
                  the team's captain intermittently between 1982 and 1992,[5]
                  and won the 1992 Cricket World Cup, in what is Pakistan's
                  first and only victory in the competition. Considered one of
                  cricket's greatest all-rounders,[6][7] Khan scored 3,807 runs
                  and took 362 wickets in Test cricket and was inducted into the
                  ICC Cricket Hall of Fame. Khan founded cancer hospitals in
                  Lahore and Peshawar,[8] and Namal College in Mianwali,[9][10]
                  prior to entering politics.[11][12] Founding the PTI in 1996,
                  Khan won a seat in the National Assembly in the 2002 general
                  election, serving as an opposition member from Mianwali until
                  2007. PTI boycotted the 2008 general election and became the
                  second-largest party by popular vote in the 2013 general
                  election.[13][14] In the 2018 general election, running on a
                  populist platform, PTI became the largest party in the
                  National Assembly, and formed a coalition government with
                  independents with Khan as Prime Minister. As Prime Minister,
                  Khan addressed a balance of payments crisis with bailouts from
                  the International Monetary Fund.[15] He presided over a
                  shrinking current account deficit,[16][17] and limited defence
                  spending to curtail the fiscal deficit, leading to some
                  general economic growth.[18][19][20] He enacted policies that
                  increased tax collection,[21][22] and investment.[23] His
                  government committed to a renewable energy transition,
                  launched the Ehsaas Programme and the Plant for Pakistan
                  initiative, and expanded the protected areas of Pakistan. He
                  presided over the COVID-19 pandemic, which caused economic
                  turmoil and rising inflation in the country, and threatened
                  his political position.[24] Despite a promised anti-corruption
                  campaign, the perception of corruption in Pakistan worsened
                  during Khan's time in office.[25] He was accused of political
                  victimisation of opponents and clamping down on freedom of
                  expression and dissent.[26]
                </div>
              )}
              {resulttype == "script" && (
                <div className="w-full h-[400px] overflow-auto px-4 py-4">
                  This is scrtigdsgds
                </div>
              )}
              <div className="flex justify-between mt-2 items-center">
                <div className="font-semibold mt-2 ml-2">
                  {" "}
                  2 Sentences. 50 words
                </div>
                <div className="flex">
                  
                  <p className="border-2 rounded-2xl px-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white">Download in PDF</p>
                  <p className="border-2 rounded-2xl px-2 mx-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white">Download in Word</p>
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
      </div>
    </div>
  );
}
