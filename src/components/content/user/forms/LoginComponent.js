import React from 'react';
import {Link,} from "react-router-dom";
import {makeStyles} from "@material-ui/styles/index";
import {Box, CardMedia, Checkbox, Grid, Paper, Typography} from "@material-ui/core/index";
import loginImg from '../../../../assets/media/image/login.png';
import iconImg from '../../../../assets/media/image/logo-sm.png';
import * as colors from '../../../partials/Colors';
import InputComponent from '../../../partials/inputComponent'
import ButtonComponent from "../../../partials/ButtonComponent";

const useStyles = makeStyles({
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
                        width: '100%'
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
                     '& p':{
                         color:colors.grey.light,
                         marginBottom: '1rem',
                    },
                     '& a':{
                         boxShadow : '0 0 0 0',
                         fontSize : '13px',
                         border:`1px solid ${colors.light}`,
                         textDecoration: 'none',
                         color : colors.black,
                         padding : '5px 10px',
                         '&:hover':{
                             backgroundColor: colors.light
                         }
                    },

                },

            }
        },
    },

});
export default function LoginComponent() {
    const classes = useStyles();
    return (<div className={classes.login}>
        <Grid container style={{justifyContent: 'center'}}>
            <Grid item sm className="grid">
                <Paper className="paper">
                    <Box className="head-img">
                        <CardMedia>
                            <img src={iconImg} alt="recipe thumbnail"/>
                        </CardMedia>
                    </Box>
                    <Box className="loginBlock">
                        <Typography variant="h5" className="title">
                            ورود
                        </Typography>
                        <InputComponent type="text" placeholder="نام کاربری"/>
                        <InputComponent type="password" placeholder="رمز عبور"/>
                    </Box>
                    <Box display="flex" justifyContent="space-between" className="remember">
                        <Box className="right">
                            <Checkbox inputProps={{'aria-label': 'primary checkbox'}}/>
                            <Typography>به خاطر سپاری</Typography>
                        </Box>
                        <Box className="left">
                            <Link to="/change">بازنشانی رمز عبور</Link>
                        </Box>
                    </Box>
                    <Box className="loginButton">
                        <ButtonComponent background={colors.primary} color="white" text="ورود"/>
                    </Box>
                    <Box className="hr">
                        <hr/>
                    </Box>
                    <Box className="register">
                        <Typography >حسابی ندارید ؟</Typography>
                        <Link>هم اکنون ثبت نام کنید!</Link>
                    </Box>
                </Paper>
            </Grid>
        </Grid>

    </div>);


}
