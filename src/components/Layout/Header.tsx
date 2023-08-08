import React from 'react';
import {Box, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {StyledDate} from "./styled";
import {format} from "date-fns";
import {AccountCircle} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {signInWithPopup, signOut} from "firebase/auth";
import {auth, GoogleProvider} from "../../config/firebase";

const Header = () => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginClick = () => {
        handleCloseUserMenu();
        navigate('/auth'); // Navigate to the '/auth' path when "Login" is clicked
    };

    const loginWithGoogle = async () => {
        handleCloseUserMenu();
        try {
            await signInWithPopup(auth, GoogleProvider);
        } catch (err) {
            console.error(err)
        }
    };

    const logoutFromAccount = async () => {
        handleCloseUserMenu();
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err)
        }
    };

    return (

        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <StyledDate variant="body2" sx={{mr: 2}}>
                Today is the {format(new Date(), `do MMMM Y`)}
            </StyledDate>

            <Box sx={{flexGrow: 0}}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}
                                color="inherit">
                        <AccountCircle/>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{mt: '45px'}}
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

                    <MenuItem onClick={loginWithGoogle}> <Typography>Login with Google</Typography></MenuItem>
                    <MenuItem onClick={logoutFromAccount}> <Typography>Logout</Typography></MenuItem>

                </Menu>
            </Box>

        </Box>

    );
};

export default Header;