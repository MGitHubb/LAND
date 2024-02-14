import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    page: {
        backgroundColor: '#F4F6F6'
    },
    topImage: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        overflow: 'hidden'
    },
    topImg: {
        opacity: '70%'
    },
    title: {
        textAlign: 'center',
        marginBottom: '40px',
        marginTop: "40px"
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingBottom: '30px',
        alignItems: 'flex-start',
    },
    column2: {
        alignItems: 'flex-start',
        textAlign: 'left',
        width: '700px',
        height: '800px',
        margin: '10px'
    },
    container: {
        flexDirection: "column"
    },
    initMap: {
       paddingBottom: '60px' 
    },
    field: {
        paddingBottom: '20px'
    },
    field1: {
        paddingBottom: '60px'
    },
    addPostButton: {
        textAlign: 'center',
        paddingBottom: '60px'
    },
    previewChip: {
        minWidth: 160,
        maxWidth: 210
      }
});
