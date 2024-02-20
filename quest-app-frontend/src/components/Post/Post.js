import React from 'react';
import "./Post.scss";
// import { ReactDOM } from 'react';

function Post(props) {
    const { title, text } = props;

    return (
        <div className="postContainer">
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}

export default Post;