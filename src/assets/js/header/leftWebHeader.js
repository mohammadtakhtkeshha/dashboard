import styled from "styled-components";
import {blue, grey, white, green} from "components/partials/Colors";

export const StyledPowerBox = styled.div`
            background-color:${blue[8]};
            padding: .4rem .2rem .1rem;
            border-radius: 0 100% 100% 100%;
            & button{
                background-color:transparent;
                border:0!important;
                color:${white[0]};
                &:focus{
                   border:0!important;
                }
            }
`;

export const StyledBoxItem = styled.div`
            cursor:pointer;
            margin-left:6px;
            margin-right:6px;
            & button{
                border-radius:5px;
                padding: .5rem .5rem .1rem;
                cursor:pointer;
                background-color:white;
                border:0!important;
               
                &:focus{
                    outline:0!important;
                }
               svg{
                    color:${grey[10]};
                    width:19px;
                    height:19px;
                }
            }
          
`;

export const styledSelect = () => ({
    root: {
        width: '100%',
        padding: '12px!important',
        '& .MuiListItemIcon-root': {
            padding: '0 8px',
            '& img': {
                borderRadius: '100%',
                width: '20px',
                height: '20px',
            }
        },

    }

});

export const StyledFlagsBlock = styled.div`
        width:70px;
        z-index:1000;
        cursor:pointer;
        & .MuiFormControl-root{
            width:100%;
             & svg{
                position:unset;
                color:${white[0]}
            }
            & .MuiFilledInput-root{
               background-color:transparent;
            }
            & .MuiSelect-select:focus{
                background-color:transparent!important;
                border:0!important;
            } 
            & .MuiFilledInput-underline::after,& .MuiFilledInput-underline::before{
                border:0!important;
            }
        }
`;

export const StyledBox = styled.div`
        display: flex;
        flex-grow: 2;
        align-items: center;
        justify-content:flex-end;
        & .item{
            & button{
                cursor:pointer;
                background-color:transparent;
                border:0!important;
                color:green[0];
                &:focus:{
                    outline:0!important;
                }
            }
        }
`;

export const styledListItemIcon = () => ({
    root: {
        '& img': {
            width: '20px',
            height: '20px',
            cursor: 'pointer',
        }
    }
});

export const StyledSearchBlock = styled.div`
            position: relative;
            & input{
                border-radius: 5px;
                border: none;
                padding: 8px;
                background-color: ${white[0]};
                font-size: 14px;
                &:focus{
                    outline: 0;
                    outline-offset: 0;
                    border:none;
                },
            }
           & label {
            top: 50%;
            height:1rem;
            color: ${green[0]};
            position: absolute;
            transform: translateY(-50%);
            left:${props => props.lang === 'fa' ? '4%' : ''};
            right:${props => props.lang === 'fa' ? '' : '4%'};
        }
`;
