import { FormControl, styled, TextField } from '@mui/material';

const createStyledComponent = (component: React.ComponentType<any>) => styled(component)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
});

export const StyledTextField = createStyledComponent(TextField);
export const StyledFormControl = createStyledComponent(FormControl);
