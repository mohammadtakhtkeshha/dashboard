import styled from "styled-components"
import {blue,grey, green, red, white,black} from "components/partials/Colors"
import  {StyledDeleteButton,StyledDeleteIcon,StyledActionIcons,StyledEditIcon} from './library/buttons.js'

//z-index{loading:10000,modal:50,userDrawer:50}

export const StyledPaper = styled.div`
        margin: 1rem;
`

export const StyledBox = styled.div`
            border-radius: 4px;
            margin: 1rem 0;
            background-color: white;
            box-shadow: 0px 2px 4px 0px #999f9d;
`

export const HeadButtonStyled = styled.button`
            color: #fff;
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: #12a56d;
`

export const StyledHead = styled.div`
        display: flex;
        align-items: center;
        margin-bottom: 1rem ;
        &>button:nth-child(2){
           margin:${props=>props.lang === 'fa' ? '0 auto 0 10px':'0 10px 0 auto'};
        };
      
       
`

export const StyledActionButtonBlock = styled.div`
            display:flex;
            & button{
               cursor:pointer;
               border:0 solid red;
               margin: 3px;;
               display:flex;
               flex-direction:row;
               color:${white[0]};
                width: 70px;
                height: 41px;
               font-size :14px;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                // box-shadow: 0px 4px 8px ${grey[1]}!important;
               &:focus{
                outline:0!important;
                }
            }
            & button:nth-child(1){
               background-color:${blue[0]}
            };
            & button:nth-child(2){
               background-color:${red[0]};
            };
`

export const StyledHeadTypography = styled.div`
       font-size: 14px;
       font-weight: 600;
       padding:10px;
`

export const StyledButton = styled.button`
            color: ${white[0]};
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: ${props => props.bg};
            width:fit-content;
            &:focus{
                outline:0!important;
            }
`

export const StyledDefaultButton = styled.button`
            border: 0;
            cursor: pointer;
            line-height: 14px;
            border-radius: 5px;
            background-color: white;
            &:focus{
                outline:0!important;
            }
`

export const StyledRegisterButton = styled.button`
            color: ${white[0]};
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: ${green[0]};
            width:fit-content;
            &:focus{
                outline:0!important;
            }
`



export const StyledRelative=styled.div`
            position:relative;
`

export const StyledEditButton = styled.button`
            color: ${white[0]};
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: ${blue[0]};
            width:fit-content;
            &:focus{
                outline:0!important;
            }
`


export const modalStyles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& #modal': {
            width:'30%',
            border: '0!important',
            '&:focus': {
                outline: '0!important',
            },
            position: 'relative',
            '& .header': {
                position: 'absolute',
                top: '0',
                left: 0,
                right: 0,
                height: '40px',
                backgroundColor: green[0],
                '& button': {
                    background: 'transparent',
                    cursor: 'pointer',
                    border: 0,
                    '&:focus': {
                        outline: '0!important',
                    },
                    '& svg': {
                        color: white[0],
                        margin: '9px 9px',
                    }
                }
            },
            '& .body': {
                backgroundColor: white[0],
                marginTop: '2.5rem',
            }
        }
    }
})

export const StyledInput = styled.input`
            display: block;
            width:100%;
            height: 1.95rem;
            padding: 1.3rem .75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid ${grey[0]};
            border-radius: .75rem;
            box-sizing:border-box;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            margin-bottom: .5rem;
            &:focus{
                border-color: #ced4da;
                outline: 0;
            }&:disabled{
                background-color:${grey[12]};
            }
`

export const StyledMultiButtonsBlock = styled.div`
    display:flex;
        & button{
            cursor:pointer;
            margin: ${props=>props.lang ==='fa'?'5px 0 5px 5px':'5px 5px 5px 0'};
        }
`

export const StyledLabel=styled.div`
        font-size:.75rem;
        margin-bottom:.75rem;
        display:inline-block;
`

export const StyledTypographyError =  styled.p`
        color:${red[1]};
        font-size:14px;
        text-align : ${props=>props.align}
`

