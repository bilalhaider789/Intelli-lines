
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import PDFFile from "../components/pdfFile";
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
// import logo from "/images/logo.png"


function Home() {
  const[view,setview]=useState(true)
  const maintail= " md:bg-blue-300 sm:bg-blue-600 bg-slate-600";
  const keywords=["bilal", "haider", "imran", "hammad", "comsats", "paaaaapi"]
   
  const pdfgenerate=()=>{
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date();
    var doc= new jsPDF("portrait", 'px','a4', 'false')
    doc.addImage('/images/logobg.png', 'PNG', 150,25,60,60)
    doc.addImage('/images/logotext.png', 'PNG', 210,55)
    doc.setFontSize(12);
    // doc.addFont('/fonts/urdu1.ttf','Urdu','normal')
    // doc.setFont('Urdu')
    doc.text( 15, 120, "Date of Creation : "+ currentDate.toDateString())
    doc.text( 15, 135, "Time of Creation : "+ currentTime)
    doc.text( 15, 150, "Keywords : "+ keywords.join(', '))
    var longText= "my name is bilal my name is bilalmy name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilalmy name is bilalv my name is bilal v v vvv my name is bilal my name is bilal my name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilal my name is bilal my name is bilalmy name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilalmy name is bilalv my name is bilal v v vvv my name is bilal my name is bilal my name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilal my name is bilal my name is bilalmy name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilalmy name is bilalv my name is bilal v v vvv my name is bilal my name is bilal my name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilal my name is bilal my name is bilalmy name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilalmy name is bilalv my name is bilal v v vvv my name is bilal my name is bilal my name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilal my name is bilal my name is bilalmy name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilal my name is bilalmy name is bilalv my name is bilal v v vvv my name is bilal my name is bilal my name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilalmy name is bilal "
    const pageWidth = doc.internal.pageSize.getWidth();
    const splitText = doc.splitTextToSize(longText+longText+longText, pageWidth-20);
    let cursorY = 170;
    for (let i = 0; i < splitText.length; i++) {
      if (cursorY > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        cursorY = 30;
      }
      doc.text(15, cursorY, splitText[i]);
      cursorY += 10;
    }

    
    // var j=1
    // for (var i=0; i<50; i++){
    //   j++
    //   doc.text( (10) ,10*j, "this is demo pdf page"+i)
    //   if (i%40==0){
    //     doc.addPage()
    //     j=1
    //   }
    // }
    doc.save('a.pdf')
  }

  const senddata=async(string)=>{
    
  }
  return (
    <div>
      {/* <PDFDownloadLink document={<PDFFile/>} fileName="FORM">
        {({loading})=>(loading ? <button>Loading document</button>: <button>Download</button>)}

      </PDFDownloadLink> */}
      {/* <PDFFile>  */}

      {/* </PDFFile> */}
      <button onClick={()=>pdfgenerate()}> download pdf</button>
      <div className="font-urdu text-[36px] p-10 rounded-xl w-[50%] text-right bg-slate-400">
      سلام دنیا سلام دنیا
      </div>

      <div>
        {"pred"==true? senddata("predstring"): console.log("not send")}
        {}
      </div>
    </div>
  );
}
export default Home;
// export default dynamic (() => Promise.resolve(Home), {ssr: false})