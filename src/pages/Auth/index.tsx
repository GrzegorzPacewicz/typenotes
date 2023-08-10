import React, { useState } from 'react';
import { Box, Button, Container, Input } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, GoogleProvider } from "../../config/firebase"
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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

    return (
        <Container>
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
        </Container>

    );
};

export default Auth;
