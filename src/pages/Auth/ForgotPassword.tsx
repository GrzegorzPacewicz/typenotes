import React, { useRef, useState } from "react";
import { Alert, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ForgotPassword() {

    const emailRef = useRef<HTMLInputElement | null>(null); // Explicitly type the refs

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {resetPassword} = useAuth()
    const [message, setMessage] = useState("")


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!emailRef.current) {
            return;
        }

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <Container style={{maxWidth: 500}}>
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
                <Typography variant="body2" align="center" my={2}>
                    Need an account?{" "}
                    <NavLink to={'/signup'}>
                        Sign Up
                    </NavLink>
                </Typography>
            </Card>
        </Container>
    );
}
