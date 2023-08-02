import {ListItem, styled, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";

interface ActiveListItemProps {
    selected?: boolean; // Add the selected prop here
}

export const ActiveListItem = styled(ListItem)<ActiveListItemProps>((props) => ({
    "& .MuiListItemIcon-root": {
        color: props.theme.palette.secondary.main,
    },
    "&:hover": {
        cursor: 'pointer',
    },
    backgroundColor: props.selected
        ? props.theme.palette.action.selected // Add the background color for selected state
        : 'transparent', // Set the default background color when not selected
}));

export const Page = styled("div")(({theme}) => ({
    background: grey[100],
    width: "100%",
    padding: theme.spacing(3),
    minHeight: '100vh',
}));

export const StyledDate = styled(Typography)({
    flexGrow: 1,
});
