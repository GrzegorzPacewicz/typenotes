import { ListItem, styled } from "@mui/material";

export const ActiveListItem = styled(ListItem)(({theme}) => ({
    '& .MuiListItemIcon-root': {
        color: theme.palette.secondary.main,
    },
}))