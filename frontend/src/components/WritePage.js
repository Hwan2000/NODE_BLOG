import { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Write ({nickName}) {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const handleOnSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/writeapi',{
                title:title,
                contents:contents,
                writer:nickName
            })
            console.log(res);
        } catch(error){
            console.error(error);
        }
    }

    return(
        <>
            <p>Write page</p>
            <form onSubmit={handleOnSubmit}>
                <label>
                    Titile
                    <br/>
                  <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                </label>
                <br/>
                <label>
                    Contents
                    <br/>
                    <textarea value={contents} onChange={(e)=>{setContents(e.target.value)}}/>
                </label>
                <br/>
                <button type="submit">regist</button>
            </form>
            <Link to="/"><button>cancel</button></Link>
        </>
    )
}

export default Write;