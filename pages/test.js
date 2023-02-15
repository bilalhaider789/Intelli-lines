import InputRange from "react-input-range";
import React, { useState } from "react";
export default function Test(){
    const [files, setFiles] = useState([]);

  // handle file selection
  const handleChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <div>
      <input type="file" multiple onChange={handleChange} />
      <div style={{ width: "200px", height: "200px", overflow: "auto" }}>
        {files.map((file) => (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            key={file.name}
            style={{ width: "100px", height: "100px" }}
          />
        ))}
      </div>
    </div>
  );
}