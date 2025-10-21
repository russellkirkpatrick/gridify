import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Store } from "./Store.jsx";
import Layout from "./Layout.jsx";
import './index.css';





createRoot(document.getElementById("root")).render(
  <Store>
    <BrowserRouter basename="/gridify">
      <Layout />
    </BrowserRouter>
  </Store>
);
