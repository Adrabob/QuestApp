import { useParams } from "react-router-dom";
import UserActivity from "../../UserActivity/UserActivity";
import Avatar from "../Avatar/Avatar";
import React, { useEffect, useState } from "react";
import { GetWithAuth } from "../../services/HttpService";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        GetWithAuth("/users/" + userId)
            .then((response) => {
                
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    
    return (
        <div style={{display:'flex'}}>
            {user ? <Avatar avatarId={user.avatarId} userId={userId} userName={user.userName} /> :""}
            {localStorage.getItem("currentUser") === userId ? <UserActivity  userId = {userId}/> : ""}
            
        </div>
    )
}
export default User;