import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const LoginPage = ({islogined, setIsLogined, nickName, setNickName}) => {

    const [user,setUser] = useState({email:"",password:""});
    const [error,setError] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/login", {
            email: user.email, password: user.password
        })
        .then(({data})=>{
            const {message, nickname} = data;
            if(nickname===''){
                setError(message);
            } else {
                setNickName(nickname);
                setIsLogined(true);
                setError("");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const logOut = async (e) =>{
        e.preventDefault();
        await axios.get("http://localhost:5000/login/out",{withCredentials:true})
        .then(()=>{
            setNickName("");
            setIsLogined(false);
            setError("");
            setUser({email:"",password:""});
        })
        .catch((err)=>{
            console.log(err);
        })   
    }

    return(
        <div>
            {islogined ? 
            <>
                <p>hello {nickName}</p>
                <button type="submit" onClick={logOut}>logout</button>
            </>
                : 
            <>
                <form>
                    <label>Email:</label>
                    <input type="email" value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})}/>
                    <br/>
                    <label>password:</label>
                    <input type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                    <br/>
                    <button type="submit" onClick={onSubmitHandler}>Submit</button>
                </form>
                <p>{error}</p>
            </>}
        </div>
    )
}

export default LoginPage;