import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteWithAuth } from '../../services/HttpService';


function Comment(props) {
    const { userName, text, userId, commentId, refreshComments} = props;
    const handleDelete = () => {
        
        DeleteWithAuth('/comments/' + commentId)
        .then((response) => {
            console.log(response);
            refreshComments();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <CardContent sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }} >
                <OutlinedInput
                sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                        },
                    }}
                    disabled
                id="outlined-adornment-amount"
                multiline
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
                endAdornment={
                    <InputAdornment position="end">
                        {localStorage.getItem("currentUser") === ""+userId ? <Button variant='' onClick={() => handleDelete()}><DeleteIcon /></Button> : ""}
                    </InputAdornment>
                }
                >
                </OutlinedInput>
            </CardContent>
        </div>
    )
}

export default Comment;