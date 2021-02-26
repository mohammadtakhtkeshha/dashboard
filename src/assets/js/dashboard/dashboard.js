import styled from "styled-components"
import {makeStyles} from "@material-ui/styles";
import {blue, green, white,grey} from "components/partials/Colors";
import {StyledTable} from "../App";

export const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        borderRadius:'4px',
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

export const StyledPaper = styled.div`
            &>h4{//title
               font-size: 19px;
               font-weight: 200;
               text-align:center;
               padding:.6rem;
               color:white;
               background-image: ${props=>props.lang === 'en' ?` linear-gradient(to left,${blue[5]}, ${green[10]}) `:`linear-gradient(to right,${blue[5]}, ${green[10]})`};
            }   
`

export const StyledDashboardTable = styled(StyledTable)`
              border-radius:0 0 4px 4px!important;
`

export const dashboardStyles={
    confirmButton:{
        backgroundColor:green[0],
    },
    swalBlock:{
        '& .swal-footer':{
            textAlign:'center'
        }
    }
}

export const StyledDashboardBlock = styled.div`
            background-color:${grey[17]};
            border-radius: 4px;
            margin: 1.5rem 0;
            overflow:hidden;
            display:${props=>props.show === false ? 'none' : 'block'}
            & > div {
                & > div {
                    box-shadow:0 0 0 !important;
                }
            }
`


