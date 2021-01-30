import styled from "styled-components"
import {makeStyles} from "@material-ui/styles";
import {blue, green, white} from "components/partials/Colors";

export const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        borderRadius:'20px',
        overflow:'hidden',
        '@media(max-width:992px)': {
            margin: `${theme.spacing(2)}px 0`,
        }
    },
    userBlock: {
        borderRadius:'0!important',
        '& thead':{
            '& tr':{
                backgroundImage: `linear-gradient(to right, ${blue[6]} , ${green[4]})`,
                padding:theme.spacing(2),
            }
        },
        '& th': {
            padding:'10px',
        },
        '& td': {
            '& .imgBlock':{
                width:'50px!important',
                height:'50px',
                borderRadius:'100%',
                overflow:'hidden',
                '& img':{
                    width:'100%',
                    height:'100%',
                }
            }
        }
    },
    title: {
        fontSize: '19px',
        fontWeight: '200',
        textAlign:'center',
        padding:theme.spacing(2),
        color:white,
        backgroundImage: `linear-gradient(to right,${blue[5]}, ${green[3]})`,
    },
}));

export const StyledTable = styled.div`
        display:flex;
        flex-direction:column;
`

export const StyledTableHeadRow = styled.div`
                display:flex;
                flex-direction:row;
                display:flex;
                padding: 1rem 2rem;
                color:white;
                background-image: linear-gradient(to right, ${blue[6]} , ${green[4]});
                &>div{
                    width:25%!important;
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
             padding:5px;
             display: flex;
             align-items: center;
             &:hover{
                 box-shadow:0 14px 11px #d3d3d5;
             }
             &>div{
                width:25%;
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
                    }
            }
           
`

export const StyledPaper = styled.div`
     margin: theme.spacing(2);
        borderRadius:20px;
        overflow:hidden;
        @media(max-width:992px) {
            margin: 2rem 0;
        }
`
