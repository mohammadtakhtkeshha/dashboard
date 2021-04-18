import React, {useState, useEffect, useContext} from "react"
import {withNamespaces} from 'react-i18next'
import i18next from "i18next"

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import {Box,Typography} from '@material-ui/core/index'

import AppContext from 'contexts/AppContext'
import {StyledInput, StyledRadioButton} from "assets/js/App"
import { StyledModalFooter, StyledModalHeader, StyledModalBody} from "assets/js/library/components/modal"
import {StyledLabel,StyledTypographyError} from "assets/js/library/base/typography"
import UploadImgComponent from "infrastructure/authorized/partials/UploadImgComponent"
import {
    StyledFlexColumn,
    StyledFlexItemInside,
    StyledRolesBlock,
    StyledInsideModalBody,
    StyledRoleMargin,
    StyledHeightInput,
    StyledFormControl,
} from "assets/js/user/newUser"

import {StyledRegisterButton} from "assets/js/library/components/buttons";

import {
    uploadImgMethod,
    saveUserMethod,
    editUserMethod,
    removedFileIdMethod,
    handleChangeMethod,
    handleStatusChangeMethod,
    handleConfirmPassMethod,
    getUserMethod,
    getRolesMethod,
    handleCheckRolesMethod
} from "./NewUserComponent.js"
import {isObjectEmpty} from "methods/commons";
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent";

