import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    authBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid #000',
    },
    submitButton: {
        padding: '20px'
    },
    field: {
        paddingBottom: '20px'
    },
    field1: {
        paddingBottom: '30px'
    },
    gridItem: {
        padding: '30px',
        textAlign: 'center'
    },
    registerText: {
        color: '#2e7d32',
        textAlign: 'center'
    }
});
