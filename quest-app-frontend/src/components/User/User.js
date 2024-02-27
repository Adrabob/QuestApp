import UserActivity from "../../UserActivity/UserActivity";
import Avatar from "../Avatar/Avatar";
import React from "react";

function User() {
    return (
        <div style={{display:'flex'}}>
            <Avatar avatarId={0} />
            <UserActivity />
        </div>
    )
}
export default User;