import dynamic from "next/dynamic";
import { useState } from "react";
import { Box, Slider } from "@mui/material";

const InputSlider=(props)=>{
    const [value, setvalue]=useState(0)
    const handleRangeChange = (event) => {
        setvalue(event.target.value);
        props.changevalue(event.target.value)
      };
    return (
        
        <div>
            <Slider
                className="w-40 text-[green]"
                aria-label="Temperature"
                defaultValue={20}
                valueLabelDisplay="auto"
                step={5}
                min={5}
                max={80}
                onChange={handleRangeChange}
              />
        </div>
        
    )
}
export default dynamic (() => Promise.resolve(InputSlider), {ssr: false})
