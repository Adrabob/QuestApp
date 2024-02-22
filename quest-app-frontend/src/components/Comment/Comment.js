import { Avatar, CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';

function Comment(props) {
    const { userName, text, userId } = props;
    return (
        <div>
            <CardContent>
                <OutlinedInput
                disabled
                id="outlined-adornment-amount"
                multiline
                placeholder="Title"
                inputProps={{maxLength: 25}}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link style={{textDecoration:'none'}} to={{pathname : '/users/' + userId}} >
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style={{color:'black', backgroundColor:'#FFFAF0'}}
                >
                </OutlinedInput>
            </CardContent>
        </div>
    )
}

export default Comment;