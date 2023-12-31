import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, CardContent, Container, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LogIn: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const {login, signInWithGoogle} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!emailRef.current || !passwordRef.current) {
            return;
        }

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch (error) {
            setError((error as Error).message);
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
                        Log In
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
                        <Button
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Log In
                        </Button>
                    </form>

                    <Button
                        disabled={loading}
                        variant="outlined"
                        style={{color: "black"}}
                        fullWidth
                        type="button"
                        onClick={() => {
                            signInWithGoogle().then((success) => {
                                if (success) {
                                    navigate("/");
                                }
                            });
                        }}
                        sx={{mt: 4}}
                    >
                        Sign In With Google
                    </Button>

                </CardContent>
                <Typography variant="body1" align="center" mt={2} px={1}>
                    Need an account?&nbsp;
                    <Link
                        underline="hover"
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
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

export default LogIn;