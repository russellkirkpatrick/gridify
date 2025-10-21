import { createRoot } from "react-dom/client";
import Layout from "./Layout.jsx";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Store } from "./Store.jsx";



createRoot(document.getElementById("root")).render(
  <Store>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Store>
);
