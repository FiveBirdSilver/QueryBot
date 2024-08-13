// export default App;
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
