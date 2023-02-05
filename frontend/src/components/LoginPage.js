import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const LoginPage = ({islogined, setIsLogined, nickName, setNickName}) => {

    const [user,setUser] = useState({email:"",password:""});
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/loginapi", {
            email: user.email, password: user.password
        })
        .then(({data})=>{
            const {success, nickname, message} = data;
            if(success===false){
                setError(message);
            } else {
                setNickName(nickname);
                setIsLogined(true);
                setError("");
                setUser({email:"",password:""});
                navigate("/");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div>
        <form>
            <label>Email:</label>
            <input type="email" value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})}/>
            <br/>
            <label>password:</label>
            <input type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
            <br/>
            <button type="submit" onClick={onSubmitHandler}>Submit</button>
            </form>
            <Link to="/signup"><p>you don't have account?</p></Link>
            <p>{error}</p>
        </div>
    )
}

export default LoginPage;