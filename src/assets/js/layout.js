import styled from "styled-components";

export const StyledBox=styled.div`
               display:flex;
               flex-direction:row;
               direction:${props => props.lang === 'en' ? 'ltr' : 'rtl'}
`

export const defaultStyles = {
    direction: 'rtl',
    typography: {
        fontFamily: ["primary-font", "segoe ui", "tahoma"],
        body1: {
            fontSize: '13px'
        }
    },
    breakpoints: {
        values: {
            xs: 576, sm: 768, md: 992, lg: 1200, xl: 1200
        }
    },
    overrides: {
        MuiPaper: {
            elevation1: {
                boxShadow: '0 0 0 0',
            }
        }
    }
};
