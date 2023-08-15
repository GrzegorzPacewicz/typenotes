import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  Note } from "../types";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const useEditNoteMutation = () => {

    const queryClient = useQueryClient();

    return useMutation(
        async (updatedNote: Note) => {
            const noteDocRef = doc(db, "Notes", updatedNote.id);
            await updateDoc(noteDocRef, {
                ...updatedNote,
                userId: auth?.currentUser?.uid,
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["notesData"]); // Invalidate the 'notesData' query when edit is successful
            },
        }
    );
};

export default useEditNoteMutation;