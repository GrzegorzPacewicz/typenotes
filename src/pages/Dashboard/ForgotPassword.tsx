import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Card, CardContent, Container, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ForgotPassword() {

    const emailRef = useRef<HTMLInputElement | null>(null); // Explicitly type the refs

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {resetPassword} = useAuth()
    const [message, setMessage] = useState("")

    const navigate = useNavigate();

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


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

                </CardContent>
                <Typography variant="body1" align="center" px={1}>
                    Already have an account?&nbsp;
                    <Link
                        underline="hover"
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </Link>
                </Typography>
                <Typography variant="body1" align="center" my={2} px={1}>
                    Need an account?&nbsp;
                    <Link
                        underline="hover"
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </Link>
                </Typography>
            </Card>
        </Container>
    );
}
