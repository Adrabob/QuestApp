
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Alert, Button, InputAdornment, OutlinedInput, Snackbar} from '@mui/material';
import axios from 'axios';
// import { ReactDOM } from 'react';


function PostForm(props) {
    const { userName, userId, refreshPost} = props;
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const [isSent, setIsSent] = React.useState(false);
  

    const savePost = () => {
        axios.post('/posts', {
            title: title,
            text: text,
            userId: userId
          },{
            headers: {
              "Authorization": localStorage.getItem("tokenKey"), 
              'Content-Type': 'application/json'},
          })
          .then(function (response) {
            console.log(response);
            
          })
          .catch(function (error) {
            console.log(error);
            console.log(text);
            console.log(title);
          });
    }   

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle('');
        setText('');
        refreshPost();
    }

    const handleTitle = (title) => {
        setTitle(title);
        setIsSent(false);
    }

    const handleText = (text) => {
        setText(text);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSent(false);
      };

    return (
        <div>
        <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'center' }} open={isSent} autoHideDuration={2000} onClose={handleClose}>
        <Alert variant="filled" severity="success">
            Post shared successfully
        </Alert>
        </Snackbar>
        <Card sx={{ width: 800, margin:3 }}>
        <CardHeader
            avatar={
            
                <Link style={{textDecoration:'none'}} to={{pathname : '/users/' + userId}} >
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
                </Avatar>
                </Link>
            
            }
            
            title={<OutlinedInput
            id="outlined-adornment-amount"
            multiline
            placeholder='Title'
            inputProps={{maxLength:"25"}}
            fullWidth
            value={title}
            onChange={(i) => handleTitle(i.target.value)}>

            </OutlinedInput>
            }
        />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {<OutlinedInput
        id="outlined-adornment-amount"
        multiline
        placeholder='Text'
        inputProps={{maxLength:"400"}}
        fullWidth
        value={text}
        onChange={(i) => handleText(i.target.value)}
        endAdornment={
            <InputAdornment position="end">
                <Button 
                variant="contained" 
                sx={{ background: 'linear-gradient(to right top, #f30101, #60060c)'}}
                onClick={handleSubmit}
                >Post
                </Button>
            </InputAdornment>
        }>
        </OutlinedInput>}
        </Typography>
      </CardContent>
    </Card>
    </div>
    )
}

export default PostForm;