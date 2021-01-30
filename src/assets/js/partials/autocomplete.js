import styled from "styled-components"

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
                    left: ${props => props.lang === "en" ? "10px":0};
                    right: ${props => props.lang === "en" ? 0:"10px"};
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
