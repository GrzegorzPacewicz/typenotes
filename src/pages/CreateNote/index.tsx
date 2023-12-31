import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { StyledFormControl, StyledTextField } from './styled';
import { auth } from "../../config/firebase";
import { CategoryType } from '../../types';
import useAddNoteMutation from "../../hooks/useAddNoteMutation";

const maxCharCount = 2000;

const CreateNote: React.FC = () => {
    const addNoteMutation = useAddNoteMutation();

    const [title, setTitle] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [category, setCategory] = useState<CategoryType>('todos');
    const [titleError, setTitleError] = useState<boolean>(false);
    const [detailsError, setDetailsError] = useState<boolean>(false);
    const [currentCharCount, setCurrentCharCount] = useState<number>(0);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        setTitleError(!title.trim());
        setDetailsError(!details.trim());

        if (!title.trim() || !details.trim()) {
            return;
        }

        if (details.length > maxCharCount) {
            console.error('The note is too long');
            return;
        }

        try {
            await addNoteMutation.mutateAsync({
                title,
                details,
                category,
                userId
            });

            setTitle('');
            setDetails('');
            setCategory('todos');
            setTitleError(false);
            setDetailsError(false);
            setCurrentCharCount(0);

            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container style={{ maxWidth: 800 }}>
            <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                Create a New Note
                {(titleError || detailsError) && (
                    <Typography variant="body2" color="error">
                        {titleError && 'Please enter a title. '}
                        {detailsError && 'Please enter details.'}
                    </Typography>
                )}
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <StyledTextField
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                    value={title}
                    variant="outlined"
                    label="Note Title"
                    color="primary"
                    fullWidth
                    required
                    error={titleError}
                />

                <StyledTextField
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = event.target.value;
                        setDetails(newValue);
                        setCurrentCharCount(newValue.length);
                    }}
                    value={details}
                    variant="outlined"
                    label="Details"
                    color="primary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={detailsError}
                    InputProps={{
                        style: { whiteSpace: 'pre-wrap' },
                    }}
                />

                   <Typography>
                       Characters: {currentCharCount}/{maxCharCount}
                   </Typography>

                <StyledFormControl>
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup
                        value={category}
                        onChange={(event) => setCategory(event.target.value as "money" | "todos" | "reminders" | "work")}
                        color="primary"
                    >
                        {["money", "todos", "reminders", "work"].map((option) => (
                            <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio />}
                                label={option.charAt(0).toUpperCase() + option.slice(1)}
                            />
                        ))}
                    </RadioGroup>
                </StyledFormControl>

                <Button type="submit" color="primary" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default CreateNote;
