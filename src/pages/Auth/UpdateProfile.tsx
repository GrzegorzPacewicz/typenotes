import React, { useRef, useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Alert, Link, Container } from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {

    };

    return (
        <Container style={{maxWidth: 500}}>
        <Card>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                    Update Profile
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        inputRef={emailRef}
                        required
                        // defaultValue={currentUser.email}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        inputRef={passwordRef}
                        placeholder="Leave blank to keep the same"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password Confirmation"
                        type="password"
                        inputRef={passwordConfirmRef}
                        placeholder="Leave blank to keep the same"
                        fullWidth
                        margin="normal"
                    />
                    <Button disabled={loading} variant="contained" color="primary" fullWidth type="submit">
                        Update
                    </Button>
                </form>
            </CardContent>
            <Typography variant="body2" align="center" mt={2} mb={3}>
                <NavLink to={"/"}>Cancel</NavLink>
            </Typography>
        </Card>
        </Container>
    );
}
