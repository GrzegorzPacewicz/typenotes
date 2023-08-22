import React, { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Container, Input, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, GoogleProvider } from "../../config/firebase"
import { NavLink, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

const Auth: React.FC = () => {

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
        <Container >
            <Box display="flex" gap={2} justifyContent="center">
                <Input
                    placeholder="Email..."
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    placeholder="Password..."
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button onClick={signIn}>Sign In</Button>

            </Box>
            <Box display="flex" gap={2} justifyContent="center" mt={10}>
                <Button onClick={signInWithGoogle}>Sign In With Google</Button>
                <Button onClick={logout}>Logout</Button>
            </Box>

          {/*new component*/}

            <Typography variant="body1" align="center" mt={4}>
                 <NavLink to={'/update'}>Update Profile</NavLink>
            </Typography>

            <Typography variant="body1" align="center" mt={4}>
                 <NavLink to={'/signup'}>Sign Up</NavLink>
            </Typography>

            <Typography variant="body1" align="center" mt={4}>
                <NavLink to={'/login'}>Log In</NavLink>
            </Typography>

            <Typography variant="body1" align="center" mt={4}>
                <NavLink to={'/forgot-password'}>Forgot Password</NavLink>
            </Typography>

            <Typography variant="body1" align="center" mt={4}>
                <NavLink to={'/dashboard'}>Dashboard</NavLink>
            </Typography>

        </Container>
    );
};

export default Auth;
