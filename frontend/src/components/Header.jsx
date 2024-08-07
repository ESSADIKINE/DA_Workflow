import React, { useEffect, useState } from 'react';
import { useTheme } from "@emotion/react";
import {
  Avatar, Box, Button, CircularProgress, Container, IconButton, Menu, MenuItem, Stack, Tooltip
} from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { setMode, logoutThunk } from "../redux/user/userSlice";
import blogLogoGifL from '../assets/LogoL.gif';
import blogLogoGifD from '../assets/LogoD.gif';

const stringAvatar = (name) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
};

const stringToColor = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user, token, mode } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await dispatch(logoutThunk(token));
    } catch (error) {
      console.error("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => setAnchorEl(null);
  }, [pathname]);

  return (
    <Box position={"fixed"} top={0} left={0} right={0} sx={{ backgroundColor: theme.palette.background.paper, zIndex: 100, py: "5px" }}>
      <Container maxWidth="md">
        <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <RouterLink to={"/"}>
            {mode === "light" ? <img src={blogLogoGifL} alt="Blog Logo" style={{ height: '50px' }} /> : <img src={blogLogoGifD} alt="Blog Logo" style={{ height: '50px' }} />}
          </RouterLink>
          <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
            <Tooltip title="Switch theme" arrow>
              <IconButton onClick={() => dispatch(setMode())} sx={{ color: theme.palette.text.primary }}>
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
            {!user ? (
              <>
                <Button component={RouterLink} to={"/signup"} variant="contained">
                  Sign Up
                </Button>
                <Button component={RouterLink} to={"/signin"} variant="contained">
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Tooltip title="Create Post" arrow>
                  <Button component={RouterLink} to={"/create-demande"} variant="contained">
                    New Demande
                  </Button>
                </Tooltip>
                <Button onClick={handleClick}>
                  <Avatar {...stringAvatar(`${user.Prenom} ${user.Nom}`)} />
                </Button>
                <Menu
                  elevation={3}
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  sx={{
                    "& .MuiMenu-list": {
                      py: 0,
                      width: "140px"
                    },
                    "& .MuiMenuItem-root": {
                      py: 1,
                    }
                  }}
                >
                  <MenuItem component={RouterLink} to={`/profile/${user.Nom}-${user.Prenom}`}>Profile</MenuItem>
                  <MenuItem component={RouterLink} to={"/your-demandes?page=1"}>Your Demandes</MenuItem>
                  {(user.isAdmin || user.isAchteur || user.isDG) && (
                    <MenuItem component={RouterLink} to={`/dashboard`}>Dashboard</MenuItem>
                  )}
                  <MenuItem onClick={handleSignOut} disabled={isLoading}>
                    {isLoading ? <CircularProgress size={18} /> : "Sign Out"}
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
