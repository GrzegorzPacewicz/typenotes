import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Button, Container, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { StyledFormControl, StyledTextField } from './styled';
import { Note } from '../../types/types';

const CreateNote: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [titleError, setTitleError] = useState<boolean>(false);
    const [detailsError, setDetailsError] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('todos');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTitleError(false);
        setDetailsError(false);

        if (title.trim() === '') {
            setTitleError(true);
        }

        if (details.trim() === '') {
            setDetailsError(true);
        }

        if (title.trim() && details.trim()) {
            const newNote: Note = {
                id: nanoid(),
                title: title.trim(),
                details: details.trim(),
                category,
            };

            const existingNotes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');
            const updatedNotes: Note[] = [...existingNotes, newNote];
            localStorage.setItem('notes', JSON.stringify(updatedNotes));

            setTitle('');
            setDetails('');
            navigate('/');
        }
    };

    return (
        <Container>
            <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                Create a New Note
                {titleError || detailsError ? (
                    <Typography variant="body2" color="error">
                        {titleError && 'Please enter a title. '}
                        {detailsError && 'Please enter details.'}
                    </Typography>
                ) : null}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDetails(event.target.value)}
                    value={details}
                    variant="outlined"
                    label="Details"
                    color="primary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={detailsError}
                />

                <StyledFormControl>
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup value={category} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCategory(event.target.value)} color="primary">
                        <FormControlLabel value="money" control={<Radio />} label="Money" />
                        <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                        <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
                        <FormControlLabel value="work" control={<Radio />} label="Work" />
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
