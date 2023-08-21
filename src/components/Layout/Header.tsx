import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import { AccountCircle } from "@mui/icons-material";
import { signInWithPopup } from "firebase/auth";
import { auth, GoogleProvider } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { StyledDate } from "./styled";

const Header: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { logout } = useAuth();
    const [error, setError] = useState("");

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const loginWithGoogle = async () => {
        handleCloseUserMenu();
        try {
            await signInWithPopup(auth, GoogleProvider);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const logoutFromAccount = async () => {
        handleCloseUserMenu();
        try {
            await logout();
            window.location.reload();
        } catch (error) {
            setError( "Failed to log out");
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <StyledDate variant="body2" sx={{ mr: 2 }}>
                Today is the {format(new Date(), `do MMMM Y`)}
            </StyledDate>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={loginWithGoogle}>
                        <Typography>Login with Google</Typography>
                    </MenuItem>
                    <MenuItem onClick={logoutFromAccount}>
                        <Typography>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default Header;
