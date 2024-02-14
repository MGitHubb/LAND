import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    authBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid #000'
    },
    field1: {
        paddingBottom: '20px'
    },
    loginBtn: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '100%',
        paddingBottom: '20px'
    },
    field2: {
        paddingBottom: '30px'
    },
    loginBottom: {
        alignContent: 'center'
    }, 
    gridItem: {
        padding: '30px',
        textAlign: 'center'
    },
    loginText: {
        color: '#2e7d32',
        textAlign: 'center'
    }
});
