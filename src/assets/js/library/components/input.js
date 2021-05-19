import styled from "styled-components";
import {grey} from "assets/js/library/abstracts/colors";

export const StyledInput = styled.input`
            display: block;
            width:100%;
            height: 1.95rem;
            padding: 1.3rem .75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: ${grey[23]};
            background-color: #fff;
            background-clip: padding-box;
            border: ${({border}) => border ? `1px solid ${border}` : `1px solid ${grey[0]}`};
            border-radius: 4px;
            box-sizing:border-box;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            // margin-bottom: 5px;
            &:focus{
                border-color: ${props => props.border ? `${props.border}` : `${grey[0]}`};
                outline: 0;
            }
            &:disabled{
                background-color:${grey[12]};
            }
            &::placeholder{
                color:${grey[23]};
            } 
          
`

export const styledTextField = () => ({
    root: {
        width: '100%',
        '&>div': {
            borderRadius: '4px',
            '&>select': {
                color: grey[23],
                padding: '14.5px 14px',
                "&:focus": {
                    outline: 'none'
                }
            }
        },
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${grey[0]}`,
            }
        }
    }
})

