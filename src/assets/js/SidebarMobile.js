import styled from "styled-components";

export const StyledSidebarMobile = styled.div`
             position: fixed;
             right: 0;
             top: 0;
             bottom: 0;
             width: ${({show})=> show ? '100vw' : 0};
             margin: 0;
             background-color: rgba(0, 0, 0, 0.3);
             z-index: 50;
`

export const StyledSidebar = styled.div`
                width: ${({show})=> show ? '300px' : 0};
                transition:width .5s;
                background-color: white;
                height:100vh;
                & .MuiBox-root {
                    padding-top: 0;
                    padding-right: 0;
                    & nav{
                        padding-top: 0;
                    }
                }
                & #myheader{
                    height: 100vh;
                }
                & .MuiPaper-root{
                    border-radius: 0;
                    margin-right:0;
                }
                & .MuiTabs-flexContainer{
                    height: 100vh;
                }
`
