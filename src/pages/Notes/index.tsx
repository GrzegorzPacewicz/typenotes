import React, { useEffect } from 'react';
import NoteCard from "../../components/NoteCard";
import Masonry from "@mui/lab/Masonry";
import { Container, Typography } from "@mui/material";
import useNotesQuery from "../../hooks/useNotesQuery";
import useDeleteNoteMutation from "../../hooks/useDeleteNoteMutation";

const Notes: React.FC = () => {
    const { data, status, error } = useNotesQuery();
    const deleteNoteMutation = useDeleteNoteMutation();

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