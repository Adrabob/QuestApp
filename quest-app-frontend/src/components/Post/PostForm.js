
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Button, InputAdornment, OutlinedInput } from '@mui/material';
// import { ReactDOM } from 'react';


function PostForm(props) {
    const { userName} = props;
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const handleSubmit = () => {
        console.log(title);
        console.log(text);
    }
    const handleTitle = (title) => {
        setTitle(title);
    }
    const handleText = (text) => {
        setText(text);
    }

    return (
        <Card sx={{ width: 800, margin:3 }}>
      <CardHeader
        avatar={
          
            <Link style={{textDecoration:'none'}} to={{pathname : '/users/' + props.userId}} >
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
        onChange={(i) => handleText(i.target.value)}
        endAdornment={
            <InputAdornment position="end">
                <Button 
                variant="contained" 
                style={{ background: 'linear-gradient(to right top, #f30101, #60060c)'}}
                onClick={handleSubmit}
                >Post
                </Button>
            </InputAdornment>
        }>
        </OutlinedInput>}
        </Typography>
      </CardContent>
    </Card>
    )
}

export default PostForm;