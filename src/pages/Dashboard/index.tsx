import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { updatePassword } from "firebase/auth";

export default function Dashboard() {

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {currentUser, logout} = useAuth();
    const newPasswordRef = useRef<HTMLInputElement | null>(null);
    const newPasswordConfirmRef = useRef<HTMLInputElement | null>(null);


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

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/login")
        } catch (error) {
            setError("Failed to log out")
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container style={{maxWidth: 500}}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Profile
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Typography variant="body1" mt={4}>
                        <strong>Your email:</strong> {currentUser.email}
                    </Typography>
                    <Typography variant="body1" mt={4}>
                        Change password:
                    </Typography>

                    <form onSubmit={handleSubmit}>

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

                <Typography variant="body2" align="center" mx={2} mb={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        style={{backgroundColor: "#424242", color: "white"}}
                        onClick={handleLogout}
                        sx={{mt: 4}}
                    >
                        Log Out
                    </Button>
                </Typography>

            </Card>
        </Container>
    );
}
