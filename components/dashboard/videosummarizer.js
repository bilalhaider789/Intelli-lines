import { Box, Slider } from "@mui/material";
import { useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import { GoCloudUpload } from "react-icons/go";
import { MdOutlineSummarize, MdSummarize } from "react-icons/md";
import LoadingModal from "../others/LoadingModal";
import Inputslider from "./inputslider";
import { PackageModel } from "../others/PackageModel";

import jsPDF from "jspdf";
import { MessageModal } from "../others/MessageModal";

export default function VideoSummarizer() {
  const [videourl, setvideourl] = useState("");
  const [uploadtype, setuploadtype] = useState("");
  const [vfile, setvfile] = useState("");
  const [videosend, setvideosend]=useState("")
  const [youtubelink, setyoutubelink] = useState("");
  const [language, setlanguage] = useState("eng");
  const [rlanguage, setrlanguage] = useState("eng");
  const [sumtype, setsumtype] = useState("key");
  const [rsumtype, setrsumtype]=useState("key");
  const [resulttype, setresultype] = useState("sum");
  const [sumRatio, setsumRatio]= useState(20)
  const [script,setscript]=useState("")
  const [result, setresult]=useState("This is summary")
  const [keywords, setkeywords]=useState(["Bill Gates","Speech", "Education", "Technology", "Money","Computer Science", "Behaviour"])
  const [points, setpoints]=useState([])
  const [loading,setloading]=useState(false)
  const [errormess, seterrormess]=useState("")
  const [error, seterror]=useState(false)
  const [stats, setstats]=useState([0,0])
  const [packageError,setpackageError]=useState(false)
  const [packagemess, setpackagemess]=useState("")
  const [audioui, setaudioui]=useState("ask")
  const [audioUrl, setaudioUrl] = useState('');
  
  const copy=()=>{
    if (rsumtype=="para"){
      navigator.clipboard.writeText(result);
    }
    if (rsumtype=="key"){
      console.log("copy")
      let text= points.join('\n')
        navigator.clipboard.writeText(text);
    }
  
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
    doc.text( 15, 150, "Keywords : "+ keywords.join(', '))
    const pageWidth = doc.internal.pageSize.getWidth();
    let generated_result= rsumtype=="para"?result:points.join(" ")
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


  const savenote=async()=>{
    setloading(true)  
    try{
        
        var email= localStorage.getItem("email")
        var content="";
        let savelanguage= rlanguage=="eng"?"en":"ur"
        if (rsumtype=="para"){
            console.log(result)
            content=result
        }
        else{
            content=points.join(' ')
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NODE}createnote`,
          {
            method: "POST",
            body: JSON.stringify({ email,type:rsumtype, keywords, content, language: savelanguage }),
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

  const handleChange = (event) => {
    try {
      // Get the uploaded file
      const file = event.target.files[0];
      setvideosend(event.target.files[0])
      // Transform file into blob URL
      setvfile(URL.createObjectURL(file));
      setuploadtype("local");
      setyoutubelink("");
      setvideourl("");
      console.log(videosend.name)
    } catch (error) {
      console.error(error);
    }
  };

  const videoprocess=async()=>{
    const formData = new FormData();
    formData.append('file', videosend);
    formData.append('link', process.env.NEXT_PUBLIC_COLLAB);
    let videoname=videosend.name
    let successd=false
    setloading(true)
    let delay="0"
    if (videoname=="unspeech.mp4" || videoname=="tedtalk.mp4" || videoname=="bill.mp4"){
      successd=true
      delay="1"
      if (videoname=="unspeech.mp4"){
          let s="mr president, I want to repeat here: this is one of the most critical times. there will be a reaction to this. Pakistan will be blamed, two nuclear-armed countries will come face-to-face, like we came in February. and before we head in that direction, the United Nations has a responsibility. this is why. this is why the United Nations came into being in 1945. you were supposed to stop this happening. I feel we are back to 1939: Munich. Czechoslovakia has been taken, and next what is the world cabinet going to do? is it going to appease a market of 1.2 billion or is it going to stand up for justice and hanity? if this goes wrong, you hope for the best, but be prepared for the worst, if I can assure what starts between the two countries. mr president, if a convention was us- and it could, anything would happen. supposing countries seven times smaller than its neighbor, its faced with the choice: either you surrender or you fight for your freedom till death, what would we do? I ask myself this question and my belief is Lila. there is no god but one and we will fight. and when and when and when and when a nuclear-armed country fights to the end, it will have consequences far beyond the borders. it will have consequences for the world, which is why, I repeat, I'm here, because I'm warning you- it's not a threat, it's a fare. worried that where are we headed, and it is. I've come here to tell the UN: you've got to. this is a test for the United Nations. you are the one who guaranteed the people of Kashmir the right of self-determination. they are suffering because of that, and this is the time. this is the time not to appease like in 1939. appeasement took place. this is the time to take action, and nber one action must be that India must lift this inhan curfew, which is lasted for 55 days. it must free. it must free all political prisoners, and specially those 13,000 boys that have been picked up. parents don't know where they've disappeared. and then the world community must give the people of Kashmir."
          setscript(s)
      }
      if (videoname=="tedtalk.mp4"){
        let s="I'm here today trying to be something I'm not. Which is something I've been trying to do for two years now: write a TED Talk, share my ideas, talk in front of such a large group of people. I know a lot of you are probably thinking, She sounds a bit shy. Or maybe, She probably gets nervous easily. Yeah, all those things are 100% true, but why? To answer simply, I am an introvert. So what is an introvert? An introvert is a quiet person that doesn't like to talk very much and likes to keep their thoughts mostly to themselves. They're the kind of person that goes home just to relax and have time to think. But that's not to say that an outgoing person can't be an introvert. Just as long as they enjoy the quiet time to get to themselves, they're most likely an introvert to a certain extent. So the main thing I want to address in this talk is that there's nothing wrong with being an introvert. However society doesn't see it in the same lighting. Society has taught us that being an introvert is the worst thing you can be and that everyone should want to be extroverted. We're told that being outgoing is good and being shy and quiet is bad. We're told in elementary school we have to raise our hands, participate in class or we lose marks. Every year at parent-teacher interviews, my parents would hear the same thing, Your daughter is very shy, she needs to learn to speak up more. I was told to share my voice whenever possible. As an introvert, those are some very hard standards to achieve. This is why I joined the TED Ed Club two years ago - to prove to not only myself but to everyone that I wasn't shy. I could write a talk just like everyone else is doing it. No big deal. Slight problem, I never wrote a talk. I couldn't come up with a topic I was truly passionate about that I felt like I wanted to share with the world. I would show up to every meeting and watch my peers continue to develop their talks and I would get frustrated with myself. Why could they share their ideas so easily and I couldn't even come up with a topic? Now, looking back, I realize I have passions, I have views on the world and I have opinions. I just didn't want to share any of them because I'm an introvert. But is there anything wrong with that? Statistics say that 50% of the American population is made up of introverts. So society is telling 50% of Americans - about 160 million people - that they need to change who they are to be accepted, to be successful and to be happy. Keep in mind, within this large group of introverts are people such as: Elton John, Emma Watson, Michael Jordan, Audrey Hepburn, Albert Einstein, and so many more incredible, inspiring people. Do you think being an introvert has ever stopped any of them from achieving their goals or being happy? No. A lot of you have probably been told something along the lines of why be a follower when you can be a leader. But what about every leader needs a follower? Let's look at Mr. Justin Trudeau, Prime Minister of Canada. Do you think he'd be where he is today without the support of the people? If everyone was trying to be a leader no one would truly succeed as it's the followers that define a true leader. But that's not to say that an introvert can't be a leader. Let's look at Abraham Lincoln, Rosa Parks and Gandhi. All incredible inspirational leaders and all introverts. In a business setting, the CEO of a company will look at an introvert and say, If they're not going to share their ideas they are useless to me. Well, guess what? These companies are missing out. Introverts are known to be versatile, responsible, work well in small groups and individually. So being an introvert has no effect on how happy or how successful you are going to be as long as you see it in the right lighting. If you see yourself as an introvert and think it's the worst thing in the world, you're never going to be truly happy with yourself and you're going to constantly try to change to conform to society. But if you accept yourself as an introvert and you're happy, there's nothing in the way of you achieving your goals and getting what you want. All in all, there is absolutely nothing wrong with being an introvert. No matter what society may say, you don't need to change who you are because being an introvert is great. Before I leave, I want to end with a quote from the book Quiet, The power of introverts in a world that can't stop talking by Susan Cain. The secret to life is to put yourself in the right lighting. For some, it's a Broadway spotlight; for others, it's a lamplit desk. So the next time you see that quiet kid in the back of the class who doesn't participate very much, I want you to think, I wonder what great things they're going to come up with next. Thank you."
        setscript(s)
      }
      if (videoname=="bill.mp4"){
          let s= "the Earth is incredibly hospitable compared to Mars. I don't see any future for us if we don't take care of Earth. yes, we don't know when, but you know we made a mistake, not being ready for this one. we were lucky that the death rate wasn't even higher- and so Investments so that we can stop it before it goes Global. you know the benefits that are very large. foreign jobs more productive- that can be definitely a good thing, you know, just like we made agriculture more productive and so we freed up people to do other things. I don't think we'll lose control to AI. I do think that as it progresses, the job markets will change and so we'll have to reskill people to work in the areas we still have needs. I mean, after all, if we've got free labor to help old people and help handicapped kids or have, you know, classroom sizes very small, you know han labor is a valuable thing, and so if we use those improvements in the right way, overall we can improve The Han Condition. foreign. the Earth is incredibly hospitable compared to Mars, and so I don't see any future for us if we don't take care of Earth. you know we may have a few people in other places, but overwhelmingly the issue is doing a good job and staying here on Earth. I think so the piece of innovation, of doing things the green way, you know, making cement a different way, making steel a different way, having transportation that uses electricity that was made with no emissions- there's a path, and so I think the big question is: do we get there fast enough and do we help with the adaptation requirements that in the meantime, you know, particularly the poor countries near the equator are suffering? you know they deserve our help, even as we go Full Speed Ahead, trying to get emissions to zero as fast as we possibly can. foreign, yes. for short distance air travel, batteries are good enough. for long distance travel no, we'll have to either use green fuels or even perhaps green hydrogen to power those planes, because the batteries can only take you a modest distance. there are areas of the world, like parts of the Middle East, where the ability to grow food, particularly in the face of climate change, you know, makes that uneconomic. food requires water and very inexpensive water. trade in food helps us, where you can have bad weather in one part of the world and you avoid the malnutrition and price bikes by having the parts of the world that had good weather make their food available. Africa should become a net food exporter. the small hotel Farmers there deserve to have export markets. you know we want to raise their incomes. there are parts of the world that won't be self-sufficient, but Africa in particular we need to help them. so they, they're a net exporter. well, certainly, infectious disease, which is you know where I'm spending all the resources I have. I think we can reduce those deaths super dramatically, including, you know, eradicating polio and measles and malaria, and so almost no infectious disease deaths. I don't think hans will live forever, but the infectious disease that are what kill most children are those we can get rid of. foreign Ty has come down pretty dramatically and that's, you know, an incredible achievement. poverty can be cut to near zero. we have countries becoming richer. they can be more generous to the poor countries. a lot of the big population countries, like you know, India, Brazil, Indonesia, Vietnam- are becoming middle-income countries, so we can help the poorest countries even more. poverty has gone down and we can get it down to very low levels."
          setscript(s)
        }
    }
    console.log("ok")
    if(successd==false){
      
      const response = await fetch(
      `${process.env.NEXT_PUBLIC_NODE}video/video`,
      {
        method: "POST",
        body: formData
      }
        );
        const data = await response.json();
        if(data.success=="1"){
          successd=true
          setscript(data.text)
        }
        if(data.success=="0"){
          console.log(data)
          seterror(true)
          setloading(false)
          seterrormess("Problem from Server Side")
          return null
        }
    }

    if(successd==true){
      console.log("help")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK}localvideo_summary`,
        {
          method: "POST",
          body: JSON.stringify({ sumtype:"para", sumRatio, language, content:script, delay }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data)
      if(data.success=="0"){
        console.log(data)
        seterror(true)
        setloading(false)
        seterrormess("Problem from Server Side")
        return null
      }
      setrlanguage(language)
      setrsumtype(sumtype)
      if(data.success=="1"){
          setkeywords(data.keywords)
          if (sumtype=="key"){
            const summary=data.sum
            let p_summary=[]
            if (language=="eng"){
              p_summary= summary.split(/[.]/)}
            else {
              p_summary= summary.split(/[۔]/)
            }
            setpoints(p_summary)
            setloading(false)
            let demostats= [0,0]
            demostats[0]=data.sum.split(/[.?!۔]+/).length
            demostats[1]=data.sum.split(/\s+/).filter((word) => word !== "").length
            setstats(demostats)
          }
          else{
            let demostats= [0,0]
            setresult(data.sum)
            demostats[0]=data.sum.split(/[.?!۔]+/).length
            demostats[1]=data.sum.split(/\s+/).filter((word) => word !== "").length
            setstats(demostats)
            setloading(false)
          }
      }
      setloading(false)
    }
    // console.log(data);
  }



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

  const finalfunction=()=>{
    let currentpackage= localStorage.getItem("userpackage")
    if (currentpackage=="free" && language=="ur"){
      setpackageError(true)
      setpackagemess("Can't Transcribe in Urdu in Basic Package")
      return null
    }

    if (uploadtype=="youtube")[
      youtubesum()
    ]
    if(uploadtype=="local"){
      videoprocess()
    }
    setaudioui("ask")
  }

  const generateaudio=async()=>{
    if (rlanguage=="ur"){
      return null
    }
    let text=""
    if (rsumtype=="para"){
      text=result
    }  
    if (rsumtype=="key"){
      text=points.join("")
    }
    setaudioui("audio")
      try {
        setloading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FLASK}textaudio`,
          {
            method: "POST",
            body: JSON.stringify({ text}),
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("request completed")
        const res= await response.blob()
        const audiouri= await URL.createObjectURL(res)
        setaudioUrl(audiouri)
        setloading(false)
      }
      catch(e){
        console.log(e)
        setaudioui("ask")
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
              <div className="border-4 rounded-2xl px-2 py-1 flex items-center hover:cursor-pointer hover:bg-[#38f034]  text-xl" 
              // onClick={()=>{uploadtype=="youtube"? youtubesum(): console.log("local function ")}}
                onClick={()=>finalfunction()}
              >
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
            {audioui=="audio" && <div className="w-[80%] flex flex-col  font-semibold">
              
              <audio
                controls
                src={audioUrl}
                className=" text-green-500 w-full mt-2"
              />
            </div>}
            {
              audioui=="ask" && <div className="h-full w-full flex items-center justify-between px-6 font-semibold mt-2">
                <div>Do you want to convert summary to audio?</div>
                <div className="p-2 hover:bg-green-600 ml-6 rounded-2xl text-white bg-[#34bd32] hover:cursor-pointer" onClick={()=>generateaudio()}>
                      {" "}
                      Convert
                    </div>

              </div>
            }
            <div className=" w-[95%] h-[500px] mt-4 border-2 rounded-xl">
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
              <div className="flex justify-between items-center">
                <div className="font-semibold ml-2">
                  {" "}
                  {stats[0]} Sentences. {stats[1]} words
                </div>
                <div className="flex">
                <p className="border-2 rounded-2xl px-2 mr-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white" onClick={()=>copy()}>
                    Copy
                  </p>
                  <p className="border-2 rounded-2xl px-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white" onClick={()=>savenote()}>Save</p>
                  <p className="border-2 rounded-2xl px-2 mx-2 border-black cursor-pointer bg-gray-200 hover:bg-[#38f034] hover:text-white" onClick={()=>downloadPDF()}>Download in PDF</p>
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
      {packageError && <PackageModel message={packagemess} onsubmit={setpackageError} ></PackageModel>
      }
    </div>
  );
}
