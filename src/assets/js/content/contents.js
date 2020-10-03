import * as colors from "components/partials/Colors";
import styled from "styled-components";

export const useStyles = (theme) => ({
    contentBlock: {
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .buttonBlock': {
            direction:'rtl',
            '& button': {
                '& span':{
                    padding:'2px 0',
                },
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
        '& .imgBlock': {
            width: '50px!important',
            height: '50px',
            borderRadius: '100%',
            overflow: 'hidden',
            '& img': {
                width: '100%'
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
                    borderColor: colors.grey[3],
                    color: colors.green[0],
                    padding: '13px'
                }
            }
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: colors.green[0],
            color: 'white',
            border: '0'
        }
    },
    mypaper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: 'transparent',
        '& .head': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: "center",
            '& button': {
                backgroundColor: colors.green[0],
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
        '& .box': {
            borderRadius: '4px',
            backgroundColor: colors.white,
            margin: '1rem 0',
            boxShadow: '0px 2px 4px 0px #999f9d',
        }
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});


export const StyledRowBox = styled.div`
            display:flex;
            flex-direction:column;
            margin-bottom: 14px;
`

export const StyledRow = styled.div`
            display:flex;
            justify-content:space-between;
            width : 100%;
`

export const StyledCol = styled.div`
            width: 49%;
`
export default {useStyles};
