import axios from "axios";
import { useEffect, useState } from "react";

function Popup() {
  const [data, setdata] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post("https://chatbot-api-xbuguatioa-du.a.run.app/ga4astream", {
        user_input: "App에서 SetUserProperty만 사용하고 있는데, setUserId를 사용 안해도 상관 없나요? ",
        session_id: "1123451125",
      });
      console.log(response.data);
      setdata(response.data);
    };
    getData();
  }, []);

  return <div className="Popup">{data}</div>;
}

export default Popup;
