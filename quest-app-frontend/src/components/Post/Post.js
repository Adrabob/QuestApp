
import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Comment from '../Comment/Comment';
import { Container } from '@mui/material';
// import { ReactDOM } from 'react';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme}) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
 
function Post(props) {
    const { userName, title, text, postId, userId} = props;
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = React.useRef(true);
    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
      };

    const handleLike = () => {
        setLiked(!liked);
    }

    const refreshComments = () => {
      fetch("/comments?postId=" + postId)
      .then(res => res.json())
      .then(
          (result) => {
              setIsLoaded(true);
              setCommentList(result);
          },
          (error) => {
              setIsLoaded(true);
              setError(error);
          }
      )
    }

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        refreshComments();
      }
    },[commentList]);
    return (
        <Card sx={{ width: 800, margin:3 }}>
      <CardHeader
        avatar={
          
            <Link style={{textDecoration:'none'}} to={{pathname : '/users/' + userId}} >
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
            {userName.charAt(0).toUpperCase()}
            </Avatar>
            </Link>
        }
        style={{textAlign:'left'}}
        title={title.charAt(0).toUpperCase() + title.slice(1)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={{textAlign:'left'}}>
         {text.charAt(0).toUpperCase() + text.slice(1)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
        onClick={handleLike}
        aria-label="add to favorites">
          <FavoriteIcon style={liked? {color:'red'} : null} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon style={expanded ? null : {color:'blue'}} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed>
        {error? "error" :
        isLoaded? commentList.map(comment => (
                    <Comment userId={1} userName={"User"} text={comment.text}></Comment> 
                     
                )) : "Loading..."}
        </Container>
      </Collapse>
    </Card>
    )
}

export default Post;