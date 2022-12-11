import SyncLoader from "react-spinners/SyncLoader";

const LoadingModal = (props) => {
  
  return (
    <div>
        {props.state && <div>
          <div className="bg-gray-400 opacity-40 h-full w-full absolute top-0 left-0"></div>
          <div className="bg-transparent h-full w-full absolute top-0 left-0 flex justify-center items-center">
            <SyncLoader color={"#36d7b7"} loading={props.state} size={25} />
          </div>
        </div>}
    </div>
  );
};
export default LoadingModal;
