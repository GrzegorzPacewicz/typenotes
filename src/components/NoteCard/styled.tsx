import { Avatar, Card, styled, Theme } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';

interface Note {
    category: string;
}

interface StyledCardProps {
    note: Note;
    }

export const StyledCard = styled(Card)<StyledCardProps & { theme: Theme }>((props) => ({
    border:
        props.note.category === 'work'
            ? `1px solid ${props.theme.palette.primary.main}`
            : props.note.category === 'reminders'
                ? `1px solid ${red[500]}`
                : props.note.category === 'money'
                    ? `1px solid ${green[500]}`
                    : props.note.category === 'todos'
                        ? `1px solid ${yellow[600]}`
                        : 'none',
    transition: 'transform 0.5s ease',
    '&:hover': {
        transform: 'scale(1.03)',
    },
}));

interface StyledAvatarProps {
    note: Note;
    }

export const StyledAvatar = styled(Avatar)<StyledAvatarProps & { theme: Theme }>((props) => ({
    backgroundColor:
        props.note.category === 'work'
            ? `${props.theme.palette.primary.main}`
            : props.note.category === 'reminders'
                ? red[600]
                : props.note.category === 'money'
                    ? green[500]
                    : props.note.category === 'todos'
                        ? yellow[600]
                        : 'none',
}));

