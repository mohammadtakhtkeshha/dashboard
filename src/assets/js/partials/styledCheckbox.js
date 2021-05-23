import {grey, green} from "assets/js/library/abstracts/colors";
import styled from "styled-components"

// export const styledCheckbox = {
    // root: {
    //     cursor: "pointer",
    //     transition: 'all 1s',
    //     '&:hover': {
    //         // backgroundColor: 'transparent',
    //     },
    //
    // },
    // icon: {
    //     borderRadius: 3,
    //     width: 23,
    //     height: 23,
    //     background: 'white',
    //     border: `1px solid ${grey[0]}`,
    //     boxSizing: 'border-box',
    // },
    // checkedIcon: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: '3px',
    //     border: `1px solid ${green[0]}`,
    //     transition: 'all 1s',
    //     '&:before': {
    //         display: 'block',
    //         width: '100%',
    //         height: '100%',
    //         background: `url(${small}) no-repeat white center`,
    //         content: '""',
    //         backgroundColor: green[0],
    //         transition: 'all 1s',
    //     },
    // },
// }

export const StyledCheckBox = styled.label`
             display: flex;
             align-items:center;
             margin:.4rem 0;
              position: relative;
              padding-right: 35px;
              cursor: pointer;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              font-size:13px;
              & input {
                  position: absolute;
                  opacity: 0;
                  cursor: pointer;
                  height: 0;
                  width: 0;
             } 
             & span {
                  position: absolute;
                  top: 50%;
                  left: ${props => props.lang === "en" ? "0" : ""};
                  right:${props => props.lang === "en" ? "" : "0"};
                  transform: translate(0,-50%);
                  height: 20px;
                  width: 20px;
                  border-radius:4px;
                  border:1px solid ${grey[0]};
                  transition:all .3s;
             }
             & input:checked ~ span{
                background-color:${green[0]};
                border:1px solid ${green[0]};
             }
             & span:after {
                  content: "";
                  position: absolute;
                  display: none;
                  left: 6px;
                  top: 2px;
                  width: 5px;
                  height: 10px;
                  border: solid white;
                  border-width: 0 3px 3px 0;
                  -webkit-transform: rotate(45deg);
                  -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
             }
             & input:checked ~ span:after{
                display:block;
             } 
`
