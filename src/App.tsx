import { useState } from "react";
import ReactDOM from "react-dom";

import Popup from "./popup";
import useOpen from "./hooks/useOpen";

const App = () => {
  const { open, setOpen } = useOpen();

  return (
    <>
      <button className="gen_Aion_open" onClick={() => setOpen(!open)} />
      {open && ReactDOM.createPortal(<Popup />, document.body)}
    </>
  );
};

export default App;
