import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    findLand: {
        textAlign: 'left',
        color: '#94EE95'
    },
    content: {
        paddingLeft: '80px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    search: {
        position: 'relative',
        width: '420px',
        height: '60px',
        background: '#fff',
        borderRadius: '60px',
        transition: '0.5s',
        boxShadow: '0 0 0 2px #94EE95',
        overflow: 'hidden',
        marginBottom: '40px'
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '60px',
        height: '60px',
        background: '#fff',
        borderRadius: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
        cursor: 'pointer'
    },
    input: {
        position: 'relative',
        width: '300px',
        height: '60px',
        left: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clear: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '15px',
        height: '15px',
        right: '15px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    column1: {
        paddingTop: '120px'
    },
    column2: {
        paddingTop: '50px'
    },
    image: {
        borderRadius: '8%'
    }
});



