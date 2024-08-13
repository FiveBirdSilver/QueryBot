import { useState } from "react";
import ReactDOM from "react-dom";

import Popup from "./popup";

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button className="gen_Aion_open" onClick={() => setVisible(!visible)} />
      {visible && ReactDOM.createPortal(<Popup />, document.body)}
    </>
  );
};

export default App;
