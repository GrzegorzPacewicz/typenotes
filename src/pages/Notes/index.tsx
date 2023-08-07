import React, {useEffect, useState} from 'react';
import {Container} from '@mui/material';
import NoteCard from '../../components/NoteCard';
import Masonry from '@mui/lab/Masonry';
import Grabber from "./Grabber";
import {Note} from '../../types';
import SubmitNote from "../CreateNote/SubmitNote";

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const storedNotes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDelete = (id: string) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
        localStorage.setItem('notes', JSON.stringify(newNotes));
    };


    return (
        <Container sx={{marginTop: '20px'}}>
            <Masonry spacing={3} columns={{xs: 1, md: 2, lg: 3}}>
                {notes.map((note) => (
                    <div key={note.id}>
                        <NoteCard note={note} handleDelete={handleDelete}/>
                    </div>
                ))}
            </Masonry>
            <Grabber/>
            <SubmitNote/>

        </Container>
    );
};

export default Notes;
