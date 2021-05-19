import React from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {StyledFieldSet, StyledInput,StyledImgBlock} from "assets/js/library/pages/settings/settingsUploadIcon";

function SettingsUploadIcon({t, getFileInParent, imgSrc}) {
    const lang = i18next.language;

    const uploadImg = (e) => {
        let files = e.currentTarget.files;
        getFileInParent(files);
    }

    return (<StyledFieldSet lang={lang}>
            <legend>{t('settings:siteIcon')}</legend>
            <StyledInput>
                <span className="icon-upload"></span>
                <input type='file' onChange={uploadImg}/>
                <button>{t('translation:choosingFile')}</button>
            </StyledInput>
            <StyledImgBlock>
                <span>{imgSrc?.split('/').pop()}</span>
                <img src={process.env.REACT_APP_PICTURE_URL + imgSrc} alt=""/>
            </StyledImgBlock>
        </StyledFieldSet>);
}

export default withNamespaces('users,translation')(SettingsUploadIcon);

