import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { CategoryType } from '../types';

const useAddNoteMutation = () => {
    const queryClient = useQueryClient();
    const notesCollectionRef = collection(db, 'Notes');
    const notesQueryKey = ['notesData'];

    return useMutation(
        async (newNote: { title: string; details: string; category: CategoryType, userId: string }) => {
            const noteData = {
                ...newNote,
                userId: auth?.currentUser?.uid,
            };

            await addDoc(notesCollectionRef, noteData);
            await queryClient.invalidateQueries(notesQueryKey);
        },
    );
};

export default useAddNoteMutation;
