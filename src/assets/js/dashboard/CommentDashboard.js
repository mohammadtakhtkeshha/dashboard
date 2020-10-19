import {makeStyles} from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        '@media(max-width:992px)': {
            margin: `${theme.spacing(2)}px 0`,
        }
    },
    commentBlock: {
        '& th': {
                padding:'10px!important'
        },
        '& td': {
            '& .imgBlock':{
                width:'50px!important',
                height:'50px',
                borderRadius:'100%',
                display:'flex',
                overflow:'hidden',
                '& img':{
                    width:'100%',
                    height:'100%',
                }
            }
        }
    },
    title: {
        marginBottom: '10px',
        fontSize: '14px',
        fontWeight: '500'
    },
}));
