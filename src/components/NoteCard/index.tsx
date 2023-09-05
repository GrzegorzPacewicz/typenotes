import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledAvatar, StyledCard } from './styled';
import { CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { theme } from "../../theme";
import { Note } from '../../types';

interface NoteCardProps {
    noteProp: Note;
    handleDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({noteProp, handleDelete}) => {
    const navigate = useNavigate();

    return (
        <div>
            <StyledCard elevation={1} note={noteProp} theme={theme}>
                <CardHeader
                    avatar={<StyledAvatar note={noteProp}
                                          theme={theme}>{noteProp.category[0].toUpperCase()}</StyledAvatar>}
                    action={
                        <>
                            <IconButton onClick={() => navigate(`/edit/${noteProp.id}`)}>
                                <EditOutlined/>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(noteProp.id)}>
                                <DeleteOutlined/>
                            </IconButton>
                        </>
                    }
                    title={noteProp.title}
                    subheader={noteProp.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'pre-wrap' }}>
                        {noteProp.details}
                    </Typography>
                </CardContent>
            </StyledCard>
        </div>
    );
};

export default NoteCard;
