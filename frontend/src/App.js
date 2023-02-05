import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import WritePage from "./components/WritePage";
import SignUpPage from "./components/SignUpPage";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

function App() {
  const [islogined, setIsLogined] = useState(false);
  const [nickName, setNickName] = useState("unknown");

  useEffect(() => {
    const checkLogined = async () => {
      await axios.get("http://localhost:5000/loginapi/check", {withCredentials:true})
      .then(({data}) => {
          setIsLogined(data.islogined);
          setNickName(data.nickname);
      })
      .catch((err)=>{
          console.log(err);
      })
    }
    checkLogined();
  }, [islogined, nickName]);


  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage islogined={islogined} setIsLogined={setIsLogined} nickName={nickName} setNickName={setNickName}/>}/>
        <Route path="/login" element={<LoginPage islogined={islogined} setIsLogined={setIsLogined} nickName={nickName} setNickName={setNickName}/>}/>
        <Route path="/write" element={<WritePage nickName={nickName}/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </div>
  );
}

export default App;