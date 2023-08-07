import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { StyledFormControl, StyledTextField } from '../../pages/CreateNote/styled';
import { CategoryType, Note } from '../../types';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const EditNote: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [note, setNote] = useState<Note | null>(null);
    const navigate = useNavigate();
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);

    useEffect(() => {
        const fetchNoteById = async () => {
            try {
                const noteDocRef = doc(db, "Notes", id);
                const noteSnapshot = await getDoc(noteDocRef);
                if (noteSnapshot.exists()) {
                    const noteData = noteSnapshot.data();
                    setNote({
                        id: noteSnapshot.id,
                        title: noteData.title || '',
                        category: noteData.category as CategoryType || 'todos',
                        details: noteData.details || '',
                    });
                } else {
                    console.log('Note not found.');
                }
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };

        fetchNoteById();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNote((prevNote) => ({
            ...prevNote!,
            [name]: value,
        }));
    };

    const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTitleError(false);
        setDetailsError(false);

        if (!note?.title?.trim()) {
            setTitleError(true);
        }

        if (!note?.details?.trim()) {
            setDetailsError(true);
        }

        if (note?.title?.trim() && note?.details?.trim()) {
            try {
                const noteDocRef = doc(db, "Notes", id);
                await updateDoc(noteDocRef, {
                    title: note.title,
                    category: note.category,
                    details: note.details,
                });

                navigate("/");
            } catch (error) {
                console.error("Error updating note:", error);
            }
        }
    };

    const handleDelete = async () => {
        try {
            const noteDocRef = doc(db, "Notes", id);
            await deleteDoc(noteDocRef);
            navigate("/");
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <>
            {note ? (
                <Container>
                    <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                        Edit the Note
                        {titleError || detailsError ? (
                            <Typography variant="body2" color="error">
                                {titleError && 'Please enter a title.'}
                                {detailsError && 'Please enter details.'}
                            </Typography>
                        ) : null}
                    </Typography>

                    <form noValidate autoComplete="off" onSubmit={handleEdit}>
                        <StyledTextField
                            value={note.title}
                            variant="outlined"
                            label="Note Title"
                            color="primary"
                            fullWidth
                            required
                            onChange={handleChange}
                            name="title"
                        />

                        <StyledTextField
                            value={note.details}
                            variant="outlined"
                            label="Details"
                            color="primary"
                            multiline
                            rows={4}
                            fullWidth
                            required
                            onChange={handleChange}
                            name="details"
                        />

                        <StyledFormControl>
                            <FormLabel>Note Category</FormLabel>
                            <RadioGroup
                                value={note.category}
                                onChange={handleChange}
                                color="primary"
                                name="category"
                            >
                                <FormControlLabel value="money" control={<Radio />} label="Money" />
                                <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                                <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
                                <FormControlLabel value="work" control={<Radio />} label="Work" />
                            </RadioGroup>
                        </StyledFormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'left', gap: '1rem' }}>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                endIcon={<KeyboardArrowRightIcon />}
                            >
                                Submit
                            </Button>
                            <Button
                                color="warning"
                                variant="contained"
                                onClick={handleDelete}
                                endIcon={<DeleteOutlinedIcon />}
                            >
                                Delete
                            </Button>
                        </Box>
                    </form>
                </Container>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </>
    );
};

export default EditNote;
