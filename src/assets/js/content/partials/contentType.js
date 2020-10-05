import {black} from "../../../../components/partials/Colors";

export const listStyles = (theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        '& svg':{
            width:'30px',
            height:'30px',
            padding : '0 25px',
        }
    }
});

export const listItemStyles = (theme) => ({
    root: {
        padding: '24px 0 24px 22px',
        borderBottom: '1px solid #BBC3CE',
        cursor: 'pointer',
        color:black[0],
        '&:last-child':{
            borderBottom:'0!important'
        },
        '&:first-child':{
            fontWeight:'bold',
            '&>div':{
                fontSize:'18px!important',
                textAlign:'center!important',
                '&>span':{
                    fontSize:'18px',
                }
            }
        }
    },
});

export const styledListItemText = () => ({
    root:{
        textAlign: props => props.lang === 'en' ? 'left':'right'
    }
});

export default {listStyles,listItemStyles,styledListItemText};