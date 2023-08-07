import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {StyledFormControl, StyledTextField} from './styled';
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../config/firebase";
import { CategoryType } from '../../types';

const SubmitNote: React.FC = () => {

    const notesCollectionRef = collection(db, "Notes");

    const [title, setTitle] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [category, setCategory] = useState<CategoryType>('todos'); // Set the default value here

    const [titleError, setTitleError] = useState<boolean>(false);
    const [detailsError, setDetailsError] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await addDoc(notesCollectionRef, {
                title: title,
                details: details,
                category: category,
            });
        } catch (err) {
            console.error(err)
        }
        setTitle('');
        setDetails('');
        navigate('/');
    };

    return (
        <>
            <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                Submit a New Note
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <StyledTextField
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                    value={title}
                    variant="outlined"
                    label="Note Title"
                    color="primary"
                    fullWidth
                    required
                    error={titleError}
                />


                <StyledTextField
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDetails(event.target.value)}
                    value={details}
                    variant="outlined"
                    label="Details"
                    color="primary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={detailsError}
                />

                <StyledFormControl>
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup
                        value={category}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCategory(event.target.value as "money" | "todos" | "reminders" | "work")}
                        color="primary"
                    >
                        <FormControlLabel value="money" control={<Radio/>} label="Money"/>
                        <FormControlLabel value="todos" control={<Radio/>} label="Todos"/>
                        <FormControlLabel value="reminders" control={<Radio/>} label="Reminders"/>
                        <FormControlLabel value="work" control={<Radio/>} label="Work"/>
                    </RadioGroup>
                </StyledFormControl>

                <Button type="submit" color="primary" variant="contained" endIcon={<KeyboardArrowRightIcon/>}>
                    Submit
                </Button>
            </form>
        </>
    );
};

export default SubmitNote;
