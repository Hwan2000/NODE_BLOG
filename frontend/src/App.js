import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import Main from "./components/Main";
import axios from "axios";

function App() {
  const [islogined, setIsLogined] = useState(false);
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    const checkLogined = async () => {
      await axios.get("http://localhost:5000/login/check")
      .then(({data}) => {
          setIsLogined(data.isLogined);
          setNickName(data.nickname);
      })
      .catch((err)=>{
          console.log(err);
      })
    }
    checkLogined();
  }, [islogined, nickName]);

  return (
    <div style={{display: 'flex'}}>
      <Main/>
      <LoginPage islogined={islogined} setIsLogined={setIsLogined} nickName={nickName} setNickName={setNickName}/>
    </div>
  );
}

export default App;