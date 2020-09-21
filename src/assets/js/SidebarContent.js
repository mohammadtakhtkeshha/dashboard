import {primary, white,grey} from 'components/partials/Colors';
import styled from 'styled-components';

export const active = () => ({
    active:{
        color: `${primary}!important`,
        backgroundColor: grey.sidebarActive
    }
});

export const StyledSidebar = styled.div`
        flex-grow: 1;
        background-color:${white};
        display: flex;
        flex-direction: row;
        height: calc(100% - 75px);
        text-align: center;
        & > ul{
            width:100%;
            margin: 0 auto;
            & li {
                justify-content:center;
                & a{
                    padding: 6px;
                    width: 100%;
                    text-align: center;
                }
            }
            }
`
