import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { StyledFormControl, StyledTextField } from '../../pages/CreateNote/styled';
import { Note } from '../../types';
import { useNoteQuery } from "../../hooks/useNoteQuery";
import useDeleteNoteMutation from "../../hooks/useDeleteNoteMutation";
import { useQueryClient } from "@tanstack/react-query";
import useEditNoteMutation from "../../hooks/useEditNoteMutation";

const EditNote: React.FC = () => {

    const {id} = useParams<{ id: string }>();

    const {note} = useNoteQuery(id!);
    const queryClient = useQueryClient();

    const editNoteMutation = useEditNoteMutation();
    const deleteNoteMutation = useDeleteNoteMutation();

    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;

        queryClient.setQueryData(["notesData"], (prevNotes) => {
            if (Array.isArray(prevNotes)) {
                return prevNotes.map((n: Note) => {
                    if (n.id === note?.id) {
                        return {...n, [name]: value};
                    }
                    return n;
                });
            }
            return prevNotes;
        });
    };

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setTitleError(false);
        setDetailsError(false);

        const trimmedTitle = note?.title?.trim();
        const trimmedDetails = note?.details?.trim();

        if (!trimmedTitle) {
            setTitleError(true);
        }

        if (!trimmedDetails) {
            setDetailsError(true);
        }

        if (!trimmedTitle || !trimmedDetails) {
            return;
        }

        if (note) {
            editNoteMutation.mutate({
                id: note.id,
                userId: note.userId,
                title: note.title,
                category: note.category,
                details: note.details,
            });
        }
        navigate('/');
    };

    const handleDelete = () => {
        if (note?.id) {
            deleteNoteMutation.mutate(note.id, {
                onSuccess: () => {
                    navigate('/');
                },
            });
        }
    };

    return (
        <>
            {note ? (
                <Container>
                    <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                        Edit the Note
                        {(titleError || detailsError) && (
                            <Typography variant="body2" color="error">
                                {titleError && 'Please enter a title. '}
                                {detailsError && 'Please enter details.'}
                            </Typography>
                        )}
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
                                {["money", "todos", "reminders", "work"].map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={<Radio/>}
                                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                                    />
                                ))}
                            </RadioGroup>
                        </StyledFormControl>

                        <Box sx={{display: 'flex', justifyContent: 'left', gap: '1rem'}}>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                endIcon={<KeyboardArrowRightIcon/>}

                            >
                                Submit
                            </Button>
                            <Button
                                color="warning"
                                variant="contained"
                                onClick={handleDelete}
                                endIcon={<DeleteOutlinedIcon/>}
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