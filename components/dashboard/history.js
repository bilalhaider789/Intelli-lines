import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { useState } from "react";

export default function History() {
  const keywords = ["Imran", "Khan", "Pakistan", "Hello", "Myname"];
  const [sort, setsort]=useState(true)
  const data=[{"date":"24 March,2023","type": "Key Points","content":"My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointeritems-center......."},{"date":"28 March,2023","type": "Paragraph","content":"My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointeritems-center......."}]

  return (
    <div className="bg-blue-100 h-full w-full flex justify-center items-center font-['Poppins']">
      <div className="bg-white h-[95%] w-[90%] shadow-2xl rounded-lg">
        <div className="flex items-center justify-between px-8  border-b-2 flex-col lg:flex-row font-semibold text-[20px]">
          <div className="flex items-center">
            <div className="border-r-2 pr-4 border-gray-300 py-4">
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
              ></input>
            </div>
            <div className="p-2 hover:bg-green-600 rounded-2xl text-white bg-[#34bd32] font-normal cursor-pointer">
              {" "}
              Search
            </div>
          </div>
        </div>
        <div className="w-full px-8 my-2 flex justify-between cursor-pointer">
          <div>3 results found</div>
          <div>
            <div className="pr-8 flex" onClick={()=>setsort(!sort)}>Sort by Date{sort?<BiSortUp className="text-[26px] w-8" ></BiSortUp>:<BiSortDown className="text-[26px] w-8"></BiSortDown>}</div>
          </div>
        </div>
        <div className="w-full h-[650px] px-8  flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
          <div className="w-full h-36 border-2 rounded-xl py-4 px-8 bg-slate-100 cursor-pointer">
            <div className="w-full flex">
              <div>Date: 23 March, 2023</div>
              <div className="pl-8">Type: Key Points</div>
            </div>
            <div className="flex flex-wrap mt-4 w-full pr-4 cursor-pointer items-center">
              <p className=" mr-2 text-[18px] font-semibold text-green-700">
                Keywords:
              </p>
              {keywords.map((item) => (
                <p className="border-2 rounded-2xl px-2 pb-1 mx-1 border-black  font-urdu ">
                  {item}
                </p>
              ))}
            </div>

            <div className="flex mt-2">
              <div className="mr-4 text-[18px] font-semibold">Content: </div>
              <div>
                My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointer
                items-center.......
              </div>
              <div className="text-green-700 hover:font-bold">see more</div>
            </div>
          </div>
          <div className="w-full h-36 border-2 rounded-xl py-4 px-8 bg-slate-100 cursor-pointer">
            <div className="w-full flex">
              <div>Date: 23 March, 2023</div>
              <div className="pl-8">Type: Key Points</div>
            </div>
            <div className="flex flex-wrap mt-4 w-full pr-4 cursor-pointer items-center">
              <p className=" mr-2 text-[18px] font-semibold text-green-700">
                Keywords:
              </p>
              {keywords.map((item) => (
                <p className="border-2 rounded-2xl px-2 pb-1 mx-1 border-black  font-urdu ">
                  {item}
                </p>
              ))}
            </div>

            <div className="flex mt-2">
              <div className="mr-4 text-[18px] font-semibold">Content: </div>
              <div>
                My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointer
                items-center.......
              </div>
              <div className="text-green-700 hover:font-bold">see more</div>
            </div>
          </div>
          <div className="w-full h-36 border-2 rounded-xl py-4 px-8 bg-slate-100 cursor-pointer">
            <div className="w-full flex">
              <div>Date: 23 March, 2023</div>
              <div className="pl-8">Type: Key Points</div>
            </div>
            <div className="flex flex-wrap mt-4 w-full pr-4 cursor-pointer items-center">
              <p className=" mr-2 text-[18px] font-semibold text-green-700">
                Keywords:
              </p>
              {keywords.map((item) => (
                <p className="border-2 rounded-2xl px-2 pb-1 mx-1 border-black  font-urdu ">
                  {item}
                </p>
              ))}
            </div>

            <div className="flex mt-2">
              <div className="mr-4 text-[18px] font-semibold">Content: </div>
              <div>
                My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointer
                items-center.......
              </div>
              <div className="text-green-700 hover:font-bold">see more</div>
            </div>
          </div>
          <div className="w-full h-36 border-2 rounded-xl py-4 px-8 bg-slate-100 cursor-pointer">
            <div className="w-full flex">
              <div>Date: 23 March, 2023</div>
              <div className="pl-8">Type: Key Points</div>
            </div>
            <div className="flex flex-wrap mt-4 w-full pr-4 cursor-pointer items-center">
              <p className=" mr-2 text-[18px] font-semibold text-green-700">
                Keywords:
              </p>
              {keywords.map((item) => (
                <p className="border-2 rounded-2xl px-2 pb-1 mx-1 border-black  font-urdu ">
                  {item}
                </p>
              ))}
            </div>

            <div className="flex mt-2">
              <div className="mr-4 text-[18px] font-semibold">Content: </div>
              <div>
                My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointer
                items-center.......
              </div>
              <div className="text-green-700 hover:font-bold">see more</div>
            </div>
          </div>
          <div className="w-full h-36 border-2 rounded-xl py-4 px-8 bg-slate-100 cursor-pointer">
            <div className="w-full flex">
              <div>Date: 23 March, 2023</div>
              <div className="pl-8">Type: Key Points</div>
            </div>
            <div className="flex flex-wrap mt-4 w-full pr-4 cursor-pointer items-center">
              <p className=" mr-2 text-[18px] font-semibold text-green-700">
                Keywords:
              </p>
              {keywords.map((item) => (
                <p className="border-2 rounded-2xl px-2 pb-1 mx-1 border-black  font-urdu ">
                  {item}
                </p>
              ))}
            </div>

            <div className="flex mt-2">
              <div className="mr-4 text-[18px] font-semibold">Content: </div>
              <div>
                My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointer
                items-center.......
              </div>
              <div className="text-green-700 hover:font-bold">see more</div>
            </div>
          </div>
          <div className="w-full h-36 border-2 rounded-xl py-4 px-8 bg-slate-100 cursor-pointer">
            <div className="w-full flex">
              <div>Date: 23 March, 2023</div>
              <div className="pl-8">Type: Key Points</div>
            </div>
            <div className="flex flex-wrap mt-4 w-full pr-4 cursor-pointer items-center">
              <p className=" mr-2 text-[18px] font-semibold text-green-700">
                Keywords:
              </p>
              {keywords.map((item) => (
                <p className="border-2 rounded-2xl px-2 pb-1 mx-1 border-black  font-urdu ">
                  {item}
                </p>
              ))}
            </div>

            <div className="flex mt-2">
              <div className="mr-4 text-[18px] font-semibold">Content: </div>
              <div>
                My name is bilal flex flex-wrap mt-4 w-full pr-4 cursor-pointer
                items-center.......
              </div>
              <div className="text-green-700 hover:font-bold">see more</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
