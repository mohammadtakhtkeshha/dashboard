import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Box, Typography} from "@material-ui/core";
import {white,grey,green,blue,black} from "components/partials/Colors";

export const useStyles = (theme) => ({
    paper: {
        '& .tabs': {
            height:'50vh',
            '& .tabButtons': {
                borderBottom:`1px solid ${grey[1]}`,
                '& .MuiTabs-flexContainer': {
                    justifyContent: 'center',
                },
                '&>div>span':{
                    backgroundColor:`${green[0]}`,
                    color:`${green[0]}`,
                }
            },
            '& .tabContent': {
                width: '100%',
                textAlign: 'center',
                '& .block': {
                    display: 'flex',
                    flexDirection: 'column',
                    '& .items': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        '&>div': {
                            width: '48%',
                        },
                        '& .enTag': {
                            '& .MuiFormControl-fullWidth': {
                                '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                                    padding: '3px 0 3px 50px !important',
                                    '& .MuiAutocomplete-endAdornment': {
                                        left: 0,
                                        right: 'unset',
                                    },
                                },
                            }
                        },
                        '& .faTag': {
                            '& .MuiFormControl-fullWidth': {
                                '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                                    padding: '3px 50px 3px 0 !important',
                                    '& .MuiAutocomplete-endAdornment': {
                                        right: '0',
                                    },
                                },
                            }
                        },
                        '& .publishDate': {
                            '& div': {
                                width: '100%',
                            }
                        }
                    },
                    '& .date': {
                        marginBottom: '1rem',
                        marginTop: '1rem',
                        '&>div': {
                            width: '100%'
                        }
                    }
                },
                '& .card': {
                    marginBottom: '1rem',
                    '& p': {
                        marginBottom: '.8rem',
                    },
                    '& .metaTag': {
                        display: 'flex',
                        margin: '.8rem',
                        justifyContent: 'space-between',
                        '& .right,& .left': {
                            width: '48%',
                        },
                        '& fieldset': {
                            border: '1px solid rgba(0, 0, 0, 0.23)!important',
                        }
                    }

                },
                '& .select': {
                    '& .MuiFormControl-root': {
                        width: '100%!important',
                        '& .MuiInputBase-root': {
                            width: '100%!important',
                        }
                    },
                    '& .MuiAutocomplete-root': {
                        '& .MuiChip-root': {
                            width: 'fit-content',
                            '& svg': {
                                zIndex: "50"
                            },

                        },
                        '& .MuiAutocomplete-endAdornment': {
                            width: 'fit-content',
                        }
                    },
                    '& div': {
                        width: '100%',
                        '& select': {
                            height: '22px',
                            lineHeight: '21px',
                            padding: '7px 26px 10px 12px',
                        }
                    }

                }
            }
        }

    }
});

export const bootstrapInput = (theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
});

export const useTabStyless = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

// ---- tab panel ----
export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography variant="h4">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const styledTabs = ()=>({
    root:{
        height:'11vh',
        position:'absolute',
        top:0,
        marginBottom:'10px',
        left:'0',
        right:'0',
        backgroundColor:white,
        zIndex:'50',
        '& .MuiTabs-flexContainer':{
            height: '100%'
        },'& .Mui-selected':{
            color: `${green[1]}`
        },'& .MuiTabs-indicator':{
            backgroundColor: `${green[1]}`
        },'&>div>div':{
            justifyContent:'center',
        }
    }
})

export const StyledTabPanels = styled.div`
            height: calc(50vh - 6vh);
            overflow: scroll;
            margin-top: 11vh;
            margin-bottom : 11vh;
            scrollbar-width:none;
            -ms-overflow-style:none;
            &::-webkit-scrollbar{
                display : none;
            }
`

export const StyledFooterButton = styled.button`
                width: 33.33%;
                height: 100%;
                background-color: inherit;
                border: 0;
                cursor:pointer;
                font-size: 18px;
                z-index:300;
                color:${black[1]};
                &:not(:first-child){
                    border-color: ${grey[1]};
                    border-style: solid;
                    border-width:${props=>props.lang === 'fa' ? "0 1px 0 0" : "0 0 0 1px"};
                    
                }
                &:nth-child(2) {
                  color:${props=>props.state ? black[1] : grey[0]};
                  &:hover{
                     color:${props=>props.state ? green[0]: grey[0]} };
                  }
                }
                &:first-child,&:last-child{
                  &:hover{
                     color:${blue[0]};
                  }
                }
                &:focus{
                    outline:0!important;
                }
`

export default {useStyles, bootstrapInput, useTabStyless,TabPanel,a11yProps,styledTabs,StyledFooterButton};
