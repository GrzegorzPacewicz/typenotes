import React, { useRef, useState } from 'react';
import { Alert, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
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
            </Card>
            <Typography variant="body1" align="center" mt={4}>
                Already have an account? <NavLink to={'/login'}> Log In</NavLink>
            </Typography>
        </Container>
    );
};

export default SignUp;