import React, { useRef, useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Alert, Link } from "@mui/material";
// import { useAuth } from "";
import { Link as RouterLink, NavLink } from "react-router-dom";

export default function ForgotPassword() {
    const emailRef = useRef();
    // const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                    Password Reset
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        inputRef={emailRef}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button disabled={loading} variant="contained" color="primary" fullWidth type="submit">
                        Reset Password
                    </Button>
                </form>
                <Typography variant="body2" align="center" mt={3}>
                    <NavLink to={'/login'}>
                        Login
                    </NavLink>
                </Typography>
            </CardContent>
            <Typography variant="body2" align="center" mt={2}>
                Need an account?{" "}
                <NavLink to={'/signup'}>
                    Sign Up
                </NavLink>
            </Typography>
        </Card>
    );
}
