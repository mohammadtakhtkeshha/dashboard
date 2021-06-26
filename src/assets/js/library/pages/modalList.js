import {black} from "assets/js/library/abstracts/colors"
import styled from "styled-components"

export const listModalStyles = (theme) => ({
    root: {
        direction: props => props.lang === 'en' ? 'ltr' : 'rtl',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        height: '100%',
        paddingTop: '68px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        /* Hide scrollbar for IE, Edge and Firefox */
        '&':{
            '-ms-overflow-style': 'none', /* IE and Edge */
            'scrollbar-width': 'none' /* Firefox */
        },
        '& svg': {
            width: '30px',
            height: '30px',
            padding: '0 25px',
        }
    }
})

export const listItemModalStyles = (theme) => ({
    root: {
        // marginTop:'20px',
        padding: '24px 0 24px 22px',
        borderBottom: '1px solid #BBC3CE',
        cursor: 'pointer',
        color: black[0],
        display:props => props.permission === 'true' ? 'flex' : 'none',
        '&:last-child': {
            borderBottom: '0!important'
        },
        // '&:first-child': {
        //     fontWeight: 'bold',
        //     border: '1px solid red',
        //     '&>div': {
        //         fontSize: '18px!important',
        //         textAlign: 'center!important',
        //         '&>span': {
        //             fontSize: '18px',
        //         }
        //     }
        // }
    },
})

export const StyledModalHeader = styled.div`
        position:absolute;
        top:0;
        left:0;
        right:0;
        padding: 24px 0 24px 22px;
        border-bottom: 1px solid #BBC3CE;
        cursor: pointer;
        color: ${black[0]};
        font-size: 18px;
        text-align: center!important;
        z-index:1;
        background-color:white;
`

export const styledListItemModalText = () => ({
    root: {
        textAlign: props => props.lang === 'en' ? 'left' : 'right'
    }
})

