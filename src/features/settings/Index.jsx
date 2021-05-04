import React, {useState, useEffect, useContext} from "react"
import {withNamespaces} from 'react-i18next'

import {Grid} from "@material-ui/core"

import AppContext from 'contexts/AppContext'
import {StyledInput} from "assets/js/App"
import {StyledSettings, StyledPadding} from "assets/js/library/pages/settings/index"
import {StyledLabel, StyledTypographyError} from "assets/js/library/base/typography"
import {
    StyledFlexColumn,
    StyledFlexItemInside,
    StyledInsideModalBody,
    StyledHeightInput,
} from "assets/js/user/newUser"

import {StyledRegisterButton} from "assets/js/library/components/buttons";
import {isObjectEmpty} from "methods/commons";
import UploadImgComponent from "infrastructure/authorized/partials/UploadImgComponent";
import {removedFileIdMethod, uploadImgMethod} from "../user/partials/modal/partials/NewUserComponent.js";
import {getSettingsMethod, addSettingsMethod, uploadFavIconMethod, uploadLogoMethod,keyUpMethod} from "./Index.js"

function Index({t, errors}) {
    const appContext = useContext(AppContext)
    const [settings, setSettings] = useState({
        "site_name": "test1",
        "site_mail": "test2",
        "site_slogan": "test3",
        "site_front_desc": "test4",//description
        "site_front_abs": "tst5",//summary
        "site_front_keys": "test6",//keywords
        "logo": "public://index.png",
        "favicon": "/web/sites/default/files/Nederland_1_Logo_2000.png"
    })
    const [logo, setLogo] = useState([])
    const [favIcon, setFavIcon] = useState([])

    const handleChange = (e,field) => {
        const currentValue = e.currentTarget.value;
        setSettings(prevState => {
            return {...prevState,[field]:currentValue}
        })
    }

    useEffect(() => {
        getSettingsMethod(appContext, setSettings, setLogo, setFavIcon)

    }, [])

    const addSettings = () => {
            addSettingsMethod(t,appContext, settings)
    }

    const removedFileIdLogo = (id) => {
        removedFileIdMethod(setSettings, setLogo)
    }

    const removedFileIdFavIcon = (id) => {
        removedFileIdMethod(setSettings, setLogo)
    }

    const saveLogo = (e) => {
        uploadLogoMethod(e, setSettings, setLogo, appContext)
    }

    const saveFavIcon = (e) => {
        uploadFavIconMethod(e, setSettings, setFavIcon, appContext)
    }

    const keyUp = (e) => {
        keyUpMethod(e,appContext,addSettings)
    }
    console.log(settings)
    return (<StyledSettings>
        <Grid container>
            <Grid xs={12} xl={12} md={12} item>
                <Grid container>
                    <Grid item xs={12} md={6} xl={6}>
                        <StyledPadding>
                            <StyledLabel>{t('settings:siteName')}</StyledLabel>
                            <StyledInput value={settings.site_name}
                                         type="text"
                                         onKeyUp={keyUp}
                                         placeholder={t('translation:name')}
                                         onChange={e => handleChange(e, "site_name")}/>
                        </StyledPadding>
                    </Grid>
                    <Grid item xs={12} md={6} xl={6}>
                        <StyledPadding>
                            <StyledLabel>{t('settings:siteSlogan')}</StyledLabel>
                            <StyledInput value={settings.site_slogan}
                                         type="text"
                                         onKeyUp={keyUp}
                                         placeholder={t('translation:name')}
                                         onChange={e => handleChange(e, "site_slogan")}/>
                        </StyledPadding>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} xl={12} md={12} item>
                <Grid container>
                    <Grid item xs={12} md={6} xl={6}>
                        <StyledPadding>
                            <StyledLabel>{t('users:email')}</StyledLabel>
                            <StyledInput value={settings.site_mail}
                                         type="text"
                                         onKeyUp={keyUp}
                                         placeholder={t('translation:name')}
                                         onChange={e => handleChange(e, "site_mail")}/>
                        </StyledPadding>
                    </Grid>
                    <Grid item xs={12} md={6} xl={6}>
                        <StyledPadding>
                            <StyledLabel>{t('translation:description')}</StyledLabel>
                            <StyledInput value={settings.site_front_desc}
                                         type="text"
                                         onKeyUp={keyUp}
                                         placeholder={t('translation:name')}
                                         onChange={e => handleChange(e, "site_front_desc")}/>
                        </StyledPadding>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} xl={12} md={12}>
                <Grid container>
                    <Grid item xs={12} md={6} xl={6}>
                        <StyledPadding>
                            <StyledLabel>{t('translation:summary')}</StyledLabel>
                            <StyledInput value={settings.site_front_abs}
                                         type="text"
                                         onKeyUp={keyUp}
                                         placeholder={t('settings:family')}
                                         onChange={e => handleChange(e, "site_front_abs")}/>
                        </StyledPadding>
                    </Grid>
                    <Grid item xs={12} md={6} xl={6}>
                        <StyledPadding>
                            <StyledLabel>{t('contents:keywords')}</StyledLabel>
                            <StyledInput value={settings.site_front_keys}
                                         type="text"
                                         onKeyUp={keyUp}
                                         placeholder={t('settings:settingsname')}
                                         onChange={e => handleChange(e, "site_front_keys")}/>
                            {/*{errors.site_slogan ? <div>*/}
                            {/*    {errors.site_slogan.required ?*/}
                            {/*        <StyledTypographyError>{errors.site_slogan.required}</StyledTypographyError> : ''}*/}
                            {/*    {errors.site_slogan.unique ?*/}
                            {/*        <StyledTypographyError>{errors.site_slogan.unique}</StyledTypographyError> : ''}*/}
                            {/*</div> : ""}*/}
                        </StyledPadding>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid>
            <StyledPadding>
                <UploadImgComponent type="image"
                                    multiple={false}
                                    title={t('translation:choosePic')}
                                    getFileInParent={(e) => saveLogo(e, 'single')}
                                    imgsAndUrls={logo}
                                    removeImgInParent={removedFileIdLogo}/>
            </StyledPadding>
        </Grid>
        <Grid>
            <StyledPadding>
                <UploadImgComponent type="image"
                                    multiple={false}
                                    title={t('translation:choosePic')}
                                    getFileInParent={(e) => saveFavIcon(e, 'single')}
                                    imgsAndUrls={favIcon}
                                    removeImgInParent={removedFileIdFavIcon}/>
            </StyledPadding>
        </Grid>
        <StyledRegisterButton onClick={addSettings}>{t('translation:register')}</StyledRegisterButton>

    </StyledSettings>)
}

export default withNamespaces('settings, translation')(Index)

