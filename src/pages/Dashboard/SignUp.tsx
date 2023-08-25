import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, CardContent, Container, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SignUp: React.FC = () => {

    const navigate = useNavigate();
    const {signup} = useAuth();

    const emailRef = useRef<HTMLInputElement | null>(null); // Explicitly type the refs
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!emailRef.current || !passwordRef.current || !passwordConfirmRef.current) {
            return;
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("Passwords do not match");
            return;
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/login");
        } catch (error) {
            setError((error as Error).message);
        }

        setLoading(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container style={{maxWidth: 500}}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Sign Up
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            inputRef={emailRef}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            inputRef={passwordRef}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password Confirmation"
                            type="password"
                            inputRef={passwordConfirmRef}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Sign Up
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
                    Forgot your password?&nbsp;
                    <Link
                        underline="hover"
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate('/forgot-password')}
                    >
                        Password reset
                    </Link>
                </Typography>
            </Card>
        </Container>
    );
};

export default SignUp;