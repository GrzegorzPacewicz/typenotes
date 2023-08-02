import React from 'react';
import {Box, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {StyledDate} from "./styled";
import {format} from "date-fns";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = () => {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <StyledDate variant="body2" sx={{mr: 2}}>
                Today is the {format(new Date(), `do MMMM Y`)}
            </StyledDate>
            {auth && (
                <div>
                    <Tooltip title="Open settings">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </Tooltip>
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
                        sx={{mt: '45px'}}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Login</MenuItem>
                        <MenuItem onClick={handleClose}>Logut</MenuItem>
                    </Menu>
                </div>
            )}
        </Box>
    );
};

export default Header;