import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const useDeleteNoteMutation = () => {

    const queryClient = useQueryClient();

    return useMutation(
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
};

export default useDeleteNoteMutation;