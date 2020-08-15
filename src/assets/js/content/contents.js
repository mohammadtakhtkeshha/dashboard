import {makeStyles} from "@material-ui/core/styles";
import * as colors from "../../../components/partials/Colors";

const useStyles = makeStyles((theme) => ({
    contentBlock: {
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .imgBlock':{
            width:'50px!important',
            height:'50px',
            borderRadius:'100%',
            overflow:'hidden',
            '& img':{
                width:'100%'
            }
        }
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        '& ul': {
            '& li': {
                '& button': {
                    borderRadius: '0',
                    margin: '0',
                    borderColor: colors.grey.tooLight,
                    color: colors.primary,
                    padding: '13px'
                }
            }
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: colors.primary,
            color: 'white',
            border: '0'
        }
    },
    mypaper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor:'transparent',
        '& .head': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: "center",
            '& button': {
                backgroundColor: colors.primary,
                border: 0,
                cursor: 'pointer',
                padding: '10px 15px',
                lineHeight: '14px',
                color: colors.white,
                borderRadius: '5px',
                '&:focus': {
                    outline: '0!important',
                }
            },
            '& .text': {
                fontSize: '14px',
                fontWeight: 600,
            }
        },
        '& .actions': {
            '& #actions': {
                '& .MuiTextField-root': {
                    width: '100%',
                }
            }
        },
        '& .filter': {
            '& #details': {
                '& .inputBlock': {
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    '& input': {
                        margin: '5px 5px',
                        padding: '18.5px 14px'
                    },
                    '& div': {
                        width: '24%',
                        padding: '2px 5px',
                        '@media(max-width:1385px)': {
                            width: '30%',
                        },
                        '@media(max-width:471px)': {
                            width: '100%',
                        }
                    },
                    '& .MuiTextField-root': {
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        '& div': {
                            width: '100%',
                            height: '60px',
                            marginTop: '8px'
                        }
                    }
                }
            }

        },
        '& .box':{
            borderRadius:'4px',
            backgroundColor:colors.white,
            margin:'1rem 0',
            boxShadow: '0px 2px 4px 0px #999f9d',
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& #modal': {
            border: '0!important',
            minWidth:'100px',
            marginTop: '5rem 5rem',
            maxWidth: '650px',
            '&:focus': {
                outline: '0!important',
            },
            position: 'relative',
            '& .header': {
                display:'flex',
                justifyContent:'space-between',
                position: 'absolute',
                top: '0',
                left: 0,
                right: 0,
                height: '40px',
                zIndex:'100',
                backgroundColor: colors.primary,
                '& .button': {
                    background: 'transparent',
                    cursor: 'pointer',
                    border: 0,
                    '&:focus': {
                        outline: '0!important',
                    },
                    '& svg': {
                        color: colors.white,
                        margin: '9px 9px',
                    }
                },
                '& .title': {
                    margin: '9px 13px',
                    color:colors.white
                }
            },
            '& .flexDirL':{
                flexDirection:'row-reverse'
            },
            '& .flexDirR':{
                flexDirection:'row'

            },
            '& .body': {
                marginTop: '16px',
                height: 'calc(100vh - 5rem)',
                overflow: 'scroll',
                scrollbar: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                }
            }
        }
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default {useStyles};