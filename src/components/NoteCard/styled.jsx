import { Avatar, Card, styled } from "@mui/material";
import { green, red, yellow } from "@mui/material/colors";

export const StyledCard = styled(Card)(({theme, note}) => ({
    border:
        note.category === 'work' ? `1px solid ${theme.palette.primary.main}`
            : note.category === 'reminders' ? `1px solid ${red[500]}`
                : note.category === 'money' ? `1px solid ${green[500]}`
                    : note.category === 'todos' ? `1px solid ${yellow[600]}`
                        : 'none',
    transition: 'transform 0.5s ease',
    '&:hover': {
        transform: 'scale(1.03)',
    },
}));

export const StyledAvatar = styled(Avatar)(({theme, note}) => ({
    backgroundColor:
        note.category === 'work' ? `${theme.palette.primary.main}`
            : note.category === 'reminders' ? red[600]
                : note.category === 'money' ? green[500]
                    : note.category === 'todos' ? yellow[600]
                        : 'none',
}));