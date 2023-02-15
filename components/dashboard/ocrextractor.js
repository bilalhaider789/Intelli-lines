import { useState } from "react";
import { ImImages } from "react-icons/im";
import { GrDocumentPdf } from "react-icons/gr";
import { Document, Page } from "react-pdf";
import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function OCRExtractor() {
  const [screen, setscreen] = useState("result");
  const [files, setFiles] = useState([]);
  const [pdffile, setpdfFile] = useState(null);

  const handlepdfChange = (e) => {
    setpdfFile(e.target.files[0]);
  };
  
  const mistakes= [
    {
      wrong: "owerride",
      correct: "override"
    },
    {
      wrong: "hood",
      correct: "hide"
    },
    {
      wrong: "correcdsftion",
      correct: "correction"
    },
    {
      wrong: "owerride",
      correct: "override"
    },
    {
      wrong: "hood",
      correct: "hide"
    },
    {
      wrong: "correcdsftion",
      correct: "correction"
    },{
      wrong: "owerride",
      correct: "override"
    },
    {
      wrong: "hood",
      correct: "hide"
    },
    {
      wrong: "correcdsftion",
      correct: "correction"
    }
  ]
  const handleChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const screenchange=()=>{
    setscreen("upload");
    setFiles([])
  }
  return (
    <div className="bg-blue-100 h-full w-full flex justify-center items-center font-['Poppins']">
      <div className="bg-white h-[95%] w-[90%] shadow-2xl rounded-lg">
        <div className="flex items-center justify-between px-8 py-4 border-b-2 flex-col lg:flex-row">
          <div className="  flex justify-between w-full items-center ">
            <p className="text-[30px] font-semibold ">Text Extractor</p>
            <p>Convert Images & PDFs into text</p>
          </div>
        </div>
        {screen == "upload" && <div className="w-full h-[85%] flex flex-col justify-center items-center ">
          <div className="border-dashed border-4 border-gray-500 bg-[#F3F9FF] p-10 rounded-xl mt-6">
            {/* {files.length !=0 && <div style={{ width: "200px", height: "100px", overflow: "auto",flex:"row"}}>
              {files.map((file) => (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  key={file.name}
                  style={{ width: "100px", height: "100px" }}
                />
              ))}
            </div>} */}
            <div className="flex justify-center items-center gap-6">
              <div
                className="w-40 flex flex-col justify-center items-center border-2 rounded-xl p-4 shadow-xl border-gray-300 hover:shadow-2xl hover:bg-slate-200"
                onClick={() => {
                  document.getElementById("imageinput").click();
                }}
              >
                <ImImages className="w-20 h-16  "></ImImages>
                <p className="font-semibold pt-2">Upload Images</p>
              </div>
              <div className="w-40 flex flex-col justify-center items-center border-2 rounded-xl p-4 shadow-xl border-gray-300 hover:shadow-2xl hover:bg-slate-200">
                <GrDocumentPdf className="w-20 h-16  "></GrDocumentPdf>
                <p className="font-semibold pt-2">Upload PDF</p>
              </div>
            </div>
          </div>

          <div className="p-2 hover:bg-green-600 rounded-2xl text-white bg-[#34bd32] w-48 cursor-pointer text-center mt-6 shadow-lg" onClick={()=>setscreen("result")}>
            Extract Text
          </div>
          {/* <div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlepdfChange}
            />
            <div id="pdf-container">
              {pdffile && (
                <div>
                  aaa
                  <Document file={pdffile}>
                    <Page pageNumber={1} />
                  </Document>
                </div>
              )}
            </div>
          </div> */}
          
          
          {files.length != 0 && (
            <div className="flex flex-row justify-start gap-2 m-6 overflow-x-scroll max-w-6xl overflow-y-hidden  rounded-xl p-6 border-2 border-gray-300">
              {files.map((file) => (
                <div className="border-2 shadow-lg shadow-gray-700 h-[200px] w-[220px] p-2 rounded-lg border-gray-300 flex-shrink-0">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    key={file.name}
                    className="w-full h-full block flex-shrink-0"
                  />
                </div>
              ))}
            </div>
          )}
          <input
            id="imageinput"
            type="file"
            accept=".png, .jpg, .jpeg"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </div>}
        {screen == "result" && (
          <div className="w-full grid lg:grid-cols-3">
            <div className="w-[100%] col-span-2 pl-4 border-r-2 flex flex-col items-center ">
              <div className=" w-[95%] flex justify-between items-center mt-4">
                <div className=" font-semibold mt-2 text-[22px]">
                  Extracted Text:
                </div>
                <div className="mr-2 mt-2 border-2 p-2 rounded-xl shadow-lg bg-[#34bd32] text-white text-[17px] cursor-pointer" onClick={()=>screenchange()}>Scan more...</div>
              </div>
              <div className="w-[95%] h-[570px] border-2 border-gray-300 mt-4 rounded-xl p-4 overflow-auto text-justify">
              Born to a Niazi Pashtun family in Lahore, Khan graduated from Keble College, University of Oxford, England, in 1975. Khan played until 1992, served as the team's captain intermittently between 1982 and 1992,[5] and won the 1992 Cricket World Cup, in what is Pakistan's first and only victory in the competition. Considered one of cricket's greatest all-rounders,[6][7] Khan scored 3,807 runs and took 362 wickets in Test cricket and was inducted into the ICC Cricket Hall of Fame. Khan founded cancer hospitals in Lahore and Peshawar,[8] and Namal College in Mianwali,[9][10] prior to entering politics.[11][12] Founding the PTI in 1996, Khan won a seat in the National Assembly in the 2002 general election, serving as an opposition member from Mianwali until 2007. As Prime Minister, Khan addressed a balance of payments cBorn to a Niazi Pashtun family in Lahore, Khan graduated from Keble College, University of Oxford, England, in 1975. Khan played until 1992, served as the team's captain intermittently between 1982 and 1992,[5] and won the 1992 Cricket World Cup, in what is Pakistan's first and only victory in the competition. Considered one of cricket's greatest all-rounders,[6][7] Khan scored 3,807 runs and took 362 wickets in Test cricket and was inducted into the ICC Cricket Hall of Fame. Khan founded cancer hospitals in Lahore and Peshawar,[8] and Namal College in Mianwali,[9][10] prior to entering politics.[11][12] Founding the PTI in 1996, Khan won a seat in the National Assembly in the 2002 general election, serving as an opposition member from Mianwali until 2007. As Prime Minister, Khan addressed a balance of payments crisis with bailouts from the International Monetary Fund.[15] He presided over a shrinking current account de
              Born to a Niazi Pashtun family in Lahore, Khan graduated from Keble College, University of Oxford, England, in 1975. Khan played until 1992, served as the team's captain intermittently between 1982 and 1992,[5] and won the 1992 Cricket World Cup, in what is Pakistan's first and only victory in the competition. Considered one of cricket's greatest all-rounders,[6][7] Khan scored 3,807 runs and took 362 wickets in Test cricket and was inducted into the ICC Cricket Hall of Fame. Khan founded cancer hospitals in Lahore and Peshawar,[8] and Namal College in Mianwali,[9][10] prior to entering politics.[11][12] Founding the PTI in 1996, Khan won a seat in the National Assembly in the 2002 general election, serving as an opposition member from Mianwali until 2007. As Prime Minister, Khan addressed a balance of payments cBorn to a Niazi Pashtun family in Lahore, Khan graduated from Keble College, University of Oxford, England, in 1975. Khan played until 1992, served as the team's captain intermittently between 1982 and 1992,[5] and won the 1992 Cricket World Cup, in what is Pakistan's first and only victory in the competition. Considered one of cricket's greatest all-rounders,[6][7] Khan scored 3,807 runs and took 362 wickets in Test cricket and was inducted into the ICC Cricket Hall of Fame. Khan founded cancer hospitals in Lahore and Peshawar,[8] and Namal College in Mianwali,[9][10] prior to entering politics.[11][12] Founding the PTI in 1996, Khan won a seat in the National Assembly in the 2002 general election, serving as an opposition member from Mianwali until 2007. As Prime Minister, Khan addressed a balance of payments crisis with bailouts from the International Monetary Fund.[15] He presided over a shrinking current account de
              </div>
              <div className="w-[95%] flex justify-between mt-6 ">
                <p className="font-semibold text-[18px] ml-2"> 50 Sentences, 1500 words</p>
                <div className="flex ">
                <p className="border-2 rounded-2xl px-2 py-1 text-[18px] border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white">
                  Download in PDF
                </p>
                <p className="border-2 rounded-2xl px-2 mx-2 py-1 text-[18px] border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white">
                  Download in Word
                </p>
              </div>

              </div>
            </div>
            <div className="h-full w-full flex flex-col items-center ">
          <div className="flex justify-between w-[95%] mt-2">
              <div className="text-[20px] font-semibold mt-4">
                Spelling Mistakes :
              </div>
              <div className="text-[18px] font-semibold mt-5 mr-8 cursor-pointer hover:text-green-500">
                Replace All
              </div>
            </div>
            <div className="w-[95%] h-[630px]  overflow-auto border-2 border-gray-300 mt-4 p-2 rounded-xl flex flex-col items-center">
              
              {mistakes.map((item)=>
              <div className="flex justify-between bg-slate-100 rounded-xl pr-4 pl-4 py-2 items-center my-2 w-[95%]">
              <div className="flex">
                <p className="text-red-600 text-[18px] font-semibold"> {item.wrong}</p>
                <p className=" text-[18px] mx-4"> to </p>
                <p className="text-[#34bd32] text-[18px] font-semibold"> {item.correct}</p>
              </div>
              <div className="p-2 hover:bg-green-600 ml-6 rounded-2xl text-white bg-[#34bd32]"> Replace</div>
            </div>)}
              
              
            </div>

          </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
