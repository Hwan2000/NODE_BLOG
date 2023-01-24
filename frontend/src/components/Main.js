import React from "react"
import {Link} from "react-router-dom";
import axios from "axios";

const Main = ({islogined, nickName, setIsLogined, setNickName}) => {

    const logOut = async (e) =>{
        e.preventDefault();
        await axios.get("http://localhost:5000/loginapi/logout",{withCredentials:true})
        .then(()=>{
            setNickName("");
            setIsLogined(false);
        })
        .catch((err)=>{
            console.log(err);
        })   
    }

    return(
        <>
            <h1>Main Page</h1>
            {islogined ? <span>hello, {nickName}</span>: <span>login plz</span>}
            {islogined ? <button onClick={logOut}>logout</button>:<Link to="/login"><button>login</button></Link>}
        </>
    )
}

export default Main;