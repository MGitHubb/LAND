import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    container: {
        backgroundColor: '#F4F6F6',
        padding: '2px 0 2px'
    },
    cardGrid: {
        padding: '20px 0'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px'
    },
    cardMedia: {
        paddingTop: '56.25%'
    },
    cardContent: {
        flexGrow: '1'
    },
    title: {
        paddingTop: "40px",
        textAlign: 'center'
    },
    subtitle: {
        textAlign: 'center'
    },
    viewButton: {
        marginTop: "50px"
    }
});