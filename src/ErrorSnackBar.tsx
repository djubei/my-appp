import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {setErrorAC} from "./Reducers/appReducer";


function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export function CustomizedSnackbars() {

    // const [open, setOpen] = React.useState(true);

    const error = useSelector<AppRootState, string | null>(state => state.app.error)

    const dispatch = useDispatch()
    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
        // setOpen(false);
    };
    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
}
