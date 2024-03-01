import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PostWithoutAuth } from "../../services/HttpService";

function Auth() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    let navigate = useNavigate();

    const handleUsername = (username) => {
        setUsername(username);
    }
    
    const handlePassword = (password) => { 
        setPassword(password);
    }

    const sendRequest = (path) => {
        PostWithoutAuth("/auth/"+path, {
            userName: username,
            password: password
        })
        .then((response) => {
            console.log(response);
            localStorage.setItem("tokenKey", response.data.message);
            localStorage.setItem("currentUser", response.data.userId);
            localStorage.setItem("userName", username);
            navigate(0);
        })
        .catch((error) => {
            console.log(error);
            navigate(0);
        });
        
    }

    const handleButton = (value) => {
        sendRequest(value);
        setPassword("");
        setUsername("");
        console.log(localStorage.getItem("tokenKey"));
        console.log(localStorage.getItem("currentUser"));
        console.log(localStorage.getItem("userName"));
    }

    return (
        
            <FormControl>
                <InputLabel style={{top:10}}>Username</InputLabel>
                <Input
                onChange={(e) => {
                        handleUsername(e.target.value);
                }}
                />
                <InputLabel style={{top:95}} >Password</InputLabel>
                <Input style={{top:40}}
                onChange={(e) => {
                    handlePassword(e.target.value);
                }}
                />
                <Button 
                variant="contained" 
                sx={{ background: 'linear-gradient(to right top, #f30101, #60060c)'}}
                style={{marginTop:60}}
                onClick={() => handleButton("register")}
                >Register
                </Button>
                <FormHelperText style={{margin:20}}>Already have an account? Login</FormHelperText>
                <Button 
                variant="contained" 
                sx={{ background: 'linear-gradient(to right top, #f30101, #60060c)'}}
                onClick={() => handleButton("login")}
                >Login
                </Button>
            </FormControl>
    
    );
}
export default Auth;