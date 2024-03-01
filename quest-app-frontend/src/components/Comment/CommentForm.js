import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { PostWithAuth } from '../../services/HttpService';

function CommentForm(props) {
    const { userId, postId, setCommentRefresh } = props;
    const [text, setText] = React.useState('');


    const saveComment = () => {
        PostWithAuth('/comments', {
            postId: postId,
            text: text,
            userId: userId
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
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