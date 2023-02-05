import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp () {

    const [email,setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [buttonDis, setButtonDis] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        await axios.post('http://localhost:5000/signupapi', {
            email: email,
            nickName:nickName,
            password:password,
            checkPassword:checkPassword,
        })
        .then(({data})=>{
            if(data === 'complete'){
                navigate("/");
            } 
        })
    }

    useEffect(() => {
     const checkEmail = async () =>{
        await axios.post("http://localhost:5000/signupapi/check",{
            email: email,
            nickName:nickName,
            password:password,
            checkPassword:checkPassword,
        })
        .then(({data})=>{
            setErrorMessage(data);
        })
        .catch((err) => {
            console.log(err);
        })
     }
     checkEmail();
    },[email,checkPassword,nickName,password]);

    useEffect(() => {
        if(errorMessage === "success"){
            setButtonDis(false);
        } else {
            setButtonDis(true);
        }
    },[errorMessage]);

    return(
        <>
            <form>
                <label>Email</label>
                <br/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <br/>
                <label>nickname</label>
                <br/>
                <input type="text" value={nickName} onChange={(e)=>setNickName(e.target.value)}/>
                <br/>
                <label>password</label>
                <br/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <br/>
                <label>password check</label>
                <br/>
                <input type="password" value={checkPassword} onChange={(e)=>setCheckPassword(e.target.value)}/>
                <br/>
                <button type="submit" disabled={buttonDis} onClick={onSubmitHandler}>Sing Up</button>
            </form>
            {errorMessage === "success" ? <></> : <p>{errorMessage}</p>}
        </>
    )
}

export default SignUp;