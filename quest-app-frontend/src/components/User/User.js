import { useParams } from "react-router-dom";
import UserActivity from "../../UserActivity/UserActivity";
import Avatar from "../Avatar/Avatar";
import React, { useEffect, useState } from "react";
import axios from "axios";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        axios.get("/users/" + userId,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("tokenKey")
                }
            })
            .then((response) => {
                
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    
    return (
        <div style={{display:'flex'}}>
            {user? <Avatar avatarId={user.avatarId}/> : ""}
            <UserActivity  userId = {userId}/>
        </div>
    )
}
export default User;