import React, {useState} from 'react';
import {Box, Button, Input} from "@mui/material";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../config/firebase"

const Auth: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    return (
        <Box display="flex" gap={2} justifyContent="center">
            <Input
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
            />
            <Input
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
        </Box>
    );
};

export default Auth;
