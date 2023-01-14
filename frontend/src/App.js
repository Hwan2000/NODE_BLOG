import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import Main from "./components/Main";
import axios from "axios";

function App() {
  const [islogined, setIsLogined] = useState(false);

  useEffect(() => {
    const checkLogined = async () => {
      const nickname = sessionStorage.getItem('nickname');
      await axios.post("http://localhost:5000/login/check",{
        nickname: nickname
      })
      .then(({data})=>{
        const {islogined} = data;
        setIsLogined(islogined);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    checkLogined();
  });

  return (
    <div style={{display: 'flex'}}>
      <Main/>
      <LoginPage islogined={islogined} setIsLogined={setIsLogined}/>
    </div>
  );
}

export default App;