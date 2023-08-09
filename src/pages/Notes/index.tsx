import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, QuerySnapshot } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import NoteCard from "../../components/NoteCard";
import Masonry from "@mui/lab/Masonry";
import { Note } from '../../types';
import { Container } from "@mui/material";

const Notes: React.FC = () => {
    const [notesList, setNotesList] = useState<Note[]>([]);
    const notesCollectionRef = collection(db, "Notes");

    const getNotesList = async () => {
        try {
            const data: QuerySnapshot = await getDocs(notesCollectionRef);
            const filteredData: Note[] = data.docs.map((doc) => {
                const { id, ...noteData } = doc.data() as Note;
                return {
                    id: doc.id,
                    ...noteData,
                    userId: auth?.currentUser?.uid,
                };
            });
            setNotesList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getNotesList();
    }, []);

    const deleteNote = async (id: string): Promise<void> => {
        const noteDoc = doc(db, "Notes", id);
        await deleteDoc(noteDoc);
        await getNotesList();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container sx={{marginTop: '20px'}}>
            <Masonry spacing={3} columns={{xs: 1, md: 2, lg: 3}}>
                {notesList.map((note) => (
                    <div key={note.id}>
                        <NoteCard noteProp={note} handleDelete={deleteNote}/>
                    </div>
                ))}
            </Masonry>
        </Container>
    );
};

export default Notes;
