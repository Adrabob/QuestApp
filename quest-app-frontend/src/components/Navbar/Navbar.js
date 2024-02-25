import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";
import { LockOpen } from '@mui/icons-material';




function Navbar() {
  let navigate = useNavigate();  
  const onClick = () => {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("tokenKey");
      localStorage.removeItem("userName");
      navigate(0);
    }
    return(
    <div> 
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: 'linear-gradient(to right top, #f30101, #60060c)'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow:1, textAlign:'left'}}>
          <Link style={{ textDecoration: 'none', boxShadow:'none', color:'white' }}  to="/" >Home</Link>
          </Typography>
          <Typography variant="h6">
            {localStorage.getItem("currentUser") == null ? <Link style={{ textDecoration: 'none', boxShadow:'none', color:'white' }} to="/auth" >Login/Register</Link> : 
            <div> 
              <IconButton onClick={onClick}><LockOpen></LockOpen></IconButton>
              <Link  style={{ textDecoration: 'none', boxShadow:'none', color:'white' }} to={{pathname : '/users/' + localStorage.getItem("currentUser")}} >Profile</Link>
            </div>}
          </Typography>
          </Toolbar>
      </AppBar>
    </Box>
    </div>
    )

}

export default Navbar;
