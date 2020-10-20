import {green, white,grey} from 'components/partials/Colors';
import styled from 'styled-components';

export const active = () => ({
    active:{
        color: `${green[0]}!important`,
        backgroundColor: grey[6]
    }
});

export const StyledSidebar = styled.div`
        flex-grow: 1;
        background-color:${white};
        display: flex;
        flex-direction: row;
        height: 100%;
        text-align: center;
        overflow-y:scroll;
        background-color:${white[0]};
        margin-right:10px;
        &::-webkit-scrollbar {
          display: none;
        }
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        & > ul{
            width:100%;
            margin: 0 auto;
            & li {
            border-bottom:1px solid ${grey[11]};
                justify-content:center;
                & a{
                    cursor:pointer;
                    padding: 6px;
                    width: 100%;
                    text-align: ${props=>props.lang === 'en' ? 'left': 'right'};
                }
            }
           }
`
