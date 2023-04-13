import { AiOutlineArrowLeft } from "react-icons/ai";

import TextField from '@mui/material/TextField';

export default function AddUsers(props) {

    return (<div className="w-full h-full ">
        <div className="flex border-2 h-20 text-[20px] font-semibold items-center">
            <div className="border-r-2 mx-4 pr-4"><AiOutlineArrowLeft className="text-black bg-white w-10 h-10" onClick={()=>props.allusers()}/></div>
            <div className="text-[22px] font-semibold">Enter Details for adding new User</div>
        </div>
        <div className="">
            <div className="flex w-full justify-between">
                <div>
                    <div>
                        Enter User Name:
                    </div>
                    <TextField
                      margin="normal"
                      label="Email Address"
                      autoComplete="email"
                      variant="outlined"
                      fullWidth
                      size="small"
                    //   error={!validemail}
                    //   helperText={!validemail && "Please enter valid email"}
                      onChange={(e) => {
                        // setemail(e.target.value), setvalidemail(true); seteerror(false)
                      }}
                    />

                </div>
                <div>Password</div>
            </div>
            <div>package</div>
        </div>

    </div>)

}