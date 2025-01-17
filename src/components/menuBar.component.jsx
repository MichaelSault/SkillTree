import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
      const loggedInUser = document.cookie.split('=')[1];
      console.log(loggedInUser);
      if (loggedInUser) {
          //verify JWT signature
          const verified = verifyJWT(loggedInUser);
          console.log("menu bar: ", verified);
          //change menu bar to logged in mode if valid
          if (verified) {
            setAuth(true);
          } else {
            setAuth(false);
            //Cookies.remove('user-authentication');
          }
          //delete token if invalid
      } else {
          //menu bar is not logged in version
      }
      console.log(loggedInUser);
  }, [auth]);

  const verifyJWT = async (token) => {
    console.log("token: ", token)
    const tokenData = await fetch('http://localhost:3001/verifyJWT', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        Token: token
    })
    })
    .then(res => res.json());

    console.log("token data contains: ", tokenData);

    decodeJWT(token);
  }


  const decodeJWT = async (token) => {
    console.log("token: ", token)
    const userData = await fetch('http://localhost:3001/decodeJWT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Token: token
        })
    })
    .then(res => res.json());

    console.log("does this run? ", userData);
    //setRunnerData(userData);
  }

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenu = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorE2(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "RebeccaPurple", marginBottom: "5em"}}>
        <Toolbar>
        {!auth && (
          <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          
          <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem href="login" component="a" onClick={handleClose}>Login</MenuItem>
              <MenuItem href="signup" component="a" onClick={handleClose}>SignUp</MenuItem>
          </Menu>
          </div>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Skill Tree
          </Typography>
          {auth && (
            <div>
              {userData.Display}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              
            
              <Menu
                id="menu-appbar"
                anchorEl={anchorE2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorE2)}
                onClose={handleUserClose}
              >
                <MenuItem href="../Skilltree" component="a" onClick={handleUserClose}>Skill Tree</MenuItem>
                <MenuItem href="../Requests" component="a" onClick={handleUserClose}>Requests</MenuItem>
                <MenuItem href="../Friends" component="a" onClick={handleUserClose}>Friends</MenuItem>
              </Menu>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
