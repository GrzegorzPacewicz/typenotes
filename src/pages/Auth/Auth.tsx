import React from 'react';
import { Box, Button, Input } from "@mui/material";

const Auth: React.FC = () => {
    return (
        <Box display="flex"  gap={2}>
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Button>Sign In</Button>
        </Box>
    );
};

export default Auth;
