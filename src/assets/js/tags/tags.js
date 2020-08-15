import {grey,primary,white} from "../../../components/partials/Colors";

export const tags=(theme)=>({
    mainpaper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        '& .head': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: "center",
            marginBottom: theme.spacing(2),
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
        '& table': {
            '& .buttonBlock': {
                direction: 'rtl',
                '& button': {
                    margin: '0',
                    padding: '0',
                    boxShadow: '0 0 0 0 !important',
                    '& span': {
                        padding: '2px 0'
                    },
                    '&:first-child': {
                        borderRadius: '0 4px 4px 0',
                    },
                    '&:nth-child(2)': {
                        borderRadius: '4px 0 0 4px',
                    },
                }
            },
        }
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& #modal': {
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
                }
            },
            '& .body': {
                marginTop: '16px',
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
});
export default tags;