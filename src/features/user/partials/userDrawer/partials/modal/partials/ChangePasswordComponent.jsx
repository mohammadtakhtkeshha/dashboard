import React, {useContext, useState, useEffect} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {Grid, withStyles} from "@material-ui/core"

import {StyledInput} from "assets/js/library/components/input"
import {StyledLabel, StyledTypographyError} from "assets/js/library/base/typography"
import {
    StyledModalBody,
    StyledModalFooter,
    StyledModalHeader
} from "assets/js/library/components/modal"
import {StyledRegisterButton} from "assets/js/library/components/buttons"
import {isObjectEmpty} from "methods/commons"
import {styledGridItem} from "assets/js/library/pages/user/profile"
import {registerChangePassMethod} from "../ChangePasswordModal.js"
import AppContext from "contexts/AppContext"
import {setUserName, changePassMethod, changeConfirmPassMethod} from "./ChangePasswordComponent.js";

const StyledGridItem = withStyles(styledGridItem)(Grid)

function ChangePasswordComponent({t, setOpenObserveProfile}) {
    const [errors, setErrors] = useState({})
    const [data, setData] = useState({username: "", oldPassword: "", newPassword: ""})
    const [confirmPass, setConfirmPass] = useState('')
    const lang = i18next.language
    const {setLoading} = useContext(AppContext)

    const changePass = (e, field) => {
        changePassMethod(e, t, field, confirmPass, setErrors, setData)
    }

    const changeConfirmPass = (e) => {
        changeConfirmPassMethod(e, t, data, setErrors, setConfirmPass)
    }

    useEffect(() => {
        setUserName(setData)
    }, [])

    return (<>
        <StyledModalHeader>{t('users:changePassword')}</StyledModalHeader>
        <StyledModalBody>
            <Grid container>
                <StyledGridItem item sm={12}>
                    <StyledLabel>{t('users:exPassword')}</StyledLabel>
                    <StyledInput type="password"
                                 placeholder={t('users:enterExPassword')}
                                 border={errors.expassword ? 'red' : false}
                                 onChange={e => changePass(e, "oldPassword")}/>
                    {errors.expassword &&
                    <StyledTypographyError lang={lang}>{errors.expassword}</StyledTypographyError>}
                </StyledGridItem>
                <StyledGridItem item sm={12}>
                    <StyledLabel>{t('users:newPassword')}</StyledLabel>
                    <StyledInput type="password"
                                 placeholder={t('users:enterNewPassword')}
                                 border={errors.harmony ? 'red' : false}
                                 onChange={e => changePass(e, "newPassword")}/>
                    {errors.harmony && <StyledTypographyError lang={lang}>{errors.harmony}</StyledTypographyError>}
                </StyledGridItem>
                <StyledGridItem item sm={12}>
                    <StyledLabel>{t('users:reNewPassword')}</StyledLabel>
                    <StyledInput type="password"
                                 border={errors.harmony ? 'red' : false}
                                 placeholder={t('users:enterReNewPassword')}
                                 onChange={changeConfirmPass}/>
                </StyledGridItem>
            </Grid>
        </StyledModalBody>
        <StyledModalFooter>
            <StyledRegisterButton status={isObjectEmpty(errors)}
                                  onClick={() => registerChangePassMethod(data, setLoading, setOpenObserveProfile, setErrors)}>
                {t('translation:register')}
            </StyledRegisterButton>
        </StyledModalFooter>
    </>)
}

export default withNamespaces('translation,users')(ChangePasswordComponent)
