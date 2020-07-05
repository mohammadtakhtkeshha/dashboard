import {makeStyles} from "@material-ui/core/styles";
import * as colors from "../../../components/partials/Colors";

const useStyles = makeStyles((theme) => ({
    userBlock: {
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '11px 0px',
        '& .MuiCheckbox-root': {
            padding: '0 0 0 15px',
        },
        '&:not(:last-child)': {
            borderBottom: '1px solid #d9dbe4',
        },
        '& .item': {
            width: '100%',
            '&:first-child': {
                flexShrink: 2,

            },
            '&.firstName': {
                display: 'flex',
                '& .name': {
                    paddingRight: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '& .imgBlock': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '100%',
                    overflow: 'hidden',
                    width: '50px',
                    height: '50px',
                    '& .MuiCardMedia-root': {
                        width: '50px!important',
                        height: '50px!important',
                    },
                    '& img': {
                        width: '100%',
                        height: '100%',
                    }
                },
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
                '&:focus':{
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
                        '@media(max-width:1385px)':{
                            width:'30%',
                        },
                        '@media(max-width:471px)':{
                            width:'100%',
                        }
                    },
                    '& .MuiTextField-root': {
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        '& div': {
                            width:'100%',
                            height: '60px',
                            marginTop: '8px'
                        }
                    }
                }
            }

        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& #modal':{
            border: '0!important',
            '&:focus':{
                outline: '0!important',
            },
            position:'relative',
            '& .header':{
                position:'absolute',
                top:'0',
                left:0,
                right:0,
                height:'40px',
                backgroundColor:colors.primary,
                '& button':{
                    background:'transparent',
                    cursor:'pointer',
                    border:0,
                    '&:focus':{
                      outline:'0!important',
                    },
                   '& svg':{
                       color:colors.white,
                       margin:'9px 9px',
                   }
                }
            },
            '& .body':{
                marginTop:'16px',
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