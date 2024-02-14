import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingBottom: '30px',
        paddingTop: '50px',
        alignItems: 'flex-start',
    },
    column1: {
        alignItems: 'flex-start',
        textAlign: 'left',
        width: '550px',
        height: '650px',
        margin: '10px',
    },
    title: {
        paddingTop: '20px'
    },
    contact: {
        backgroundColor: '#DCDCDC',
        width: '300px',
        textAlign: 'center',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderRadius: '8px'
    },
    options: {
        padding: '10px'
    },
    initMap: {
        width: '550px',
        height: '650px',
    },
    description: {
        padding: '20px'
    }
})