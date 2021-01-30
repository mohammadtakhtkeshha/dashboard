import styled from "styled-components";
import {grey} from "components/partials/Colors"

export const StyledSidebarBox = styled.div`
        height: 100vh;
        flex-grow: 1;
`

export const StyledContentBox = styled.div`
          flex-grow: 5;
`

export const styledGridSidebar = () => ({
    root: {
        // height: '100%',
        // overflowY: 'scroll',
        position: 'fixed',
        width: '230px',
        zIndex: 11,
        // '&::-webkit-Scrollbar': {
        //     display: 'none'
        // },
        // '&': {
        //     msOverflowStyle: 'none',  /* IE and Edge */
        //     scrollbarWidth: 'none'  /* Firefox */
        // }
    }
});

export const styledGridContent = (theme) => ({
    root: {
        height:'100%',
        width: 'calc(100% - 230px)',
        '@media (max-width: 992px)': {
            width: '100%'
        },
        boxSizing: 'border-box',
        padding: theme.spacing(2),
        margin: props => props.lang === 'en' ? '0 0 0 auto' : '0 auto 0 0',
    }
});

export const StyledPaper = styled.div`
            background-color:transparent;
            padding:0 9px;
            box-shadow: 0 0 0 0;
            @media(min-width : 992px) {
                margin-top: 64px;
            }
`

