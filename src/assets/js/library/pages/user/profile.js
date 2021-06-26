import styled from "styled-components"
import {green} from "assets/js/library/abstracts/colors";

export const styledGridItem = () => ({
    root: {
        marginTop: '22px'
    }
})

export const StyledEditProfileHeader = styled.div`
            height:400px;
            background-color:${green[6]};
            position:relative;
            & > img{
                position:absolute;
                bottom:0;
                left:0;
                right:0;
            }
`


export const StyledEditProfileBody = styled.div`
            padding:0 11vw 5vw;
`
export const StyledEditSvgBlock = styled.div`
         display:flex;
         border-radius:100%;
         padding:7px;
         position:absolute;
         top: 17%;
         left: ${({lang})=> lang === 'en'? '-11px':''};
         right: ${({lang})=> lang === 'en'? '':'-11px'};
         background-color: rgb(62 04 144 / 9%);
          & > img {
            width:18px;
            height:18px;
            z-index:1;
            cursor:pointer;
            opacity:1!important;
          }
`

export const StyledUserDrawer = styled.div`
             position: fixed;
             top: 0;
             left: 0;
             bottom:0;
             width: ${({showUserDrawer})=> showUserDrawer  ? '100vw' : '0'};
             height: 100vh;
             direction: ${({lang}) => lang === 'fa' ? 'ltr!important' : 'rtl!important'};
             margin-top: 0;
             background-color: rgba(0, 0, 0, 0.3);
             z-index: 50;
             overflow: hidden;
`

export const StyledDrawerContent = styled.div`
             position:fixed;
             transition:all .5s;
             display: inline-block;
             background-color: white;
             height: 100%;
             overflow:hidden;
             width: ${({showUserDrawer})=> showUserDrawer  ? '300px' : '0'};
`
