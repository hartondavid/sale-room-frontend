import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box, useTheme, Typography } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/utilFunctions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { RIGHTS_MAPPING } from '../utils/utilConstants';

const Navbar = ({ onMenuClick, user, userr, navigationButtons, userRights, token }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClick = () => {
        navigate('/dashboard/profile');
        handleMenuClose();
    }

    const handleLogoutClick = () => {
        handleMenuClose();
        removeToken();
        navigate('/auth/login');
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const rightCode = userRights[0]?.right_code;

    console.log('rightCode', rightCode);


    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'rgb(133, 20, 20)', zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar className="flex items-center justify-between">

                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onMenuClick}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                    gap: '10px'
                }}>
                    {rightCode === RIGHTS_MAPPING.CUSTOMER && <ShoppingCartIcon sx={{ fontSize: '30px' }} onClick={() => {

                        navigate(`/dashboard/shoppingCard`)

                    }} />
                    }
                    <Typography variant="h6">{user?.data?.name}</Typography>
                    {navigationButtons && navigationButtons.map((button, index) =>
                        <Box key={`navigationbutton${index}`}>
                            {button}
                        </Box>
                    )}

                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleProfileMenuOpen}
                        aria-controls="profile-menu"
                        aria-haspopup="true"
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    {/* <MenuItem onClick={handleProfileClick}>{t('Profile')}</MenuItem> */}
                    <MenuItem onClick={handleLogoutClick}>{'Logout'}</MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
