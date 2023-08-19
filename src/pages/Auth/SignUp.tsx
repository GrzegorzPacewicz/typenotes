import React, { useState } from 'react';
import { Alert, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, GoogleProvider } from "../../config/firebase"
import { NavLink, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState('')

    console.log(auth?.currentUser?.email);

    const signIn = async () => {

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, GoogleProvider);
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    };

    const handleSubmit = () => {
    };
    const emailRef = () => {
    };
    const passwordConfirmRef = () => {
    };
    const passwordRef = () => {
    };

    return (
        <Container sx={{ maxWidth: 'none' }} style={{ maxWidth: 500 }}>
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
                            // disabled={loading}
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                    {/*<div className="w-100 text-center mt-2">*/}
                    {/*    Already have an account? <NavLink onClick={() => navigate(`/login`) > Log In</NavLink>*/}
                    {/*    </div>*/}
                </CardContent>
            </Card>
            <Typography variant="body1" align="center" mt={4}>
                Already have an account? <NavLink to={'/signup'}> Log In</NavLink>
            </Typography>
        </Container>
    );
};

export default SignUp;