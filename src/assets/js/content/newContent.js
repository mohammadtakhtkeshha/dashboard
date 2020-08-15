import {makeStyles} from "@material-ui/core/styles";
import * as colors from "../../../components/partials/Colors";

export const useStyles = makeStyles((theme) => ({
    paper: {
        '& .tabs': {
            minWidth: 'calc(100vh - 5rem)',
            '& .tabButtons': {
                '& .MuiTabs-flexContainer': {
                    justifyContent: 'center',
                }
            },
            '& .tabContent': {
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
                                        left:0,
                                        right:'unset',
                                    },
                                },
                            }
                        },
                        '& .faTag': {
                            '& .MuiFormControl-fullWidth': {
                                '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                                    padding: '3px 50px 3px 0 !important',
                                    '& .MuiAutocomplete-endAdornment': {
                                        right:'0',
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

}));