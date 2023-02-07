import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom";
import axios from "axios";

const Main = ({islogined, nickName, setIsLogined, setNickName}) => {

    const [pageNum, setPageNum] = useState(1);
    const [articleList, setArticleList] = useState([]);

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

    const pageLeft = () => {
        setPageNum(pageNum+1);
    }

    const pageRight = () => {
        if(pageNum===1){
            return;
        } else {
            setPageNum(pageNum-1);
        }
    }

    useEffect(() => {
        const getPages = async () => {
          await axios.post("http://localhost:5000/articleapi", {pageNum:pageNum})
          .then(({data}) => {
            setArticleList(data.articles);
            
          })
          .catch((err)=>{
              console.log(err);
          })
        }
        getPages();
      }, [pageNum]);

      console.log(articleList);

    return(
        <>
            <h1>Main Page</h1>
            {islogined ? <span>hello, {nickName}</span>: <span>login plz -&gt; </span>}
            {islogined ? <button onClick={logOut}>logout</button>:<Link to="/login"><button>login</button></Link>}
            {islogined ? <Link to="/write"><button>글쓰기</button></Link>: <></>}
            <br/>
            {articleList.map((article) => (
                <Link to={`/article/${article.id}`} key={article.id}>
                <br/>
                <span>{article.title}</span>
                <span> {article.likes}</span>
                <span> {article.dislikes}</span>
                <span> {article.comments_count}</span>
                <span> {article.writer}</span>
                <br/>
                </Link>
            ))}
            <br/>
            <button onClick={pageRight}>&lt;</button>{pageNum}<button onClick={pageLeft}>&gt;</button>
        </>
    )
}

export default Main;