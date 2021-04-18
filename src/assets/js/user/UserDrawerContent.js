import * as colors from "assets/js/library/abstracts/colors";
import styled from "styled-components"
import {green,grey,black} from "assets/js/library/abstracts/colors"
import cirlcleSvg from "assets/svg/circle.svg"

export const styles=(theme) => ({
    content: {
        color: 'black',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        overflow: 'scroll',
        alignItems: 'center',
        '& .avatar': {
            borderBottom: `1px solid ${colors.grey[2]}`,
            '& > :first-child': {
                justifyContent: 'center!important',
            },
            textAlign: 'center',
            '& #name': {
                color: colors.green[0],
                fontSize: '20px',
                paddingTop: theme.spacing(3),
            },
            '& #email': {
                color: colors.green[0],
                fontSize: '14px',
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(2),
            },
            '& #username': {
                color: colors.green[0],
                fontSize: '20px',
                paddingTop: theme.spacing(1),
            },
            '& #roleBlock': {
                '& .role': {
                    color: colors.grey[0],
                    fontSize: '14px',
                    paddingLeft: '5px',
                },
            },

            '& #nameBlock': {
                display: 'flex',
                justifyContent: 'center',
                paddingTop: theme.spacing(2),
                '& .role': {
                    color: colors.grey[0],
                    fontSize: '14px',
                    paddingLeft: '5px',
                },
                '& #setting': {
                    color: colors.darkBlue,
                    fontSize: '14px',
                    paddingTop: '2px',
                    height: '20px',
                },
            },

        },

        '& .buttons': {
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            '& .link': {
                margin: theme.spacing(1),
                textDecoration: 'none',
                display: 'block',
                '& button': {
                    margin: theme.spacing(1),
                    width: '100%',
                },
            },


        },
    }

})

export const StyledGreenBackground =styled.div`
        position:relative;
        width:300px;
        background-color:${green[6]};
        height:45%;
        display:flex;
        justify-content:center;
        align-items:center;
        
`

export const StyledProfile= styled.div`
         position:relative;
         &>div{
          background:url(${cirlcleSvg}) no-repeat center;
         }
          & h4{
                text-align:center;
                font-size:1rem;
                font-weight:300;
                margin-top:10px;
          }
          // & > img {
          //   width:20px;
          //   height:20px;
          //   position:absolute;
          //   top:0;
          //   right:0;
          //   z-index:1;
          // }
        
`

export const StyledWhiteBackground =styled.div`
        height:55%;
`

export const StyledSinusSvg = styled.img`
        position:absolute;
        bottom:0;
        right:0;
        left:0;
`

export const StyledUl = styled.ul`
         color:${black[4]};
         padding:0;
         margin:10px;
         list-style:none;
         text-align:${lang => lang === 'en' ? "left" : "right" };
`

export const StyledLi = styled.li`
        cursor:pointer;
        &:not(:last-child){
            border-bottom:1px solid ${grey[0]};
        }
        padding:10px;

`


export default styles;
