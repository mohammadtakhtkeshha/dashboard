import {makeStyles} from "@material-ui/styles";
import {blue, green, white} from "../../../components/partials/Colors";

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
