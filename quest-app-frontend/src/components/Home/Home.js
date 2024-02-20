import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";


function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    if (error) {
        return <div>Error!!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            
    <React.Fragment>
      
      <div style={{backgroundColor:'#FFFAF0', display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center'  }} >
            <PostForm userId={1} userName={"asdgfsadg"} title={"arda"} text={"post.text"}></PostForm>
                {postList.map(post => (
                    <Post userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post> 
                     
                ))}

      </div>
    </React.Fragment>
                
        );
    }

    
}
export default Home; 