import { useState } from "react";
import axios from "axios";

const LoginPage = ({islogined, setIsLogined}) => {

    const [user,setUser] = useState({email:"",password:""});
    const [error,setError] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/login", {
            email: user.email, password: user.password
        })
        .then(({data})=>{
            const {message, nickname} = data;
            if(message!==''){
                setError(message);
            } else {
                sessionStorage.setItem("nickname", nickname);
                setIsLogined(true);
                setError("");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const logout = () =>{
        sessionStorage.removeItem('nickname');
        setError("");
        setUser({email:"",password:""});
        setIsLogined(false);
    }

    return(
        <div>
            {islogined ? <><button type="submit" onClick={logout}>logout</button> <br/> <p>hello {sessionStorage.getItem('nickname')}</p></> : 
            <><form>
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