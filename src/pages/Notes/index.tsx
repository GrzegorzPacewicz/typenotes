import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, QuerySnapshot } from "firebase/firestore";
import { db, auth, storage } from "../../config/firebase";
import { ref, uploadBytes } from "firebase/storage"
import NoteCard from "../../components/NoteCard";
import Masonry from "@mui/lab/Masonry";
import { Note } from '../../types';
import { Button, Container, Input } from "@mui/material";

const Notes: React.FC = () => {
    const [notesList, setNotesList] = useState<Note[]>([]);
    const notesCollectionRef = collection(db, "Notes");
    const [fileUpload, setFileUpload] = useState(null)

    const getNotesList = async () => {
        try {
            const data: QuerySnapshot = await getDocs(notesCollectionRef);
            const filteredData: Note[] = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data() as Note,
                userId: auth?.currentUser?.uid,
            }));
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

const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
        await uploadBytes(filesFolderRef, fileUpload);
    }
   catch(err) {
        console.error(err);
   }
}

    return (
        <Container sx={{marginTop: '20px'}}>
            <Masonry spacing={3} columns={{xs: 1, md: 2, lg: 3}}>
                {notesList.map((note) => (
                    <div key={note.id}>
                        <NoteCard noteProp={note} handleDelete={deleteNote}/>
                    </div>
                ))}
            </Masonry>
            <Input type="file" onChange={(event) => setFileUpload(event.target.files[0])}/>
            <Button onClick={uploadFile}>Submit</Button>
        </Container>
    );
};

export default Notes;
