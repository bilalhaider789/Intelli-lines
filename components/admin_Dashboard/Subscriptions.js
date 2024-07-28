import { BiSort } from "react-icons/bi";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { ConfirmationModal } from "../others/ConfirmationModal";
import { useEffect } from "react";
import LoadingModal from "../others/LoadingModal";

export default function Subscriptions(props) {
  const [confirmation, setconfirmation] = useState(false);
  const [datalist, setdatalist] = useState([]);
  const [searchlist, setsearchlist] = useState([]);
  const [deleteid, setdeleteid] = useState("");
  const [loading, setloading] = useState(false);
  const [sort, setsort] = useState(true);
  const [sortby, setsortby] = useState("name");
  const [searchword, setsearchword]=useState("")
  const [enteredword, setenteredword]=useState("")
  const [screen , setscreen]=useState("allusers")
  const [selecteduser, setselecteduser]=useState({})

  
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NODE}admin/subscriptions`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        console.log("data fetched");
        setdatalist(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchusers();
  }, []);

  const subscriptiontile = (e, i) => {
    return (
      <div
        className=" flex items-center h-16  font-semibold text-[20px] mt-6 w-full border-b-2 "
        key={i}
        
      >
        <div className=" w-[5%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>{i+1}</div>
        </div>
        <div className=" w-[17%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>{e.username}</div>
        </div>
        <div className=" w-[28%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>{e.useremail}</div>
        </div>
        <div className=" w-[15%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>{e.packagename}</div>
        </div>
        <div className=" w-[20%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>
          {new Date(e.subscriptiondate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
          </div>
        </div>
        <div className=" w-[17%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>
            {new Date(e.expiry).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
          </div>
        </div>
        <div className=" w-[10%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>$ {e.packageprice}</div>
        </div>
      </div>
    );
  };

  const sortdata = () => {
    var demoarary = datalist;
    if (searchword!="" ){
      demoarary=searchlist
    }
    setsort(!sort);
    if (sortby == "name") {
      if (sort) {
        demoarary = demoarary.sort(function (a, b) {
          if (a["username"] < b["username"]) {
            return -1;
          } else if (a["username"] > b["username"]) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        demoarary = demoarary.sort(function (a, b) {
          if (a["username"] > b["username"]) {
            return -1;
          } else if (a["username"] < b["username"]) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
    if (sortby=="email"){ 
      if (sort){
        demoarary = demoarary.sort(function (a, b) {
          const emailA = a.useremail.toLowerCase();
          const emailB = b.useremail.toLowerCase();
          if (emailA < emailB) {
            return -1;
          } else if (emailA > emailB) {
            return 1;
          } else {
            return 0;
          }
        }
        )
      }
      else{
        demoarary = demoarary.sort(function (a, b) {
          const emailA = a.useremail.toLowerCase();
          const emailB = b.useremail.toLowerCase();
          if (emailA > emailB) {
            return -1; // Reverse the order of -1 and 1 to sort in descending order
          } else if (emailA < emailB) {
            return 1; // Reverse the order of -1 and 1 to sort in descending order
          } else {
            return 0;
          }
        }
        )
      }

    }
    if(sortby=="package"){
      const packageWeights = {
        "free": 0,
        "Silver": 1,
        "Gold": 2
      };
      if (sort){
        demoarary = demoarary.sort(function (a, b) {
          const packageA = packageWeights[a.packagename];
          const packageB = packageWeights[b.packagename];

          return packageA - packageB;
        })

      }
      else{
        demoarary = demoarary.sort(function (a, b) {
          const packageA = packageWeights[a.packagename];
          const packageB = packageWeights[b.packagename];

          return packageB-packageA;
        })

      }
    }
    if( sortby=="subdate"){
      if(sort){
        demoarary=  demoarary.sort(function (a, b) {
          const dateA = a.expiry;
          const dateB = b.expiry;
          if (a.package === "free") {
            return 1; // Move "Not Available" to the end of the array
          }
          if (b.package === "free") {
            return -1; // Move "Not Available" to the end of the array
          }

          const dateObjA = new Date(dateA);
          const dateObjB = new Date(dateB); 

          return dateObjA - dateObjB;
        
        })
      }
      else{
        demoarary=  demoarary.sort(function (a, b) {
          const dateA = a.expiry;
          const dateB = b.expiry;
          if (a.package === "free") {
            return 1; // Move "Not Available" to the end of the array
          }
          if (b.package === "free") {
            return -1; // Move "Not Available" to the end of the array
          }

          const dateObjA = new Date(dateA);
          const dateObjB = new Date(dateB); 

          return  dateObjB - dateObjA;
        
        })
      }
    }
    if(searchword!="" ){
      setsearchlist(demoarary)
    }else{
    setdatalist(demoarary)
    }
  };

  const searchitem=()=>{
    const filteredArray = datalist.filter(obj => obj.useremail.toLowerCase().includes(enteredword));
    setsearchlist(filteredArray)
  }




  return (
    <div>
      <div className="flex justify-between mt-8 items-center">
        <div className="ml-6 text-[20px] font-semibold">
          Total Number of Subscriptions : {datalist.length}
        </div>
        <div className="flex items-center">
          <div className="text-[18px] font-normal ">
            <input
              type="text"
              placeholder="Enter Email"
              className="bg-slate-200 border-2 rounded-2xl px-4 py-2 mr-2"
              onChange={(e) => {
                setenteredword(e.target.value);
              }}
              value={enteredword}
            ></input>
          </div>
          <div
            className="p-2 hover:bg-green-600 rounded-2xl text-white bg-[#34bd32] font-normal cursor-pointer mr-12"
            onClick={() => {
              setsearchword(enteredword);
              searchitem();
            }}
          >
            Search
          </div>
        </div>
      </div>
      <div className=" flex items-center h-16 border-y-2 border-gray-300 shadow-xl font-semibold text-[20px] mt-6 w-full">
            <div className=" w-[5%] pr-2 pl-6 h-full flex items-center justify-between">
              <div>Sr#</div>
            </div>
            <div className=" w-[17%] pr-2 pl-6 h-full flex items-center justify-between">
              <div>User Name</div>
              <div>
                <BiSort
                  className="h-8 text-[12px] w-8 hover:text-green-600 text-gray-400"
                  onClick={() => {
                    setsortby("name");
                    sortdata();
                  }}
                />
              </div>
            </div>
            <div className=" w-[28%] pr-2 pl-6 h-full flex items-center justify-between">
              <div>Email</div>
              <div>
                <BiSort
                  className="h-8 text-[12px] w-8 hover:text-green-600 text-gray-400"
                  onClick={() => {
                    setsortby("email");
                    sortdata();
                  }}
                />
              </div>
            </div>
            <div className=" w-[15%] pr-2 pl-6 h-full flex items-center justify-between">
              <div>Package</div>
              <div>
                <BiSort
                  className="h-8 text-[12px] w-8 hover:text-green-600 text-gray-400"
                  onClick={() => {
                    setsortby("package");
                    sortdata();
                  }}
                />
              </div>
            </div>
            <div className=" w-[20%] pr-2 pl-6 h-full flex items-center justify-between">
              <div>Subscription Date</div>
              <div>
                <BiSort
                  className="h-8 text-[12px] w-8 hover:text-green-600 text-gray-400"
                  onClick={() => {
                    setsortby("subdate");
                    sortdata();
                  }}
                />
              </div>
            </div>
            <div className=" w-[17%] pr-2 pl-6 h-full flex items-center justify-between">
              <div>Expiry Date</div>
              <div>
                <BiSort
                  className="h-8 text-[12px] w-8 hover:text-green-600 text-gray-400"
                  onClick={() => {
                    setsortby("subdate");
                    sortdata();
                  }}
                />
              </div>
            </div>
            <div className=" w-[10%] pr-2 pl-6 h-full flex items-center justify-between">
              <div>Price</div>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden h-[600px]">
            {searchword==""  &&  datalist.map((e, i) => subscriptiontile(e, i))}
            {searchword!=""  &&  searchlist.map((e, i) => subscriptiontile(e, i))}
            {(searchword=="" && datalist.length==0) && <div className="w-full mt-24 text-center text-2xl font-semibold text-gray-500">No users Found</div>}
            
            {(searchword!="" && searchlist.length==0) && <div className="w-full mt-24 text-center text-2xl font-semibold text-gray-500">No users Found</div>}
          </div>
    </div>
  );
}
