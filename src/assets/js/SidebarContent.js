import {green, white, grey, blue} from 'components/partials/Colors';
import styled from 'styled-components';
import {StyledNotScrollbar} from "./App";
import dashboardImg from "assets/svg/sidebarIcons/dashboard.png"
import dashboardHover from "assets/svg/sidebarIcons/dashboard-hover.png"

export const active = () => ({
    active: {
        color: `${green[0]}!important`,
        backgroundColor: grey[14]
    }
})

export const StyledSidebar = styled.div`
        flex-grow: 1;
        direction:${props => props.lang === "fa" ? "ltr" : "rtl"}
        background-color:${white};
        display: flex;
        flex-direction: row;
        text-align: center;
        background-color:${white[0]};
        // margin:${props => props.lang === 'en' ? '0 0 0 10px ' : ' 0 10px 0 0'};
        height:calc(100vh - 64px);
        overflow-y:scroll;
                    /* width */
            ::-webkit-scrollbar {
              width: 10px;
                      cursor:pointer;
            }
            
            /* Track */
            ::-webkit-scrollbar-track {
              // box-shadow: inset 0 0 5px black; 
              border-radius: 10px;
            }
             
            /* Handle */
            ::-webkit-scrollbar-thumb {
              background: ${green[4]}; 
              border-radius: 10px;
              border: 1px solid ${blue[4]};
            }
            
            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
              background: ${green[8]}; 
            }
        & > ul{
            padding:0!important;
            width:100%;
            margin: 0 auto;
            // & li {
            //    & .icon{
            //         width:37px;
            //         height:30px;
            //         background:url(${dashboardImg});
            //        } 
            //     &:hover{
            //        & .icon{
            //             background:url(${dashboardHover});
            //        } 
            //     }
            //     cursor:pointer;
            //     &>span{
            //         background-image:url();
            //     }
            //     border-bottom:1px solid ${grey[11]};
            //     justify-content:center;
            //     & a{
            //         padding: 6px;
            //         width: 100%;
            //         text-align: ${props => props.lang === 'en' ? 'left' : 'right'};
            //     }
            // }
           }
`

export const LiStyles = () => ({
    root: {
        // border: '1px solid red',
        borderBottom: `1px solid ${grey[11]}`,
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '0!important',
        // paddingBottom:'0!important',
        '& .icon': {
            width: '35px',
            height: '35px',
            backgroundColor: `${grey[13]}!important`,
            borderRadius: '5px',
            background: props => `url(${props.img}) no-repeat center`,
            transition: 'background .3s',
            transitionDelay: '.3s',
            padding:'0',

        },
        '&:hover': {
            '& .icon': {
                width: '35px',
                height: '35px',
                backgroundColor: `${grey[12]}!important`,
                background: props => `url(${props.imghover}) no-repeat center`,
            }
        },
        '& a': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 13px',
            boxSizing: 'border-box',
            width: '100%',
            textAlign: props => props.lang === 'en' ? 'left' : 'right',
            '& span': {
                padding: '10px',
            }
        }
    }
})

export const styledExpansionPanel = () => ({
    root: {
        // border: '1px solid blue',
        width: '100%',
        textAlign: props => props.lang === "en" ? 'left' : 'right',
        margin: '0!important',
        '&>div':{
            padding:'0!important'
        },
        '& .MuiExpansionPanelSummary-content':{
            alignItems:'center',
            margin:'0!important',
        },
        '& .MuiIconButton-root':{
            '& span':{
                padding:'0!important'
            }
        }
    }
})

export const StyledExpansionItem = styled.div`
                &:not(:last-child){
                  border-bottom:1px solid ${grey[11]};
                }
                &:first-child{
                  border-top:1px solid ${grey[11]};
                }
`

export const StyledUl = styled.ul`
            list-style-type:none;
            position:relative;
            border-top:1px solid ${grey[11]};
              &::before{
                content: "";
                position: absolute;
                border-right: 1px solid #909390;
                width: 0;
                height: 93%;
                right: 30px;
            }
`

export const StyledLi = styled.li`
            position:relative;
            padding:8px;
            &::before{
                content: "";
                position: absolute;
                right: -13px;
                border: 1px solid #909390;
                border-radius: 100%;
                width: 5px;
                height: 5px;
                top: calc(50% - 1px);
                background-color: white;
                outline: 4px solid white;
            }
`

export const styledExpansionPanelSummary = () => ({
    root: {
        width:"100%",
        padding:'0!important',
        '&>.MuiExpansionPanelSummary-content': {
            '& .MuiTypography-root': {
                margin: '0px 10px!important',
            }
        },
    }
})

export const styledExpansionPanelDetails = () => ({
    root: {
        flexDirection: "column",
        padding: '0!important',
        "& a": {
            padding: "0!important"
        }
    }
})

export const styledList = () => ({
    root: {
        direction : props => props.lang === "fa" ? "rtl" : "ltr"
    }
})


