import {makeStyles} from '@material-ui/core/styles/index';

export const styles = makeStyles((theme) => ({
    mobileHeader: {
        paddingBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        '& #img': {
            paddingLeft: '10px',
        },

    },
    breadcrumbs: {
        '& h3': {
            fontSize: '23px',
            lineHeight: '32px',
            fontWeight: '700',
            color: 'black'
        },
        '& li:nth-of-type(1)': {
            color: 'black',
        },
        '& li:nth-of-type(3)': {
            color: '#5867dd',
        },

    },
    headerButton: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '18px',
        width: '40px',
        height: '35px',
        borderRadius: '5px',
        backgroundColor: 'white',
        marginRight: '12px',
        border: '0',
        color: '#5867dd',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:focus': {
            outline: '0',
        },
    },
    showWebHeader: {
        backgroundColor: '#f5f5f5',
        padding: '10px 10px',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        border: '1px solid #e1e1e1',
        '& input':{
            '@media(max-width:768px)':{
                display:'none'
            }
        },
        '& label':{
            '@media(max-width:768px)':{
                display:'none'
            }
        },
    }
}));

