import React, { useEffect, useState } from 'react';
import { Container } from "@mui/material";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import NoteCard from "../../components/NoteCard/NoteCard";
import Masonry from "@mui/lab/Masonry";

interface Note {
    id: string;
    title: string;
    category: string;
    details: string;
}

const Grabber: React.FC = () => {
    const [notesList, setNotesList] = useState<Note[]>([]);

    const notesCollectionRef = collection(db, "Notes");

    useEffect(() => {
        const getNotesList = async () => {
            try {
                const data: QuerySnapshot = await getDocs(notesCollectionRef);
                const filteredData: Note[] = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setNotesList(filteredData);
            } catch (err) {
                console.error(err);
            }
        };
        getNotesList();
    }, []);

    const doNothing = (): void => {
        // This is an empty function that does nothing
    };

    return (

            <Masonry spacing={3} columns={{ xs: 1, md: 2, lg: 3 }}>
                {notesList.map((note) => (
                    <div key={note.id}>
                        <NoteCard note={note} handleDelete={doNothing} />
                    </div>
                ))}
            </Masonry>

    );
};

export default Grabber;
