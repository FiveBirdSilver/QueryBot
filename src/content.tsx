// export default App;
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";

const root = document.createElement("div");
root.id = "gen_Aion_root";
document.body.appendChild(root);

ReactDOM.createRoot(document.getElementById("gen_Aion_root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