function NewUserComponent({t, id, userNameList, userMailList, errors, setErrors, user, setUser, getEditedUser, getRegisteredUser, closeForm}) {
    const lang = i18next.language
    const [enRoles, setEnRoles] = useState([])
    const [faRoles, setFaRoles] = useState()
    const [confirmPass, setConfirmPass] = useState('')
    const [defaultRoles, setDefaultRoles] = useState([])
    const [gottenName, setGottenName] = useState('')
    const [gottenMail, setGottenMail] = useState('')
    const [imgAndUrl, setImgAndUrl] = useState([])
    const appContext = useContext(AppContext)
    console.log(enRoles)

    const getRoles = () => {
        getRolesMethod(setEnRoles, setFaRoles, appContext)
    }

    const saveUser = () => {
        saveUserMethod(t, user, confirmPass, appContext, getRegisteredUser, errors, closeForm)
    }

    const editUser = () => {
        editUserMethod(id, user, appContext, t, getEditedUser, errors)
    }

    const register = () => {
        if (id) {
            editUser()
        } else {
            saveUser()
        }
    }

    const removedFileId = (id) => {
        removedFileIdMethod(setUser, setImgAndUrl)
    }

    const saveFile = (e) => {
        uploadImgMethod(e, setUser, setImgAndUrl, appContext)
    }

    const handleChange = (e, field) => {
        handleChangeMethod(e, user, id, field, setUser, gottenMail, gottenName, userNameList, setErrors, userMailList, t, confirmPass)
    }

    const handleConfirmPass = (e) => {
        handleConfirmPassMethod(e, setConfirmPass, user, setErrors)
    }

    const handleCheckRoles = (e) => {
        handleCheckRolesMethod(e, user, defaultRoles, enRoles, faRoles, setDefaultRoles, setUser)
    }

    const handleStatusChange = (e) => {
        handleStatusChangeMethod(e, setUser)
    }

    const getUser = () => {
        getUserMethod(appContext, id, setDefaultRoles, setUser, setGottenMail, setImgAndUrl, setGottenName)
    }

    const handleErrors = () => {
        if (id === "") {
            setErrors({
                pass: {required: "حداقل تعداد کاراکتر 8 میباشد!"},
                name: {required: "حداقل تعداد کاراکتر 3 میباشد!"},
                mail: {required: "وارد کردن فیلد مورد نظر الزامیست!"}
            })
        }
    }

    useEffect(() => {
        getUser()
        getRoles()
    }, [])

    useEffect(() => {
        handleErrors()
    }, [])

    return (<>
            <StyledModalHeader>{t('users:newUser')}</StyledModalHeader>
            <StyledModalBody>
                <StyledInsideModalBody>
                    <StyledFlexColumn>
                        <StyledFlexItemInside>
                            <StyledHeightInput>
                                <StyledLabel>{t('users:enter your name')}</StyledLabel>
                                <StyledInput className="first-name"
                                             value={user.field_name.length > 0 ? user.field_name[0].value : ""}
                                             type="text"
                                             placeholder={t('translation:name')}
                                             onChange={e => handleChange(e, "field_name")}/>
                            </StyledHeightInput>
                            <StyledHeightInput>
                                <StyledLabel>{t('users:enter your family')}</StyledLabel>
                                <StyledInput className="last-name"
                                             value={user.field_last_name.length > 0 ? user.field_last_name[0].value : ''}
                                             type="text"
                                             placeholder={t('users:family')}
                                             onChange={e => handleChange(e, "field_last_name")}/>
                            </StyledHeightInput>
                            <StyledHeightInput>
                                <StyledLabel>{t('users:enter your username')}</StyledLabel>
                                <StyledInput className="username" value={user.name[0].value} type="text"
                                             placeholder={t('users:username')}
                                             onChange={e => handleChange(e, "name")}/>
                                {errors.name ? <div>
                                    {errors.name.required ?
                                        <StyledTypographyError>{errors.name.required}</StyledTypographyError> : ''}
                                    {errors.name.unique ?
                                        <StyledTypographyError>{errors.name.unique}</StyledTypographyError> : ''}
                                </div> : ""}

                            </StyledHeightInput>
                            {/*-------------------------------------------------- role -----------------------------------------------------*/}
                            <StyledRolesBlock className="my-role">
                                <label><Typography>{t('users:choose role')}</Typography></label>
                                {faRoles ? Object.keys(faRoles).map((keyName, index) => (
                                    // <FormControlLabel key={index}
                                    //                   value={keyName}
                                    //                   control={<Checkbox onChange={(e) => handleCheckRoles(e)} name="roles"/>}
                                    //                   label={lang === 'en' ? enRoles [keyName] : faRoles[keyName]}
                                    //                   checked={defaultRoles.includes(enRoles[index])}/>
                                    <StyledRoleMargin key={index}>
                                        <StyledCheckboxComponent key={index}
                                                                 value={keyName}
                                                                 change={(e) => handleCheckRoles(e)}
                                                                 label={lang === 'en' ? enRoles [keyName] : faRoles[keyName]}
                                                                 checked={defaultRoles.includes(enRoles[index])}/>
                                    </StyledRoleMargin>
                                )) : ''}
                            </StyledRolesBlock>
                        </StyledFlexItemInside>
                        <StyledFlexItemInside>
                            <StyledHeightInput>
                                <StyledLabel>{t('users:enter your email')}</StyledLabel>
                                <StyledInput className="email"
                                             value={user.mail.length > 0 ? user.mail[0].value : ""} type="email"
                                             placeholder={t('users:email')}
                                             onChange={e => handleChange(e, "mail")}/>
                                {errors.mail ? <>
                                    {errors.mail.valid ?
                                        <StyledTypographyError>{errors.mail.valid}</StyledTypographyError> : ''}
                                    {errors.mail.unique ?
                                        <StyledTypographyError>{errors.mail.unique}</StyledTypographyError> : ''}
                                    {errors.mail.required ?
                                        <StyledTypographyError>{errors.mail.required}</StyledTypographyError> : ''}
                                </> : ""}

                            </StyledHeightInput>
                            <StyledHeightInput>
                                <StyledLabel>{t('users:password')}</StyledLabel>
                                <StyledInput type="password"
                                             className="password"
                                             placeholder={t('users:password')}
                                             onChange={e => handleChange(e, "pass")}
                                             error={errors.pass}/>
                                {errors.pass ? <>
                                    {errors.pass.required ?
                                        <StyledTypographyError>{errors.pass.required}</StyledTypographyError> : ''}
                                    {errors.pass.valid ?
                                        <StyledTypographyError>{errors.pass.valid}</StyledTypographyError> : ''}</> : ""}
                            </StyledHeightInput>
                            <StyledHeightInput>
                                <StyledLabel>{t('users:confirm password')}</StyledLabel>
                                <StyledInput type="password"
                                             className="confirm-pass"
                                             placeholder={t('users:confirm password')}
                                             value={confirmPass}
                                             onChange={e => handleConfirmPass(e)}
                                             error={errors.confirm_pass}/>
                                {errors.confirmPass ? <> {errors.confirmPass.harmony ?
                                    <StyledTypographyError>{errors.confirmPass.harmony}</StyledTypographyError> : ''}</> : ""}
                            </StyledHeightInput>
                            <StyledFormControl component="fieldset">
                                <label><Typography>{t('translation:status')}</Typography></label>
                                <StyledRadioButton>
                                    <RadioGroup className="status"
                                                aria-label="status" name="status" value={user.status[0].value}
                                                onChange={handleStatusChange}>
                                        <FormControlLabel value={false} control={<Radio/>}
                                                          label={t('translation:block')}/>
                                        <FormControlLabel value={true} control={<Radio/>}
                                                          label={t('translation:confirm')}/>
                                    </RadioGroup>
                                </StyledRadioButton>
                            </StyledFormControl>
                        </StyledFlexItemInside>
                    </StyledFlexColumn>
                    <Box mt={4} className="image-upload-block">
                        <UploadImgComponent type="image"
                                            multiple={false}
                                            title={t('translation:choosePic')}
                                            getFileInParent={(e) => saveFile(e, 'single')}
                                            imgsAndUrls={imgAndUrl}
                                            removeImgInParent={removedFileId}/>

                    </Box>
                </StyledInsideModalBody>
            </StyledModalBody>
            <StyledModalFooter>
                <StyledRegisterButton status={isObjectEmpty(errors)} onClick={register}>
                    {t('translation:register')}
                </StyledRegisterButton>
            </StyledModalFooter>
        </>
    )
}

export default withNamespaces('users, translation')(NewUserComponent)
