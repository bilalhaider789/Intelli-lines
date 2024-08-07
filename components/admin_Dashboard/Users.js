import { BiSort } from "react-icons/bi";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { ConfirmationModal } from "../others/ConfirmationModal";
import { useEffect } from "react";
import LoadingModal from "../others/LoadingModal";
import EditUser from "./EditUser";

export default function Users(props) {
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
          `${process.env.NEXT_PUBLIC_NODE}admin/users`,
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

  const fetchusersAfterDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE}admin/users`,
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

  const sortdata = () => {
    var demoarary = datalist;
    if (searchword!="" ){
      demoarary=searchlist
    }
    setsort(!sort);
    if (sortby == "name") {
      if (sort) {
        demoarary = demoarary.sort(function (a, b) {
          if (a["name"] < b["name"]) {
            return -1;
          } else if (a["name"] > b["name"]) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        demoarary = demoarary.sort(function (a, b) {
          if (a["name"] > b["name"]) {
            return -1;
          } else if (a["name"] < b["name"]) {
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
          const emailA = a.email.toLowerCase();
          const emailB = b.email.toLowerCase();
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
          const emailA = a.email.toLowerCase();
          const emailB = b.email.toLowerCase();
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
          const packageA = packageWeights[a.package];
          const packageB = packageWeights[b.package];

          return packageA - packageB;
        })

      }
      else{
        demoarary = demoarary.sort(function (a, b) {
          const packageA = packageWeights[a.package];
          const packageB = packageWeights[b.package];

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

  const deleteuser = async () => {
    console.log(deleteid);
    setconfirmation(false);
    setloading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE}admin/deleteuser`,
        {
          method: "POST",
          body: JSON.stringify({
            id: deleteid,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setloading(false);
      if (data.success == "1") {
        console.log(data);
        var newarray = datalist.filter((item) => item.id != deleteid);
        setdatalist(newarray);
        fetchusersAfterDelete();

        // modifylist(id)
        // sortdata()
      }
    } catch (e) {
      console.log(e);
      setloading(false);
    }
  };

  const setsubscriptiondate = (date) => {
    const newdate = new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const dateobject = new Date(newdate);
    dateobject.setMonth(dateobject.getMonth() - 1);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = dateobject.toLocaleString("en-US", options);
    return formattedDate;
  };

  const usertile = (e, i) => {
    return (
      <div
        className=" flex items-center h-16  font-semibold text-[20px] mt-6 w-full border-b-2 "
        key={i}
        
      >
        <div className=" w-[5%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>{i+1}</div>
        </div>
        <div className=" w-[17%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>{e.name}</div>
        </div>
        <div className=" w-[28%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>{e.email}</div>
        </div>
        <div className=" w-[15%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>{e.package == "free" ? "Free" : e.package}</div>
        </div>
        <div className=" w-[20%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>
            {e.package != "free"
              ? setsubscriptiondate(e.expiry)
              : "Not Available"}
          </div>
        </div>
        <div className=" w-[17%] pr-2 pl-6 h-full flex items-center justify-between">
          <div>
            {e.package != "free"
              ? new Date(e.expiry).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not Available"}
          </div>
        </div>
        <div className=" w-[10%]  h-full flex items-center justify-center">
          <div>
            <IconButton className="" onClick={()=>{setselecteduser(e); setscreen("modifyuser")}}>
              <MdModeEditOutline className="text-green-700 h-12 w-12 p-2 bg-slate-300 rounded-full" />
            </IconButton>
            <IconButton
              className=""
              onClick={() => {
                setdeleteid(e._id);
                setconfirmation(true);
              }}
            >
              <MdDelete className="text-red-700 h-12 w-12 p-2 bg-slate-300 rounded-full" />
            </IconButton>
          </div>
        </div>
      </div>
    );
  };

  const searchitem=()=>{
    const filteredArray = datalist.filter(obj => obj.email.toLowerCase().includes(enteredword));
    setsearchlist(filteredArray)
  }

  return (
    <div>
      {screen =="allusers" && <div className="w-full h-full ">
        <div className="flex justify-between mt-8 items-center">
          <div className="ml-6 text-[20px] font-semibold">
            Total Number of Users : {datalist.length}
          </div>
          <div className="flex items-center">
            <div
              className="py-2 px-4 hover:bg-green-600 rounded-2xl text-white bg-[#34bd32] font-normal cursor-pointer mr-12 flex gap-2"
              onClick={() => {
                props.adduser();
              }}
            >
              Add new User
              <AiOutlineUserAdd className=" font-bold w-6 h-6" />
            </div>
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
              onClick={() => {setsearchword(enteredword); searchitem()}}
            >
              Search
            </div>
          </div>
        </div>
        <div>
          <div className=" flex items-center h-16 border-y-2 border-gray-300 shadow-xl font-semibold text-[20px] mt-6 w-full">
            <div className=" w-[5%] pr-2 pl-6 h-full flex items-center justify-between">
              <div>Sr#</div>
            </div>
            <div className=" w-[17%] pr-2 pl-6 h-full flex items-center justify-between">
              <div>Name</div>
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
              <div>Functions</div>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden h-[600px]">
            {searchword==""  &&  datalist.map((e, i) => usertile(e, i))}
            {searchword!=""  &&  searchlist.map((e, i) => usertile(e, i))}
            {(searchword=="" && datalist.length==0) && <div className="w-full mt-24 text-center text-2xl font-semibold text-gray-500">No users Found</div>}
            
            {(searchword!="" && searchlist.length==0) && <div className="w-full mt-24 text-center text-2xl font-semibold text-gray-500">No users Found</div>}
          </div>
          {confirmation && (
            <ConfirmationModal
              message={
                "Are you Sure You want to Delete this User? No money will be refunded to user."
              }
              onsubmit={() => deleteuser()}
              oncancel={setconfirmation}
            ></ConfirmationModal>
          )}
      
          <LoadingModal state={loading}></LoadingModal>
        </div>
      </div>}
      {screen =="modifyuser" && <EditUser user={selecteduser} changescreen={()=>{setscreen("allusers");fetchusersAfterDelete()}}/>}
    </div>
  );
}
