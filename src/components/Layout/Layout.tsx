import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { theme } from "../../theme";
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { AddCircleOutlined, SubjectOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Avatar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import { ActiveListItem, Page, StyledDate } from './styled';

const drawerWidth = 240;

interface LayoutProps {
    window?: () => Window;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ window, children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined />,
            path: '/',
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlined />,
            path: '/create',
        },
    ];

    const handleListItemClick = () => {
        if (mobileOpen) {
            handleDrawerToggle();
        }
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h5">Notes</Typography>
            </Toolbar>

            <List>
                {menuItems.map((item) => (
                    <ActiveListItem
                        theme={theme}
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            handleListItemClick();
                        }}
                        selected={location.pathname === item.path}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText secondary={item.text} />
                    </ActiveListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <StyledDate variant="body2" sx={{ mr: 2 }}>
                            Today is the {format(new Date(), `do MMMM Y`)}
                        </StyledDate>
                        <Typography variant="h6">Grzegorz</Typography>
                        <Avatar src="/icon.png" sx={{ ml: 2 }} />
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Page component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                {children}
            </Page>
        </Box>
    );
};

Layout.propTypes = {
    window: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Layout;
