import React, { useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import NoteCard from "../../components/NoteCard";
import Masonry from "@mui/lab/Masonry";
import { Note } from '../../types';
import { Container, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Notes: React.FC = () => {
    const notesCollectionRef = collection(db, "Notes");
    const queryClient = useQueryClient();

    const {data, status, error} = useQuery({
        queryKey: ["notesData"],
        queryFn: async () => {
            const {docs} = await getDocs(notesCollectionRef);
            const filteredData: Note[] = [];

            docs.forEach((doc) => {
                const noteData = doc.data() as Note;
                if (noteData.userId === auth?.currentUser?.uid) {
                    filteredData.push({
                        id: doc.id,
                        title: noteData.title,
                        category: noteData.category,
                        details: noteData.details,
                        userId: noteData.userId,
                    });
                }
            });
            return filteredData;
        },
    });

    const deleteNoteMutation = useMutation(
        async (id: string) => {
            const noteDoc = doc(db, "Notes", id);
            await deleteDoc(noteDoc);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["notesData"]); // Invalidate the 'notesData' query when deletion is successful
            },
        }
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container sx={{marginTop: '20px'}}>
            {status === "loading" && <Typography>Loading..</Typography>}
            {status === "error" && <Typography>Error! {(error as Error).message}</Typography>}
            {status === "success" && (
                <Masonry spacing={3} columns={{xs: 1, md: 2, lg: 3}}>
                    {data?.map((note) => (
                        <div key={note.id}>
                            <NoteCard noteProp={note} handleDelete={() => deleteNoteMutation.mutate(note.id)}/>
                        </div>
                    ))}
                </Masonry>
            )}
        </Container>
    );
};

export default Notes;

// import React, { useEffect } from 'react';
// import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import the necessary hooks
// import { db, auth } from '../../config/firebase';
// import NoteCard from '../../components/NoteCard';
// import Masonry from '@mui/lab/Masonry';
// import { Note } from '../../types';
// import { Container } from '@mui/material';
//
// const Notes: React.FC = () => {
//     const notesCollectionRef = collection(db, 'Notes');
//     const queryClient = useQueryClient();
//
//     // Fetch notes data using useQuery hook
//     const { data: notesList } = useQuery<Note[]>(['notes', auth?.currentUser?.uid], async () => {
//         const data = await getDocs(notesCollectionRef);
//         const filteredData: Note[] = [];
//
//         data.docs.forEach((doc) => {
//             const noteData = doc.data() as Note;
//             if (noteData.userId === auth?.currentUser?.uid) {
//                 filteredData.push({
//                     id: doc.id,
//                     title: noteData.title,
//                     category: noteData.category,
//                     details: noteData.details,
//                     userId: noteData.userId,
//                 });
//             }
//         });
//
//         return filteredData;
//     });
//
//     // Mutation function for deleting a note
//     const deleteNoteMutation = useMutation(async (id: string) => {
//         const noteDoc = doc(db, 'Notes', id);
//         await deleteDoc(noteDoc);
//     }, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('notes');
//         },
//     });
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);
//
//     return (
//         <Container sx={{marginTop: '20px'}}>
//             <Masonry spacing={3} columns={{xs: 1, md: 2, lg: 3}}>
//                 {notesList?.map((note) => (
//                     <div key={note.id}>
//                         <NoteCard noteProp={note} handleDelete={() => deleteNoteMutation.mutate(note.id)} />
//                     </div>
//                 ))}
//             </Masonry>
//         </Container>
//     );
// };
//
// export default Notes;
