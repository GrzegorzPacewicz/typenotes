import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useQuery } from "@tanstack/react-query";
import { Note } from "../types";

const useNotesQuery = () => {

    const notesCollectionRef = collection(db, "Notes");

    return  useQuery({
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
};

export default useNotesQuery;