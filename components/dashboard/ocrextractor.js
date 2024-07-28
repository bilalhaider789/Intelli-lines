import { useState } from "react";
import { ImImages } from "react-icons/im";
import { GrDocumentPdf } from "react-icons/gr";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import LoadingModal from "../others/LoadingModal";
import jsPDF from "jspdf";
import { PackageModel } from "../others/PackageModel";
import { PDFDocumentProxy } from 'pdfjs-dist';
import pdfjs from 'pdfjs-dist';


export default function OCRExtractor() {
  const [loading,setloading]=useState(false)
  const [screen, setscreen] = useState("upload");
  const [files, setFiles] = useState([]);
  const [pdffile, setpdfFile] = useState(null);
  const [imagecodes,setimagecodes]=useState({})
  const [uploadtype,setuploadtype]=useState("image")
  const [text,settext]=useState("I am bilal")
  const [mistakes,setmistakes]=useState([{"wrong":"am","correct":"m"},{"wrong":"I","correct":"alal"}])
  const [packageError,setpackageError]=useState(false)
  const [packagemess, setpackagemess]=useState("")
  var reqarray={}

  const replace=(wrong, correct)=>{
    setmistakes(mistakes.filter(e=> e.wrong!=wrong))
    const changedcontent= text.replace(wrong,correct)
    settext(changedcontent)
}

  const replaceAll=()=>{
    let demotext=text
    mistakes.filter(e=>{
        demotext=demotext.replace(e.wrong,e.correct)
    })
    settext(demotext)
    setmistakes([])
  }


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
    const pageWidth = doc.internal.pageSize.getWidth();
    const result = text.replace(/\n+/g, " ");
    const splitText = doc.splitTextToSize(result, pageWidth-20);
    let cursorY = 170;
    for (let i = 0; i < splitText.length; i++) {
      if (cursorY > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        cursorY = 30;
      }
      doc.text(15, cursorY, splitText[i]);
      cursorY += 10;
    }
    doc.save('OCR.pdf')
  }

  const converter=(e,i)=>{
    var reader= new FileReader()
    reader.readAsArrayBuffer(e)
    reader.onload=()=>{
      console.log(reader.result)
      reqarray[i.toString()]= Array.from(new Uint8Array(reader.result))
      
      
    }
  }
  const handleChange =  (e) => {
    reqarray={}
    setFiles(Array.from(e.target.files));
    setuploadtype("image")
    console.log((e.target.files))
    for(var i=0; i<(e.target.files).length;i++){
      converter(e.target.files[i],i)
      
    }
    console.log("before" + reqarray)
    setimagecodes(reqarray)
  };

  const handlepdfChange = (e) => {
    setpdfFile(e.target.files[0]);
    // console.log(pdffile["name"])
    setuploadtype("pdf")
  };
  
  const pdfUpload=async()=>{
    const formData = new FormData();
    console.log(pdffile)
    formData.append('file', pdffile);
    
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
  setloading(true)
    try{
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COLLAB}uploadpdf`,
      // "https://ce37-34-86-1-1.ngrok-free.app/uploadpdf",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data)
    setloading(false)
    if (data.success=="1"){
      settext(data.text)
      setscreen("result")
      const list=data.mistakes
      const filteredList = list.filter((item, index) => {
        return list.findIndex(i => i.name === item.name) === index;
      });
      setmistakes(filteredList)
    }
    }
    catch(e){
      console.log("failed")
      console.log(e)
      setloading(false)
    }

  }

  const screenchange=()=>{
    setscreen("upload");
    setFiles([])
  }

  const handleUpload = async() => {
    try{
      setloading(true)
      console.log(imagecodes)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FLASK}upload`,
      {
        method: "POST",
        body: JSON.stringify(imagecodes),
        headers: { "Content-Type": "application/json" }
      }
    );
    const data = await response.json();
    console.log(data)
    setloading(false)
    if (data.success=="1"){
      settext(data.text)
      setscreen("result")
      setmistakes(data.mistakes)
    }
    
    }
    catch(e){
      setloading(false)
      console.log("failed")
      console.log(e)
    }


  }

  const functionCall=async()=>{
    
    let currentpackage= localStorage.getItem("userpackage")
    if (uploadtype=="image"){
      let imagecount=(files.length)
      console.log(currentpackage)
      console.log(imagecount)
      if(imagecount > 3 && currentpackage=="free"){
        console.log("error basic")
        setpackageError(true)
        setpackagemess("Can't Process more than 3 images in Basic Package")
        return null
      }
      if(imagecount > 5 && currentpackage=="Silver"){
        setpackageError(true)
        setpackagemess("Can't Process more than 5 images in Silver Package")
        return null
      }
      if(imagecount > 7 && currentpackage=="Gold"){
        setpackageError(true)
        setpackagemess("Can't Process more than 7 images")
        return null
      }
      handleUpload()
    }
    if (uploadtype=="pdf"){
      const formData = new FormData();
      console.log(pdffile)
      formData.append('file', pdffile);
      setloading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK}countpdf`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data)
      setloading(false)
      if(data.success=="1"){
        let pagescount= data.count;
        if(pagescount>3 && currentpackage=="free"){
          setpackagemess("Can't Process pdf of more than 3 pages in Basic Package")
          setpackageError(true)
          return null
        }
        if(pagescount>5 && currentpackage=="Silver"){
          setpackagemess("Can't Process pdf of more than 5 pages in Silver Package")
          setpackageError(true)
          return null
        }if(pagescount>7 && currentpackage=="Gold"){
          setpackagemess("Can't Process pdf of more than 7 pages ")
          setpackageError(true)
          return null
        }
      }
      console.log("done")
      pdfUpload()
    }
  }
  const Pdfnum = async () => {
  
    const reader = new FileReader();
  
    reader.readAsArrayBuffer(pdffile);
    reader.onload = async () => {
      const pdfData = new Uint8Array(reader.result);
      
      const loadingTask = pdfjs.getDocument({ data: pdfData });

      loadingTask.promise.then((pdfDocument) => {
        // Get the number of pages in the PDF
        const numPages = pdfDocument.numPages;
  
        console.log('Number of pages:', numPages);
      });
    };
  };

  return (
    <div className="bg-blue-100 h-full w-full flex justify-center items-center font-['Poppins']">
      <div className="bg-white h-[95%] w-[90%] shadow-2xl rounded-lg">
        <div className="flex items-center justify-between px-8 py-4 border-b-2 flex-col lg:flex-row">
          <div className="  flex justify-between w-full items-center ">
            <div className="flex items-center">
              <div className="border-r-2 pr-4 border-gray-300 mr-2" onClick={()=>setscreen("upload")}> <AiOutlineArrowLeft className="w-8 h-8 text-[20px]" /></div>
              <p className="text-[30px] font-semibold ">Text Extractor</p>
            </div>
            <p>Convert Images & PDFs into text</p>
          </div>
        </div>
        {screen == "upload" && <div className="w-full h-[85%] flex flex-col justify-center items-center ">
          <div className="border-dashed border-4 border-gray-500 bg-[#F3F9FF] p-10 rounded-xl mt-6">
            
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
              <div className="w-40 flex flex-col justify-center items-center border-2 rounded-xl p-4 shadow-xl border-gray-300 hover:shadow-2xl hover:bg-slate-200"
                onClick={() => {
                  document.getElementById("pdfinput").click();
                }}
              >
                <GrDocumentPdf className="w-20 h-16  "></GrDocumentPdf>
                <p className="font-semibold pt-2">Upload PDF</p>
              </div>
            </div>
          </div>

          <div className="p-2 hover:bg-green-600 rounded-2xl text-white bg-[#34bd32] w-48 cursor-pointer text-center mt-6 shadow-lg" onClick={()=>functionCall()}>
            Extract Text
          </div>
          <div>
            <input
              id="pdfinput"
              type="file"
              accept="application/pdf"
              onChange={handlepdfChange}
              className="hidden"
            />
            <div id="pdf-container">
              {(pdffile && uploadtype=="pdf") &&(
                <div className="font-semibold text-[20px] mt-4">
                  Uploaded File : {pdffile["name"]}
                </div>
              )}
            </div>
          </div>
          
          
          {(files.length != 0 && uploadtype=="image")&& (
            <div className="flex flex-row justify-start gap-2 m-6 overflow-x-scroll max-w-6xl overflow-y-hidden  rounded-xl p-6 border-2 border-gray-300">
              {files.map((file) => (
                <div className="border-2 shadow-lg shadow-gray-700 h-[200px] w-[220px] p-2 rounded-lg border-gray-300 flex-shrink-0">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    key={file.name}
                    className="w-full h-full block flex-shrink-0 object-contain"
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
              <div className="w-[95%] h-[450px] border-2 border-gray-300 mt-4 rounded-xl p-4 overflow-auto text-justify">
              {text}
              </div>
              <div className="w-[95%] flex justify-between mt-6 ">
                <p className="font-semibold text-[18px] ml-2">  {(text.split(" ")).length} words, {text.length} Characters</p>
                <div className="flex ">
                <p className="border-2 rounded-2xl px-2 py-1 text-[18px] border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white" onClick={()=>navigator.clipboard.writeText(text)}>
                  Copy
                </p>
                <p className="border-2 rounded-2xl px-2 mx-2 py-1 text-[18px] border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white" onClick={()=>downloadPDF()}>
                  Download in PDF
                </p>
              </div>

              </div>
            </div>
            <div className="h-full w-full flex flex-col items-center ">
          <div className="flex justify-between w-[95%] mt-2 items-center">
              <div className="text-[20px] font-semibold">
                Spelling Mistakes :
              </div>
              <div className="flex">
                <div className="px-2 py-2 hover:bg-red-700 ml-2 rounded-2xl text-white bg-[#f73838] cursor-pointer" onClick={()=>setmistakes([])}> Ignore All</div>
                <div className="p-2 hover:bg-green-600 ml-2 rounded-2xl text-white bg-[#34bd32] cursor-pointer" onClick={()=>replaceAll()}> Replace All</div>
              </div>
            </div>
            <div className="w-[95%] h-[500px]  overflow-auto border-2 border-gray-300 mt-4 p-2 rounded-xl flex flex-col items-center">
              
              {mistakes.length>0? mistakes.map((item)=>
              <div className="flex justify-between bg-slate-100 rounded-xl pr-4 pl-4 py-2 items-center my-2 w-[95%]">
              <div className="flex">
                <p className="text-red-600 text-[18px] font-semibold"> {item.wrong}</p>
                <p className=" text-[18px] mx-4"> to </p>
                <p className="text-[#34bd32] text-[18px] font-semibold"> {item.correct}</p>
              </div>
              <div className="p-2 hover:bg-green-600 ml-6 rounded-2xl text-white bg-[#34bd32]" onClick={()=>replace(item.wrong,item.correct)}> Replace</div>
            </div>):<div className="mt-6 font-semibold text-[20px] text-gray-500 cursor-pointer">No mistakes to Show</div>}
              
              
            </div>

          </div>
            
          </div>
        )}
        <LoadingModal state={loading}/>
        {packageError && <PackageModel message={packagemess} onsubmit={setpackageError} ></PackageModel>
      }
      </div>
    </div>
  );
}
