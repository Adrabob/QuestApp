import { useParams } from "react-router-dom";
import UserActivity from "../../UserActivity/UserActivity";
import Avatar from "../Avatar/Avatar";
import React from "react";

function User() {
    const { userId } = useParams();
    return (
        <div style={{display:'flex'}}>
            <Avatar avatarId={0} />
            <UserActivity  userId = {userId} />
        </div>
    )
}
export default User;