import React from "react";
import { useParams } from "react-router-dom";

function User() {
    const { userId } = useParams();
    return (
        <div>
            <h1>User</h1>
            <p>UserId: {userId}</p>
        </div>
    )
}
export default User;