import React, { useState } from "react";
import { Alert, Button, Card, CardContent, Container, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const logout = () => {}

    const handleLogout = async () => {
        setError("");

        try {
            await logout();
            navigate("/login");
        } catch {
            setError("Failed to log out");
        }
    };

    return (
        <Container style={{maxWidth: 500}}>
        <Card>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                    Profile
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <Typography variant="body1">
                    <strong>Email:</strong>
                    {/*{currentUser.email}*/}
                </Typography>
                <Button
                    onClick={() => navigate(`/update`)}
                    variant="contained"
                    color="primary"
                    sx={{marginTop: 4, width: "100%"}}
                >
                    Update Profile
                </Button>
            </CardContent>
            <Typography variant="body2" align="center" my={2}>
                <Button variant="text" color="primary" onClick={handleLogout}>
                    Log Out
                </Button>
            </Typography>
        </Card>
    </Container>
    );
}
