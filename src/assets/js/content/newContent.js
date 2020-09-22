export const useStyles = (theme) => ({
    paper: {
        '& .tabs': {
            '& .tabButtons': {
                '& .MuiTabs-flexContainer': {
                    justifyContent: 'center',
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
                                zIndex: "100"
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

    },

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

export default {useStyles, bootstrapInput, useTabStyless};
