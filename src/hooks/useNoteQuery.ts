import useNotesQuery from "./useNotesQuery";

export const useNoteQuery = (id: string) => {

    const { data: notesList, status, error } = useNotesQuery();

    if (status !== 'success') {
        return { note: null, status, error };
    }

    const note = notesList.find(note => note.id === id);

    return { note, status, error };
};