import React, {useEffect, useState} from 'react';
import {addDoc, collection, getDocs, QuerySnapshot} from "firebase/firestore";
import {db} from "../../config/firebase";
import NoteCard from "../../components/NoteCard";
import Masonry from "@mui/lab/Masonry";
import {Note} from '../../types';
import {Button, Input} from "@mui/material";

const Grabber: React.FC = () => {
    const [notesList, setNotesList] = useState<Note[]>([]);

    const notesCollectionRef = collection(db, "Notes");

    // const [title, setTitle] = useState('');
    // const [details, setDetails] = useState('');
    // const [category, setCategory] = useState("work")


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


    // const onSubmitNote = async () => {
    //     try {
    //         await addDoc(notesCollectionRef, {
    //             title: title,
    //             details: details,
    //             category: category,
    //         });
    //     } catch (err) {
    //         console.error(err)
    //     }
    // };

    return (
        <>

            <Masonry spacing={3} columns={{xs: 1, md: 2, lg: 3}}>
                {notesList.map((note) => (
                    <div key={note.id}>
                        <NoteCard note={note} handleDelete={doNothing}/>
                    </div>
                ))}
            </Masonry>

            {/*<Input placeholder="title"*/}
            {/*       onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}></Input>*/}
            {/*<Input placeholder="details"*/}
            {/*       onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDetails(event.target.value)}></Input>*/}
            {/*<Input placeholder="category"*/}
            {/*       onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCategory(event.target.value)}></Input>*/}
            {/*<Button onClick={onSubmitNote}>Submit</Button>*/}
        </>

    );
};

export default Grabber;
