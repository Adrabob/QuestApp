import { AppBar, Button, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography, Dialog, Slide, TableCell } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from "react";
import Post from "../components/Post/Post";
import { GetWithAuth } from "../services/HttpService";
const columns = [
    { 
        id: 'User UserActivity', 
        label: 'User Activity', 
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function PopUp(props){
    const {isOpen, postId, setIsOpen} = props;
    const [open, setOpen] = useState(isOpen);
    const [post, setPost] = useState(null);

    useEffect(() => {
      getPost();
    }, [postId]);
   
    useEffect(() => {
      setOpen(isOpen);
    }, [isOpen]);

    const getPost = () => {
     GetWithAuth("/posts/" + postId)
      .then((response) => {
          setPost(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
    }

    const handleClose = () => {
      setOpen(false);
      setIsOpen(false);
    }



    return(
      post != null ?
      <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text} ></Post>
      </Dialog>
    </React.Fragment> : "Loading..."
    )
  }


  function UserActivity(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([]);
    const {userId} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    
    useEffect(() => {
      getActivity();
    }, []);

    const getActivity = () => {
     GetWithAuth("/users/activity/" + userId)
      .then((response) => {
          setIsLoaded(true);
          console.log(response.data);
          setRows(response.data);
      })
      .catch((error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
      });
    }

    const handleNotification = (postId) => {
          setSelectedPost(postId);
          setIsOpen(true);
    }
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <div>
      {isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} /> : ""}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                User Activity
              </TableRow>
            </TableHead>
            <TableBody>
              {rows ? rows.map((row) => {
                  return (
                    <Button  onClick={() => handleNotification(row[1])}>
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell align="right">
                          {row[3] + " " + row[0] + " your post"}
                        </TableCell>
                      </TableRow>
                    </Button>
                  );
                }
              ) : ""}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </div>
    );
  }
export default UserActivity;