import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { StyledAvatar, StyledCard } from './styled';
import { CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { theme } from "../../theme";
import { Note, CategoryType } from '../../types';

interface NoteCardProps {
    noteProp: Note; // Zmiana nazwy propsa note na noteProp
    handleDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ noteProp, handleDelete }) => { // Zmiana note na noteProp
    const navigate = useNavigate();

    return (
        <div>
            <StyledCard elevation={1} note={noteProp} theme={theme}>
                <CardHeader
                    avatar={<StyledAvatar note={noteProp} theme={theme}>{noteProp.category[0].toUpperCase()}</StyledAvatar>}
                    action={
                        <>
                            <IconButton onClick={() => navigate(`/edit/${noteProp.id}`)}>
                                <EditOutlined />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(noteProp.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </>
                    }
                    title={noteProp.title}
                    subheader={noteProp.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {noteProp.details}
                    </Typography>
                </CardContent>
            </StyledCard>
        </div>
    );
};

NoteCard.propTypes = {
    noteProp: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.oneOf<CategoryType>(["money", "todos", "reminders", "work"]),
        details: PropTypes.string.isRequired,
    }).isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default NoteCard;
