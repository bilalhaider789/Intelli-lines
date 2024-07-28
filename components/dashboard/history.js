import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { useState } from "react";
import { useEffect } from "react";

export default function History() {
  const keywords = ["Imran", "Khan", "Pakistan", "Hello", "Myname"];
  const [sort, setsort] = useState(true);
  const data = [
    {
      date: "24 March,2023",
      type: "Key Points",
      content:
        "My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointeritems-center.......",
      keywords: ["Imran", "Khan", "Pakistan"],
    },
    {
      date: "28 March,2023",
      type: "Paragraph",
      content:
        "My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointeritems-center.......",
      keywords: ["noob", "haider", "bilal"],
    },
  ];
  const [searcheddata, setsearcheddata] = useState([]);
  const [fetcheddata, setfetcheddata] = useState([]);
  const [enteredword, setenteredword] = useState("");
  const [screen, setscreen] = useState("main");
  const [selecteditem, setselecteditem] = useState({});
  const sortdata = () => {
    if (sort) {
      setfetcheddata(
        fetcheddata.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      setsearcheddata(
        searcheddata.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      console.log("triggered 1");
    } else {
      setfetcheddata(
        fetcheddata.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      setsearcheddata(
        searcheddata.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      console.log("triggered 2");
    }
  };

  const modifylist=(id)=>{
    var demolist= fetcheddata
    for (let i = 0; i < demolist.length; i++) {
      if (demolist[i]._id === id) {
        demolist.splice(i, 1);
        console.log("modifies")
        break; 
      }
    }
    console.log(demolist)
    setfetcheddata(demolist)
    demolist=searcheddata
    for (let i = 0; i < demolist.length; i++) {
      if (demolist[i]._id === id) {
        demolist.splice(i, 1);
        break; 
      }
    }
    setsearcheddata(demolist)
  }

  const deletenote=async(id)=>{
      console.log(id)
      try{
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NODE}deletenote`,
          {
            method: "POST",
            body: JSON.stringify({
              id
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.success=="1"){
          modifylist(id)
          sortdata()
        }
      }
      catch(e){
        console.log(e)
      }

  }

  useEffect(() => {
    const fetchhistory = async () => {
      try {
        var email = localStorage.getItem("email");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NODE}historynotes`,
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        console.log("data fetched");
        setfetcheddata(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchhistory();
  }, []);

  const searchword = () => {
    setscreen("search");
    console.log(enteredword);
    const result = fetcheddata.filter((item) => {
      const mergedString = item.keywords.join(" ") + " " + item.content;
      return mergedString.toLowerCase().includes(enteredword.toLowerCase());
    });
    setsearcheddata(result);
  };

  const datatile = (item) => {
    return (
      <div
        className=" flex w-full h-36 border-2 rounded-xl py-4 px-8 bg-slate-100 cursor-pointer justify-between"
        
      >
        <div onClick={() => {
          setscreen("selected");
          setselecteditem(item);
        }}>
          <div className="w-full flex">
            <div>Date: {item.date}</div>
            <div className="pl-8">Type: {item.type}</div>
          </div>
          <div className="flex flex-wrap mt-4 w-full pr-4 cursor-pointer items-center">
            <p className=" mr-2 text-[18px] font-semibold text-green-700">
              Keywords:
            </p>
            {item.keywords.map((item) => (
              <p className="border-2 rounded-2xl px-2 pb-1 mx-1 border-black  font-urdu ">
                {item}
              </p>
            ))}
          </div>
          <div className="flex mt-2">
            <div className="mr-4 text-[18px] font-semibold">Content: </div>
            <div>{item.content.substring(0, 100)}</div>
            <div className="text-green-700 hover:font-bold"> ......see more</div>
          </div>
        </div>
        <div onClick={()=>deletenote(item._id)}><RiDeleteBin5Line className="w-6 h-6 text-[16px] text-red-600 mr-8  hover:h-8"/></div>
      </div>
    );
  };

  return (
    <div className="bg-blue-100 h-full w-full flex justify-center items-center font-['Poppins']">
      <div className="bg-white h-[95%] w-[90%] shadow-2xl rounded-lg">
        <div className="flex items-center justify-between px-8  border-b-2 flex-col lg:flex-row font-semibold text-[20px]">
          <div className="flex items-center">
            <div
              className="border-r-2 pr-4 border-gray-300 py-4"
              onClick={() => {
                setscreen("main");
                setenteredword("");
              }}
            >
              {" "}
              <AiOutlineArrowLeft className="w-8 h-8 text-[20px]" />
            </div>
            <div className="ml-8">Account History of Saved Notes</div>
          </div>
          <div className="flex items-center">
            <div className="text-[18px] font-normal ">
              <input
                type="text"
                placeholder="Enter Keyword"
                className="bg-slate-200 border-2 rounded-2xl px-4 py-2 mr-2"
                onChange={(e) => {
                  setenteredword(e.target.value);
                }}
                value={enteredword}
              ></input>
            </div>
            <div
              className="p-2 hover:bg-green-600 rounded-2xl text-white bg-[#34bd32] font-normal cursor-pointer"
              onClick={() => searchword()}
            >
              {" "}
              Search
            </div>
          </div>
        </div>
        {(screen == "main" || screen == "search") && (
          <div className="w-full px-8 my-2 flex justify-between cursor-pointer">
            <div>
              {screen == "main" ? fetcheddata.length : searcheddata.length}{" "}
              results found
            </div>
            <div>
              <div
                className="pr-8 flex"
                onClick={() => {
                  setsort(!sort);
                  sortdata();
                }}
              >
                Sort by Date
                {sort ? (
                  <BiSortUp className="text-[26px] w-8"></BiSortUp>
                ) : (
                  <BiSortDown className="text-[26px] w-8"></BiSortDown>
                )}
              </div>
            </div>
          </div>
        )}
        {screen == "main" && (
          <div className="w-full h-[600px] px-8  flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
            {fetcheddata.length > 0 ? (
              fetcheddata.map((item) => datatile(item))
            ) : (
              <div className="h-[60%] w-full flex justify-center items-center text-[26px] text-gray-500">
                No result found
              </div>
            )}
          </div>
        )}
        {screen == "search" && (
          <div className="w-full h-[600px] px-8  flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
            {searcheddata.length > 0 ? (
              searcheddata.map((item) => datatile(item))
            ) : (
              <div className="h-[60%] w-full flex justify-center items-center text-[26px] text-gray-500">
                No result found
              </div>
            )}
          </div>
        )}
        {screen == "selected" && (
          <div className="w-full px-8 my-2 flex justify-between cursor-pointer">
            <div className="w-full h-[650px] border-2 rounded-xl py-4 px-8 bg-slate-100 cursor-pointer overflow-y-auto">
              <div className="w-full flex">
                <div>Date: {selecteditem.date}</div>
                <div className="pl-8">Type: {selecteditem.type}</div>
              </div>
              <div className="flex flex-wrap mt-4 w-full pr-4 cursor-pointer items-center">
                <p className=" mr-2 text-[18px] font-semibold text-green-700">
                  Keywords:
                </p>
                {selecteditem.keywords.map((item) => (
                  <p className="border-2 rounded-2xl px-2 pb-1 mx-1 border-black  font-urdu ">
                    {item}
                  </p>
                ))}
              </div>
              <div className=" mt-2">
                <div className="mr-4 text-[18px] font-semibold font-urdu">Content: </div>
                {selecteditem.language == "en" &&
                  selecteditem.type == "para" && (
                    <div className=""> {selecteditem.content}</div>
                  )}
                {selecteditem.language == "ur" &&
                  selecteditem.type == "para" && (
                    <div className="font-urdu text-right ">
                      {" "}
                      {selecteditem.content}
                    </div>
                  )}
                {selecteditem.language == "en" &&
                  selecteditem.type == "key" && (
                    <div className="font-urdu text-justify ">
                      {(selecteditem.content.split(/\.|\?|!/)).map((e)=><div>◉ {e} .</div>)}
                    </div>
                  )}
                  {selecteditem.language == "ur" &&
                  selecteditem.type == "key" && (
                    <div className="font-urdu text-right ">
                      {(selecteditem.content.split(/\.|\?|!/)).map((e)=><div className="flex flex-row-reverse"><p>◉</p><p>  .{e}</p></div>)}
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
