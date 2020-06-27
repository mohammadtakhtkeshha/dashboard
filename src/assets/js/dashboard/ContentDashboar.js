import {makeStyles} from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    userBlock: {
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
    // pagination: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     padding: '20px',
    //     '& ul': {
    //         '& li': {
    //             '& button': {
    //                 borderRadius: '0',
    //                 margin: '0',
    //                 borderColor: colors.grey.tooLight,
    //                 color: colors.primary,
    //                 padding: '13px'
    //             }
    //         }
    //     },
    //     '& .MuiPaginationItem-page.Mui-selected': {
    //         backgroundColor: colors.primary,
    //         color: 'white',
    //         border: '0'
    //     }
    // },
    title: {
        marginBottom: '10px',
        fontSize: '14px',
        fontWeight: '500'
    },
}));
