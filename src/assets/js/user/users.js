import {makeStyles} from "@material-ui/core/styles";
import {primary, white, grey} from "../../../components/partials/Colors";

const useStyles = makeStyles((theme) => ({
    userBlock: {
        overflowX: 'inherit!important',
        '& table': {
            position: 'relative',
            boxSizing: 'border-box',
            tableLayout: 'fixed',
            '& td,th': {
                wordWrap: 'break-word',
                textAlign: 'center',
                padding: '5px 0',
                '& span': {
                    padding: '2px 0',
                }
            },
            '& th': {
                padding: '10px 0!important'
            },
            '& td:first-child,th:first-child': {
                width: '5%',
                textAlign: 'center',
                '& span': {
                    padding: '0',
                }
            }, '& td:nth-child(2),th:nth-child(2)': {
                width: '6%',
            }, '& td:last-child,th:last-child': {//action buttons block
                width: '16%',
            },
            '& tbody': {
                '& .imgBlock': {
                    width: '50px!important',
                    height: '50px',
                    borderRadius: '100%',
                    overflow: 'hidden',
                    '& img': {
                        width: '100%'
                    }
                },
                '& .buttonBlock': {
                    direction:'rtl',
                    '& button': {
                        margin: '0',
                        padding: '0',
                        boxShadow: '0 0 0 0 !important',
                        '&:first-child': {
                            borderRadius: '0 4px 4px 0',
                        },
                        '&:nth-child(2)': {
                            borderRadius: '4px 0 0 4px',
                        },

                    }
                },
                '& .rightZero': {
                    left: '0',
                },
                '& .leftZero': {
                    right: '0',
                },
                '& .userBlockDetails': {
                    position: 'absolute',
                    boxShadow: `-3px 3px 22px 2px #767676`,
                    marginTop: '-20px',
                    width: '50%',
                    backgroundColor: white,
                    zIndex: '100',
                    '& td': {
                        padding: '5px 0 0!important',
                    },
                    '& tr': {
                        padding: '0!important',
                        '& td': {
                            borderBottom: '1px solid rgba(224, 224, 224, 1)!important',
                        }
                    }
                },
                '& .detailButton':{
                    backgroundColor:'transparent',
                    border:'0!important',
                    cursor:'pointer',
                    '&:focus': {
                        border:'0',
                        outline:'0',
                    }
                }
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
                    borderColor: grey.tooLight,
                    color: primary,
                    padding: '13px'
                }
            }
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: primary,
            color: 'white',
            border: '0'
        }
    },
    mypaper: {
        backgroundColor: 'transparent',
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        '& .head': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: "center",
            '& button': {
                backgroundColor: primary,
                border: 0,
                cursor: 'pointer',
                padding: '10px 15px',
                lineHeight: '14px',
                color: white,
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
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': {
                    width: '100%',
                },
                '& .inputBlock': {
                    marginBottom: '1rem',
                },
                '& .buttonBlock': {
                    margin: '2px 10px',
                    '& button':{
                        '&:hover':{
                            backgroundColor:primary
                        }
                    }
                }
            }
        },
        '& .filter': {
            '& #details': {
                display: 'flex',
                flexDirection: 'column',
                '& .inputBlock': {
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    '& input': {
                        margin: '5px 5px',
                        padding: '7.5px 14px'
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
                            height: '40px',
                            marginTop: '8px'
                        }
                    }
                },
                '& .buttonBlock': {
                    margin: '2px 10px',
                    '& button':{
                        '&:hover':{
                            backgroundColor:primary
                        }
                    }
                }
            }

        },
        '& .box': {
            borderRadius: '4px',
            backgroundColor: white,
            margin: '1rem 0',
            boxShadow: '0px 2px 4px 0px #999f9d',
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& #modal': {
            height: 'calc(100vh - 100px)',
            overflow: 'scroll',
            border: '0!important',
            maxWidth: '500px!important',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none',  /* Firefox */
            '&:focus': {
                outline: '0!important',
            },
            position: 'relative',
            '& .header': {
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                top: '0',
                left: 0,
                right: 0,
                height: '40px',
                backgroundColor: primary,
                '& button': {
                    background: 'transparent',
                    cursor: 'pointer',
                    border: 0,
                    '&:focus': {
                        outline: '0!important',
                    },
                    '& svg': {
                        color: white,
                        margin: '9px 9px',
                    }
                },
                '& .title': {
                    margin: '9px 13px',
                    color: white
                }
            },
            '& .flexDirL': {
                flexDirection: 'row-reverse'
            },
            '& .flexDirR': {
                flexDirection: 'row'
            },
            '& .body': {
                marginTop: '16px',
            }
        }
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

export default {useStyles};