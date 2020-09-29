import {makeStyles} from '@material-ui/core/styles/index';
import {green} from './../../components/partials/Colors'

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        '&.MuiAppBar-colorPrimary': {
            backgroundColor: '#e7ebee',
            boxShadow: '0 0 0 0',
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    leftBlock: {
        flexGrow: 2,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'flex-end',
        '& .item':{
            cursor:'pointer',
            marginLeft:'6px',
            marginRight:'6px',
            '& button':{
                cursor:'pointer',
                backgroundColor:'transparent',
                border:'0!important',
                color:green[1],
                '&:focus':{
                    outline:'0!important',
                }
            }
        }
    },
    headerInput: {
        position: 'relative',
        '& input': {
            borderRadius: '5px',
            border: 'none',
            padding: '8px',
            backgroundColor: '#fff',
            fontSize: '14px',
            '&:focus': {
                outline: '0',
                outlineOffset: '0',
                border: 'none',
            },
        },
        '& #label': {
            top: '50%',
            height:'1rem',
            color: green[1],
            position: 'absolute',
            transform: 'translateY(-50%)',
        },
    },
    icons: {
        backgroundColor: 'white',
        [theme.breakpoints.down('md')]: {
            backgroundColor: '#e1e1e1',
        },
        // marginRight: '12px',
        borderRadius: '5px',
        width: '40px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
            color: '#828282'
        },
        '&#message': {
            position: 'relative',
            '& .MuiBox-root': {
                width: '8px',
                height: '8px',
                position: 'absolute',
                top: '-3px',
                left: '0',
                borderRadius: '100%',
                backgroundColor: '#e04b4b'
            }
        }
    },
    avatar: {
        // marginRight: '12px',
        cursor : 'pointer'
    },
    leftInputLabel:{
        left: '4%',
    },
    rightInputLabel:{
        right: '4%',
    },
}));

