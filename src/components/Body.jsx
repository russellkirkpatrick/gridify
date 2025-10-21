import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Stats from "./Stats";
import Save from "./Save";

const Body = () => {
  return (
    <div className="flex-1 flex items-center justify-center text-white">
      <Routes>  
        <Route path="/" element={<Login />} />
        <Route path="/connected" element={<Stats />} />
        <Route path="/save" element={<Save />} />
      </Routes>
    </div>
  );
}

export default Body