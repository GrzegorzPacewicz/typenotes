import {createTheme, Theme} from "@mui/material";
import { blue, purple } from "@mui/material/colors";

export const theme: Theme = createTheme({
    palette: {
        primary: blue,
            // {
            //     main: grey[100]
            // },
        secondary: purple,
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    }
});