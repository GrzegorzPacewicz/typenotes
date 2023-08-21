import React, { useRef, useState } from "react";
import { Alert, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { updatePassword } from 'firebase/auth';

export default function UpdateProfile() {
    const navigate = useNavigate();

    const {currentUser} = useAuth();
    const emailRef = useRef<HTMLInputElement | null>(null)

    const newPasswordRef = useRef<HTMLInputElement | null>(null);
    const newPasswordConfirmRef = useRef<HTMLInputElement | null>(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        try {
            if (!newPasswordRef.current) {
                setError("New password field is not available");
                setLoading(false);
                return;
            }

            if (newPasswordRef.current.value !== newPasswordConfirmRef.current?.value) {
                setError("Passwords do not match");
            } else {
                setError("");
                await updatePassword(currentUser, newPasswordRef.current.value);
                navigate("/");
            }
        } catch (error) {
            setError((error as Error).message || "An error occurred");
        }

        setLoading(false);
    }

    return (
        <Container style={{maxWidth: 500}}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Update Profile
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <Typography variant="body1" mt={4}>
                            <strong>Email:</strong> {currentUser.email}
                        </Typography>
                        <TextField
                            label="New password"
                            type="password"
                            inputRef={newPasswordRef}
                            placeholder="Leave blank to keep the same"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="New password confirmation"
                            type="password"
                            inputRef={newPasswordConfirmRef}
                            placeholder="Leave blank to keep the same"
                            fullWidth
                            margin="normal"
                        />
                        <Button disabled={loading} variant="contained" color="primary" fullWidth type="submit">
                            Update
                        </Button>
                    </form>
                </CardContent>
                <Typography variant="body2" align="center" mt={2} mb={3}>
                    <NavLink to={"/"}>Cancel</NavLink>
                </Typography>
            </Card>
        </Container>
    );
}
