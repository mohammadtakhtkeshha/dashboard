import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import {useParams} from "react-router-dom";

import {Typography} from "@material-ui/core";

import {StyledHead} from "assets/js/library/base/all";
import {StyledHeadTypography} from "assets/js/library/base/typography";
import {StyledGreenButton} from "assets/js/library/components/buttons";
import {clickDownload} from './SubmissionHeaderComponent.js'
import AppContext from "contexts/AppContext";

function SubmissionHeaderComponent({t, setIsTourOpen}) {
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const {form_id} = useParams();

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="element-list">
            {t('webforms:elementsList')}
        </StyledHeadTypography>
        <StyledGreenButton onClick={() => {
            setIsTourOpen(true)
        }}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledGreenButton>
        <StyledGreenButton className='download' onClick={() => clickDownload(setLoading,form_id)}>
            <Typography>{t('webforms:downloadResult')}</Typography>
        </StyledGreenButton>
    </StyledHead>);
}

export default withNamespaces('users,translation')(SubmissionHeaderComponent);
