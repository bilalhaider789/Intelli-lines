import { IconButton, Slider } from "@mui/material";
import { useState } from "react";
import { MdDeleteOutline, MdOutlineSummarize } from "react-icons/md";
import Inputslider from "./inputslider";
export default function TextSummarizer() {
  const [sumtype, setsumtype] = useState("key");
  const [content, setcontent] = useState();
  const [language, setlanguage] = useState("en");
  const [resulttype, setresultype] = useState("generate");
  const [sumRatio, setsumRatio] = useState(20);
  const [generated_result, setgenerated_result] = useState();
  const [resultlang, setresultlang] = useState("en");
  const [resultui, setresultui] = useState("para");
  const mistakes = [
    {
      wrong: "owerride",
      correct: "override",
    },
    {
      wrong: "hood",
      correct: "hide",
    },
    {
      wrong: "correcdsftion",
      correct: "correction",
    },
    {
      wrong: "owerride",
      correct: "override",
    },
    {
      wrong: "hood",
      correct: "hide",
    },
    {
      wrong: "correcdsftion",
      correct: "correction",
    },
    {
      wrong: "owerride",
      correct: "override",
    },
    {
      wrong: "hood",
      correct: "hide",
    },
    {
      wrong: "correcdsftion",
      correct: "correction",
    },
  ];
  const list = ["a", "b", "c"];

  const changeRatio = (e) => {
    setsumRatio(e);
  };

  const generate = async () => {
    setgenerated_result("");
    setresultype("generate");
    console.log(sumRatio / 100);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK}text_summary`,
        {
          method: "POST",
          body: JSON.stringify({ sumtype, sumRatio, language, content }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data.success);
      if (data.success == "1") {
        setresultui(data.type)
        if (data.type =="para"){
          setgenerated_result(data.sum);
        }
        if (data.type=="key")
          setgenerated_result((data.sum))
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-blue-100 h-full w-full flex justify-center items-center font-['Poppins']">
      <div className="bg-white h-[95%] w-[90%] shadow-2xl rounded-lg">
        <div className="flex items-center justify-between px-8 py-4 border-b-2 flex-col lg:flex-row">
          <div className="text-[30px] font-['Poppins'] font-semibold">
            Text Sumamrizer
          </div>
          <div className="flex text-[16px] pl-24 ">
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
              className="border-y-2 w-28 text-center border-slate-500 hover:cursor-pointer "
              style={
                sumtype == "abstractive"
                  ? { backgroundColor: "gray", color: "white" }
                  : {}
              }
              onClick={(e) => {
                setsumtype("abstractive");
              }}
            >
              Abstractive
            </div>

            <div
              className="border-2 w-28 text-center border-slate-500 hover:cursor-pointer   rounded-r-xl"
              style={
                sumtype == "extractive"
                  ? { backgroundColor: "gray", color: "white" }
                  : {}
              }
              onClick={(e) => {
                setsumtype("extractive");
              }}
            >
              Extractive
            </div>
          </div>
          <div className="flex flex-row border-2 rounded-2xl px-4 items-center">
            <div> Select Length</div>
            <div className="px-2">5%</div>

            <span className="mt-2 mr-2">
              <Inputslider changevalue={changeRatio}></Inputslider>
            </span>
            <div> 80%</div>
          </div>
        </div>

        <div className="w-full grid lg:grid-cols-2">
          <div className=" pl-4 border-r-2 flex flex-col items-center pt-4">
            <div className="flex justify-between  w-[90%]">
              <p className="font-semibold text-[20px]">Enter Text</p>
              <IconButton
                onClick={() => {
                  setcontent("");
                  setgenerated_result("");
                }}
              >
                <MdDeleteOutline className="w-10 h-7 text-gray-800 hover:text-green-800" />
              </IconButton>
            </div>
            <textarea
              className="w-[90%] h-[340px] border-2 p-2"
              multiple
              type="text"
              value={content}
              onChange={(e) => {
                setcontent(e.target.value);
              }}
            />
            <div className="flex items-center justify-between w-[90%] cursor-pointer font-semibold mt-2">
              <div
                className=" hover:text-green-600 my-2 underline"
                onClick={() => setresultype("spelling")}
              >
                Check For Spelling Mistakes ?
              </div>
              <div className="text-[14px]">100 Words</div>
            </div>
            <div className="flex justify-between w-[90%] mt-2 items-center">
              <div className="flex text-[18px] py-4 lg:py-0 ">
                <div
                  className="border-2 w-28 text-center border-slate-500 hover:cursor-pointer rounded-l-xl"
                  style={
                    language == "en"
                      ? { backgroundColor: "gray", color: "white" }
                      : {}
                  }
                  onClick={(e) => {
                    setlanguage("en");
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
              <div
                className="border-4 rounded-2xl px-2 py-1 flex items-center hover:cursor-pointer hover:bg-[#38f034]  text-xl"
                onClick={generate}
              >
                {" "}
                <MdOutlineSummarize className="w-10 h-7 text-gray-500" />{" "}
                Generate
              </div>
            </div>
            <div className="flex flex-wrap text-[14px] mt-6 w-full px-4 gap-y-2 cursor-pointer">
              <p className=" pl-2 mx-2 text-[16px] font-semibold text-green-700">
                Keywords:
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                imran
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                khan
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                Keywords:
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                imran
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                khan
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                khan
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                Keywords:
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                imran
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                khan
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                Keywords:
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                imran
              </p>
              <p className="border-2 rounded-2xl px-2 mx-2 border-black">
                khan
              </p>
            </div>
          </div>
          {resulttype == "generate" && (
            <div className="h-full w-full flex flex-col items-center">
              <div className="flex justify-start w-[95%]">
                <div className="text-[18px] font-semibold mt-2">
                  Generated Result :
                </div>
              </div>
              <div className="w-[95%] h-[400px] overflow-auto border-2 mt-1 p-2 border-gray-500 rounded-xl">
                { resultui=="para" && <div
                  dir="auto"
                  className={`${
                    resultlang == "en" ? "text-justify" : "text-right"
                  }`}
                >
                  {generated_result}
                </div>}
                { resultui=="key" && <div className="">
                  {generated_result.map((item, index) => (
                    <p key={index}> ◉ {item}. </p>
                  ))}
                </div>}
              </div>
              <div className="w-[95%] flex justify-between mt-2 items-center">
                <div className="font-semibold mt-2 ml-2">
                  {" "}
                  2 Sentences. 50 words
                </div>
                <div className="flex ">
                  <p className="border-2 rounded-2xl px-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white">
                    Download in PDF
                  </p>
                  <p className="border-2 rounded-2xl px-2 mx-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white">
                    Download in Word
                  </p>
                </div>
              </div>
              <div className="w-[95%] mt-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-[18px]">Statistics : </p>
                  <div className="">
                    <p>Word Count: 196 → 50</p>
                    <p>Sentence Count: 19 → 5</p>
                    <p>Characters: 19600 → 500</p>
                    <p>Reduction: 40%</p>
                  </div>
                </div>
                <div className="w-[50%] flex flex-col ">
                  <p className="ml-4 mb-2 font-semibold">Generated Audio :</p>
                  <audio
                    controls
                    src="/audio/a1.mp3"
                    className=" text-green-500 w-full"
                  />
                </div>
              </div>
            </div>
          )}
          {resulttype == "spelling" && (
            <div className="h-full w-full flex flex-col items-center ">
              <div className="flex justify-between w-[95%]">
                <div className="text-[18px] font-semibold mt-5">
                  Spelling Mistakes :
                </div>
                <div className="text-[18px] font-semibold mt-5 mr-8 cursor-pointer hover:text-green-500">
                  Replace All
                </div>
              </div>
              <div className="w-[95%] h-[470px]  overflow-auto border-2 mt-4 p-2 border-gray-500 rounded-xl flex flex-col items-center">
                {mistakes.map((item) => (
                  <div className="flex justify-between bg-slate-100 rounded-xl px-6 py-2 items-center my-2 w-[85%]">
                    <div className="flex">
                      <p className="text-red-600 text-[18px] font-semibold">
                        {" "}
                        {item.wrong}
                      </p>
                      <p className=" text-[18px] mx-4"> to </p>
                      <p className="text-[#34bd32] text-[18px] font-semibold">
                        {" "}
                        {item.correct}
                      </p>
                    </div>
                    <div className="p-2 hover:bg-green-600 ml-6 rounded-2xl text-white bg-[#34bd32]">
                      {" "}
                      Replace
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
