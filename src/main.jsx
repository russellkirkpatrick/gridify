import { createRoot } from "react-dom/client";
import Layout from "./Layout.jsx";
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Store } from "./Store.jsx";
import Stats from "./components/Stats.jsx";
import Save from "./components/Save.jsx";



createRoot(document.getElementById("root")).render(
  <Store>
    <BrowserRouter basename="/gridify">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/connected" element={<Stats />} />
        <Route path="/save" element={<Save />} />
      </Routes>
    </BrowserRouter>
  </Store>
);
