import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { PostWithAuth, RefreshToken } from '../../services/HttpService';


function CommentForm(props) {
    const { userId, postId, setCommentRefresh } = props;
    const [text, setText] = React.useState('');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("refreshKey");
        localStorage.removeItem("userName");
        navigate(0);
      }

    const saveComment = () => {
        PostWithAuth('/comments', {
            postId: postId,
            text: text,
            userId: userId
          })
          .then((response) => {
            console.log(response);
            })
          .catch(error => {
            if(error.response.status === 401){
                RefreshToken()
                .then((response) => {
                    console.log(response);
                    if(!response.status === 200){
                        logout();
                    }else if(response.data.accessToken != null){
                        console.log(response.data);
                        localStorage.setItem("tokenKey", response.data.accessToken);
                        saveComment();
                        setCommentRefresh(true);
                    }else{
                        console.log("Token is null");
                    }})
                .catch((error) => {
                  console.log(error);
                })
            }else{
                console.log(error);
            }});
    }   

    const handleSubmit = () => {
        saveComment();
        setText('');
        setCommentRefresh(true);
    }

    const handleText = (text) => {
        setText(text);
       
    }
    return (
        <div>
            <CardContent sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Title"
                inputProps={{maxLength: 250}}
                fullWidth
                value={text}
                onChange={(e) => handleText(e.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link style={{textDecoration:'none'}} to={{pathname : '/users/' + userId}} >
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
                                {localStorage.getItem("userName").charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                        
                    </InputAdornment>
                }
                endAdornment={
                <InputAdornment position="end">
                    <Button 
                    variant="contained" 
                    sx={{ background: 'linear-gradient(to right top, #f30101, #60060c)'}}
                    onClick={handleSubmit}
                    >Comment
                    </Button>
                </InputAdornment>
                }
                ></OutlinedInput>
            </CardContent>
        </div>
    )
}
export default CommentForm;