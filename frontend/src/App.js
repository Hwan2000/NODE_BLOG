import { useState, useMemo } from "react";
import LoginPage from "./components/LoginPage";
import Main from "./components/Main";
import Write from "./components/Write";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

function App() {
  const [islogined, setIsLogined] = useState(false);
  const [nickName, setNickName] = useState("unknown");

  useMemo(() => {
    const checkLogined = async () => {
      await axios.get("http://localhost:5000/loginapi/check")
      .then(({data}) => {
          setIsLogined(data.isLogined);
          setNickName(data.nickname);
      })
      .catch((err)=>{
          console.log(err);
      })
    }
    checkLogined();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main islogined={islogined} setIsLogined={setIsLogined} nickName={nickName} setNickName={setNickName}/>}/>
        <Route path="/login" element={<LoginPage islogined={islogined} setIsLogined={setIsLogined} nickName={nickName} setNickName={setNickName}/>}/>
        <Route path="/singup" element={<p>do you want to make account?</p>}/>
        <Route path="/write" element={<Write nickName={nickName}/>}/>
      </Routes>
    </div>
  );
}

export default App;