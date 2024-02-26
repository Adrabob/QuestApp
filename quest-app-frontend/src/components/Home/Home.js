import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";


function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPost = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error);
            }
        )
    }
    

    useEffect(() => {
         refreshPost();
    }, []);

    if (error) {
        return <div>Error!!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            
    
      
      <div style={{backgroundColor:'#FFFAF0', display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center'  }} >
      {localStorage.getItem("currentUser") == null ?"":<PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPost={refreshPost}/>}
            
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post> 
                     
                ))}

      </div>
    
                
        );
    }

    
}
export default Home; 