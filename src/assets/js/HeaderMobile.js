import {blue, green} from "assets/js/library/abstracts/colors";

export const styles = (theme) => ({
    mobileHeader: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '100',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 39px 10px 26px',
        backgroundImage: props => props.lang === 'en' ? ` linear-gradient(to left,${blue[5]}, ${green[4]}) ` : `linear-gradient(to right,${blue[5]}, ${green[4]})`,
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
    buttonBlock:{
        display:'flex',
        '&.rightAuto':{
            marginRight:'auto',
        },
        '&.leftAuto':{
            marginLeft:'auto',

        },
        '& .headerButton': {
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
            width: '40px',
            height: '35px',
            borderRadius: '5px',
            backgroundColor: 'white',
            border: '0',
            color: '#5867dd',
            '&:hover': {
                cursor: 'pointer'
            },
            '&:focus': {
                outline: '0',
            },
        },
        '& .marginRight':{
            marginRight: '12px!important',
        },
        '& .marginLeft':{
            marginLeft: '12px',
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
});

