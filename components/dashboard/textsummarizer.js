import { IconButton, Slider } from "@mui/material";
import { useState } from "react";
import { MdDeleteOutline, MdOutlineSummarize } from "react-icons/md";
import LoadingModal from "../others/LoadingModal";
import Inputslider from "./inputslider";
import { Modal } from "../modal";
import jsPDF from "jspdf";
import { MessageModal } from "../others/MessageModal";

export default function TextSummarizer() {
  const [sumtype, setsumtype] = useState("key");
  const [content, setcontent] = useState();
  const [language, setlanguage] = useState("en");
  const [resulttype, setresultype] = useState("generate");
  const [sumRatio, setsumRatio] = useState(20);
  const [generated_result, setgenerated_result] = useState();
  const [generated_points, setgenerated_points]=useState([])
  const [resultlang, setresultlang] = useState("en");
  const [resultui, setresultui] = useState("para");
  const [loading,setloading]=useState(false)
  const [cmodal, setcmodal]=useState(false)
  const [keywords,setkeywords]=useState([])
  const [mistakes,setmistakes]=useState([])
  const [inputwords, setinputwords]=useState(0)
  const [stats, setstats]=useState([0,0,0,0,0,0])
  const [errormess, seterrormess]=useState("")
  const [error, seterror]=useState(false)
  
  const checkMistakes=async()=>{
    try {
      setloading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK}spell_mistakes`,
        {
          method: "POST",
          body: JSON.stringify({content }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data.mistakes);
      setmistakes(data.mistakes)
      setloading(false)
    }
      
      catch(e){
        setloading(false)
        console.log(e)
      }
  }

  const replace=(wrong, correct)=>{
      console.log(wrong)
      console.log(correct)
      setmistakes(mistakes.filter(e=> e.wrong!=wrong))
      const changedcontent= content.replace(wrong,correct)
      setcontent(changedcontent)
  }

  const replaceAll=()=>{
    setmistakes([])
  }

  const changeRatio = (e) => {
    setsumRatio(e);
  };

  const downloadPDF=()=>{

    
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date();
    var doc= new jsPDF("portrait", 'px','a4', 'false')
    doc.addImage('/images/logobg.png', 'PNG', 150,25,60,60)
    doc.addImage('/images/logotext.png', 'PNG', 210,55)
    doc.addFont('/fonts/poppins.ttf','Urdu','normal')
    doc.setFontSize(12);
    doc.setFont('Urdu', 'normal');
    doc.text( 15, 120, "Date of Creation : "+ currentDate.toDateString())
    doc.text( 15, 135, "Time of Creation : "+ currentTime)
    doc.text( 15, 150, "Keywords : "+ keywords.join(', '))
    const pageWidth = doc.internal.pageSize.getWidth();
    const splitText = doc.splitTextToSize(generated_result, pageWidth-20);
    let cursorY = 170;
    for (let i = 0; i < splitText.length; i++) {
      if (cursorY > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        cursorY = 30;
      }
      doc.text(15, cursorY, splitText[i]);
      cursorY += 10;
    }
    doc.save('report.pdf')
  }

  const generate = async () => {
    setgenerated_result("");
    setresultype("generate");
    console.log(sumRatio / 100);
    if (inputwords > 100){
    try {
      setloading(true)
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
      console.log(data.keywords)
      setresultlang(data.lang)
      if (data.success == "1") {
        setresultui(data.type)
        setloading(false)
        setkeywords(data.keywords)
        let demostats=[0,0,0,0,0,0]
        demostats[0]=inputwords
        demostats[2]=content.split(/[.?!۔]+/).length
        demostats[4]=content.replace(/\s/g, "").length
        
        if (data.type =="para"){
          setgenerated_result(data.sum);
          demostats[1]=data.sum.split(/\s+/).filter((word) => word !== "").length;
          demostats[3]=data.sum.split(/[.?!۔]+/).length
          demostats[5]=data.sum.replace(/\s/g, "").length
        }
        if (data.type=="key"){
          
          if (data.lang=="en"){
            setgenerated_points((data.sum))
            let demostring=data.sum.join(" ")
            demostats[1]=demostring.split(/\s+/).filter((word) => word !== "").length;
            demostats[3]=data.sum.length
            demostats[5]=demostring.replace(/\s/g, "").length
          }
          else{
          setgenerated_points((data.sum[0].split(/[۔]/)))
          let demostring=data.sum[0]
          demostats[1]=demostring.split(/\s+/).filter((word) => word !== "").length;
          demostats[3]=demostring.split(/[.?!۔]+/).length
          demostats[5]=demostring.replace(/\s/g, "").length
          }}
        setstats(demostats)
        console.log(stats)
      }
    } catch (e) {
      setloading(false)
      setcmodal(true)
      console.log(e);
    }}
    else{
      seterror(true)
    }
  };

  const savenote=async()=>{
    setloading(true)  
    try{
        
        var email= localStorage.getItem("email")
        var content="";
        if (resultui=="para"){
            content=generated_result
        }
        else{
            content=generated_points.join(' ')
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NODE}createnote`,
          {
            method: "POST",
            body: JSON.stringify({ email,type:resultui, keywords, content, language: resultlang }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        console.log(data.success);
        setloading(false)
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
              className="border-2 w-28 text-center border-slate-500 hover:cursor-pointer   rounded-r-xl"
              style={
                sumtype == "abstractive"
                  ? { backgroundColor: "gray", color: "white" }
                  : {}
              }
              onClick={(e) => {
                setsumtype("abstractive");
              }}
            >
              Summary
            </div>

            {/* <div
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
            </div> */}
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
                  setmistakes([])
                  setresultype("generate")
                  setkeywords([])
                  setinputwords(0)
                  setstats([0,0,0,0,0,0])
                  setgenerated_points([])

            
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
                setinputwords((e.target.value.split(/\s+/).filter((word) => word !== "")).length)
              }}
            />
            <div className="flex items-center justify-between w-[90%] cursor-pointer font-semibold mt-2">
              <div
                className=" hover:text-green-600 my-2 underline"
                onClick={() => {setresultype("spelling"); checkMistakes()}}
              >
                Check For Spelling Mistakes ?
              </div>
              <div className="text-[14px]">{inputwords} Words</div>
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
              {
                keywords.map(item => <p className="border-2 rounded-2xl px-2 mx-2 border-black font-urdu">
                {item}
              </p>)
              }
            </div>
          </div>
          {resulttype == "generate" && (
            <div className="h-full w-full flex flex-col items-center">
              <div className="flex justify-start w-[95%]">
                <div className="text-[18px] font-semibold mt-2">
                  Generated Result :
                </div>
              </div>
              <div className="w-[95%] h-[400px] overflow-auto border-2 mt-1 p-2 border-gray-500 rounded-xl font-urdu">
                { resultui=="para" && <div
                  dir="auto"
                  className={`${
                    resultlang == "en" ? "text-justify" : "text-right"
                  }`}
                >
                  {generated_result}
                </div>}
                { (resultui=="key" && resultlang =="en") && <div className="">
                  {generated_points.map((item) => (
                      item !="" ?<p> ◉ {item}. </p>: <p></p>
                  ))}
                </div>}
                { (resultui=="key" && resultlang =="ur") && <div className="text-right">
                  {generated_points.map((item) => (
                      item !="" ?<div className="flex flex-row-reverse"><p>◉</p><p>  .{item}</p></div>: <p></p>
                  ))}
                </div>}
              </div>
              <div className="w-[95%] flex justify-between mt-2 items-center">
                <div className="font-semibold mt-2 ml-2">
                  {" "}
                  {stats[3]} Sentences. {stats[1]} words
                </div>
                <div className="flex ">
                <p className="border-2 rounded-2xl px-2 mx-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white" onClick={()=>savenote()}>
                    Save
                  </p>
                  <p className="border-2 rounded-2xl px-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white" onClick={()=>downloadPDF()}>
                    Download in PDF
                  </p>
                  
                </div>
              </div>
              <div className="w-[95%] mt-2 ml-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-[18px]">Statistics : </p>
                  <div className="">
                    <p>Word Count: {stats[0]} → {stats[1]}</p>
                    <p>Sentence Count: {stats[2]} → {stats[3]}</p>
                    <p>Characters: {stats[4]} → {stats[5]}</p>
                    {/* <p>Reduction: 40%</p> */}
                  </div>
                </div>
                <div className="w-[50%] flex flex-col ">
                  {/* <p className="ml-4 mb-2 font-semibold">Generated Audio :</p>
                  <audio
                    controls
                    src="/audio/a1.mp3"
                    className=" text-green-500 w-full"
                  /> */}
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
                <div className="text-[18px] font-semibold mt-5 mr-8 cursor-pointer hover:text-green-500" onClick={replaceAll}>
                  Replace All
                </div>
              </div>
              <div className="w-[95%] h-[470px]  overflow-auto border-2 mt-4 p-2 border-gray-500 rounded-xl flex flex-col items-center">
                {mistakes.map((item,index) => (
                  <div className="flex justify-between bg-slate-100 rounded-xl px-6 py-2 items-center my-2 w-[85%]" key={index}>
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
                    <div className="p-2 hover:bg-green-600 ml-6 rounded-2xl text-white bg-[#34bd32] hover:cursor-pointer" onClick={()=>replace(item.wrong, item.correct)}>
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
      <LoadingModal state={loading}></LoadingModal>
      {cmodal && <Modal onsubmit={setcmodal}>
        
        </Modal>}
      {error && <MessageModal message="Enter more than 100 words" onsubmit={seterror} ></MessageModal>

      }
    </div>
  );
}
