
export function ConfirmationModal(props) {
  
    let message= props.message

    return (
      <div>
      <div className="bg-gray-400 opacity-40 h-full w-full absolute top-0 left-0 "></div>
      <div className="bg-transparent h-full w-full absolute top-0 left-0 flex justify-center items-center">
      <div className=" w-[90%] h-[30%] md:w-[50%] lg:w-[20%]  bg-white shadow-2xl rounded-2xl flex flex-col justify-center items-center  z-[1000]" > 
          <div className="font-serif text-2xl lg:text-xl font-bold text-right w-full mr-8 cursor-pointer" onClick={()=> props.oncancel(false)}> ❌</div> 
          <div className="font-serif text-md lg:text-lg font-bold text-[#2f9c5e] mt-2 text-center">{message}</div>
          <button
                  className="bg-[#14af4f] h-10 text-white rounded-xl w-[150px] hover:bg-[#32dd66] text-xl mt-5"
                  onClick={()=> props.onsubmit()}
                >
                  Confirm
                </button>
          </div>
      </div>
      </div>
    );
  
  }