import styled from "styled-components"
import {grey} from "assets/js/library/abstracts/colors";

export const StyledAutocomplete = styled.div`
             & .MuiFilledInput-adornedEnd{
             padding:0!important;
             height:47px!important;
             border:0!important;
                &>div{
                  padding:3px;
                  position:relative;
                  margin:7px;
                  top:47px;
                  & .MuiAutocomplete-clearIndicator{
                    display:none;
                  }
                  & svg {
                    margin:0!important;
                  }
                }
                 & input{
                    position: absolute;
                    left: ${props => props.lang === "en" ? "10px" : 0};
                    right: ${props => props.lang === "en" ? 0 : "10px"};
                    width: 100%;
                    padding: 0!important;
                  }
             }
             & .MuiFilledInput-underline:before{
                display:none;
             }
              & .MuiFilledInput-underline:after{
                display:none;
             }
`

export const StyledMultiSelect = styled.div`
            .MuiFormControl-fullWidth{
              background-color:${grey[2]};
              padding:8px 0;
              border-radius:4px;
            }   
            .MuiAutocomplete-tag{
              position:relative;
              top:51px;
              background: white;
              border: 1px solid ${grey[1]};
              & svg{
                margin:0;
              }
            }
           .MuiAutocomplete-inputRoot{
              min-height:35px;
            } 
            .MuiInput-underline{
              border:0!important;
            }
            .MuiInput-underline:after{
              border:0!important;
              display:none!important;
              border-bottom:0!important;
              transition:none;
            }
            .MuiInput-underline:before{
              transition:none;
              border:0!important;
            }
            .MuiInput-underline:hover:not(.Mui-disabled):before{
              border:0!important;
            } 
            .MuiAutocomplete-input{
              position: absolute;
              width: calc(100% - 74px)!important;
            }
`

export const styledTextField = () => ({
    root: {
        // border: '1px solid red',
    }
})