export const styledTextField = () => ({
    root: {
        width:'100%',
        color:'#495057',
        '&>div': {
            borderRadius: '10px',
            '&>select': {
                padding: '13.5px 14px',
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

export const StyledAlignTypography = styled.p`
              text-align : ${props => props.lang === 'en' ? 'left':'right'};
              font-size : 13px;
              margin-bottom:1rem;
`

export const StyledSvg = styled.div`
            background:${grey[7]};
            fill:${black[1]};
            border-radius:100%;
            cursor:pointer;
            & svg{
                width: 34px;
                height: 21px;
                padding: 9px 4px 3px;
            }
`

export const StyledDirection = styled.div`
               direction:${props=>props.lang === 'en' ? 'ltr' : 'rtl'};
`

export const MarginTop1 = styled.div`
       margin-top : 1rem;
`

export const StyledValidError = styled.p`
            color:red;
            text-align : ${props=>props.lang === 'en' ? 'left':'right'}
`

// export const styledTextField = {
//     root:{
//         width:'100%',
//         '& select':{
//             padding: '.9rem 1rem',
//         }
//     }
// }

export const StyledNotScrollbar = styled.div`
        &::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        & {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
`

export const StyledRadioButton = styled.div`
             & .MuiFormGroup-root{
                   flex-direction:row;
             }
             & .MuiRadio-colorSecondary.Mui-checked{
                color:${blue[15]};
             }
`

export const StyledBtn = styled.button`
             border: 0;
             cursor: pointer;
             background-color: transparent;
             position:relative;
             &:focus{
                outline:0!important;
             }
`

export const Center = styled.div`
        text-align:center;
`

export const StyledCheckboxImgInTable = styled.div`
              display:flex;
              &>div{
              margin:10px;
              }
`

// ------------------- table styles ---------------------------
export const StyledTable = styled.div`
        display:flex;
        flex-direction:column;
        border-radius:0 0 5px 5px;
`

export const StyledTableHeadRow = styled.div`
                display:flex;
                align-items:center;
                flex-direction:row;
                display:flex;
                padding: 1rem 2rem;
                color:white;
                background-image: ${props=>props.lang === 'en' ?` linear-gradient(to left,${blue[5]}, ${green[4]}) `:`linear-gradient(to right,${blue[5]}, ${green[4]})`};
                &>div{
                    width:100%!important;
                }
`

export const StyledTableParent = styled.div`
            background-color:${grey[17]};
            border-radius: 20px;
            margin: 1.5rem 0;
            overflow:hidden;
            display:${props=>props.length === 0 ? 'none' : 'block'}
`

export const StyledTablePaper = styled.div`
            &>h4{//title
               font-size: 19px;
               font-weight: 200;
               text-align:center;
               padding:.6rem;
               color:white;
               background-image: ${props=>props.lang === 'en' ?` linear-gradient(to left,${blue[5]}, ${green[4]}) `:`linear-gradient(to right,${blue[5]}, ${green[4]})`};
            }   
`

export const StyledTableBody = styled.div`
            background-color:#f3f4f6; 
`

export const StyledTableBodyRow = styled.div`
             display:flex;
             border-radius:20px 0 20px 0;
             margin:20px;
             cursor:pointer;
             background-color:#ffffff;
             font-size:13px;
             padding:10px 10px;
             display: flex;
             align-items: center;
             transition:box-shadow .7s;
             &:hover{
                 box-shadow:0 14px 11px #d3d3d5;
             }
             &>div{
                width:100%;
             }
`

export const StyledTableCell = styled.div`
            & #img{
                width:50px;
                height:50px;
                border-radius:100%;
                overflow:hidden;
                 & img{
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    }
            }
           
`

// -------------------- modal ----------------------------------
// export const ModalBody = styled(StyledNotScrollbar)`
export const ModalBody = styled.div`
                border:1px solid ${grey[1]}!important;
                border-radius:15px;
                overflow-y:hidden;
                box-shadow: 0 2px 10px rgba(31,45,61,0.16);
                background-color:white;
                width:100%;
                position: relative;
                height: calc(100vh - 50px);
                width: 100%;
`

// -------------------- status block ------------------------
export const StyledStatusButtonBlock = styled.div`
                border: 1px solid ${grey[1]};
                height: 50px;
                padding : 3px;
                border-radius : 5px;
                border-box: box-sizing;
                display : flex;
                box-sizing : border-box;
                width : fit-content!important;
`

export const StyledStatusButton = styled.button`
                height : 100%;
                border-radius: 5px;
                height: 100%;
                border: 0;
                padding: 0 20px;
                cursor:pointer;
                &:focus{
                    outline:0!important;
                }
                &:first-child{
                    box-shadow:${props=>props.status === false ? white: `0 0 10px ${green[0]}`};
                    background-color: ${props=>props.status === false ? white[0] : green[0]};
                    color:${props=>props.status === true ? white[0]: black[1]};

                }
                &:last-child{
                    box-shadow:${props=>props.status === false ? `0 0 10px ${red[0]}` : white[0]};
                    background-color: ${props=>props.status === false ? red[0] : white[0]};
                    color:${props=>props.status === false ? white[0]: black[1]};

                }
`


export {StyledDeleteButton,StyledDeleteIcon,StyledActionIcons,StyledEditIcon}

