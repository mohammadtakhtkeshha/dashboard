import {makeStyles} from "@material-ui/styles";
import loginImg from "../media/image/login.png";
import * as colors from "../../components/partials/Colors";

export const styles = makeStyles({
    login: {
        width: '100%',
        height: '100vh',
        background: `url(${loginImg})`,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        '& .grid': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '50px auto',
            width: '90%',
            '& .paper': {
                position: 'relative',
                justifyContent: 'center',
                width: '430px',
                boxSizing: 'border-box',
                '@media (max-width: 414px)': {
                    paddingRight: '1.5rem',
                    paddingLeft: '1.5rem',
                },
                '@media (max-width: 767px)': {
                    width: '90%',
                    margin: '30px auto',
                },
                padding: '3rem',
                '& .loginBlock': {
                    '& .loginError':{
                        backgroundColor:colors.danger.light,
                        padding:'.25rem 1.25rem',
                        borderRadius: '0.25rem',
                        color: colors.danger.dark,
                        fontSize: '14px',
                        lineHeight:'2',
                        marginBottom:'10px',
                    },
                    '& .inputBlock': {
                        position: 'relative',
                        // '& input':{border: '1px solid red'},
                        '& .error': {
                            position: 'relative',
                            top: '-25px',
                            textAlign: 'right',
                            color: 'red'
                        }
                    },
                    textAlign: 'center',

                    '& .title': {
                        fontSize: '17px',
                        fontWeight: 'bold',
                        marginBottom: '2rem',
                        marginTop: '2rem',
                    },
                },
                '& .head-img': {
                    position: 'absolute',
                    top: '0',
                    backgroundColor: 'white',
                    borderRadius: '100%',
                    width: '100px',
                    height: '100px',
                    left: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'translate(-50%, -50%)',
                },
                '& .remember': {
                    '& .right': {
                        display: 'flex',
                        '& .MuiButtonBase-root': {
                            paddingRight: '0!important',
                            '& .MuiIconButton-label': {
                                '& svg': {
                                    width: '21px',
                                    height: '21px',
                                }
                            },

                        },
                        '& p': {
                            paddingTop: '9px',
                        },
                        '& .MuiCheckbox-root': {
                            color: '#adb5bd'
                        },
                        '& .MuiCheckbox-colorSecondary.Mui-checked': {
                            color: colors.primary,
                        }
                    },
                    '& .left': {
                        padding: '6px',
                        '& a': {
                            textDecoration: 'none',
                            display: 'inline-block',
                            color: colors.primary,
                            fontSize: '14px',
                            fontWeight: '400',
                            '&:hover': {
                                color: colors.darkBlue
                            }
                        }
                    },
                },
                '& .loginButton': {
                    paddingTop: '1rem',
                    '& button': {
                        width: '100%',
                        color: 'white',
                        background: colors.primary
                    }
                },
                '& .hr': {
                    '& hr': {
                        margin: '2rem 0',
                        border: 0,
                        borderTop: '1px solid rgba(0,0,0,.1)',
                    }
                },
                '& .register': {
                    textAlign: 'center',
                    '& p': {
                        color: colors.grey.light,
                        marginBottom: '1rem',
                    },
                    '& a': {
                        boxShadow: '0 0 0 0',
                        fontSize: '13px',
                        border: `1px solid ${colors.light}`,
                        textDecoration: 'none',
                        color: colors.black,
                        padding: '5px 10px',
                        '&:hover': {
                            backgroundColor: colors.light
                        }
                    },

                },

            }
        },
    },

});