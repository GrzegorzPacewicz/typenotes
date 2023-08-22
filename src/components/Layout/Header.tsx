import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { StyledDate } from "./styled";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const {logout} = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/login")
        } catch (error) {
            setError("Failed to log out")
        }
    }

    return (
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <StyledDate variant="body2" sx={{mr: 2}}>
                Today is the {format(new Date(), `do MMMM Y`)}
            </StyledDate>

            <Box sx={{flexGrow: 0}}>
                <Tooltip title="User menu">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}} color="inherit">
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
                    <MenuItem onClick={() => navigate('/login')}>
                        <Typography>Login</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/dashboard')}>
                        <Typography>Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <Typography>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default Header;
