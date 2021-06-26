import React, {useState, useContext} from 'react';
import {withNamespaces} from 'react-i18next';

import {Grid} from '@material-ui/core';

import AppContext from 'contexts/AppContext';
import {StyledSettingsButton, StyledButtonBlock} from 'assets/js/library/pages/settings/index';
import {StyledInput} from 'assets/js/library/components/input';
import {StyledPadding} from 'assets/js/library/pages/settings/index';
import {StyledLabel, StyledTypographyError} from 'assets/js/library/base/typography';

import {addSettingsMethod, handleChangeMethod} from './SettingsName.js';
import {isObjectEmpty} from "methods/commons";

function SettingsName({t, settingsName, setSettingsName}) {
    const {setLoading} = useContext(AppContext);

    const [errors, setErrors] = useState({});

    const handleChange = (e, field) => {
        handleChangeMethod( e, field, setSettingsName, setErrors);
    };

    return (<Grid container>
        <Grid item xs={12} md={4} xl={4}>
            <StyledPadding>
                <StyledLabel>{t('settings:siteName')}</StyledLabel>
                <StyledInput
                    value={settingsName.site_name}
                    type="text"
                    placeholder={t('translation:name')}
                    onChange={e => handleChange(e, 'site_name')}
                />
            </StyledPadding>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
            <StyledPadding>
                <StyledLabel>{t('settings:siteSlogan')}</StyledLabel>
                <StyledInput
                    value={settingsName.site_slogan}
                    type="text"
                    placeholder={t('settings:siteSlogan')}
                    onChange={e => handleChange(e, 'site_slogan')}
                />
            </StyledPadding>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
            <StyledPadding>
                <StyledLabel>{t('users:email')}</StyledLabel>
                <StyledInput
                    value={settingsName.site_mail}
                    type="text"
                    border={!isObjectEmpty(errors) ? 'red' : ''}
                    placeholder={t('translation:email')}
                    onChange={e => handleChange(e, 'site_mail')}
                />
                {errors.site_mail ? (
                    <div>{errors.site_mail.valid ?
                        <StyledTypographyError>{errors.site_mail.valid}</StyledTypographyError> : ''}</div>
                ) : (
                    ''
                )}
            </StyledPadding>
        </Grid>
        <Grid item xs={12} md={12} xl={12}>
            <StyledButtonBlock>
                <StyledSettingsButton error={`${!isObjectEmpty(errors)}`}
                                      onClick={() => addSettingsMethod(!isObjectEmpty(errors),setLoading, settingsName)}>{t('translation:saveChanges')}</StyledSettingsButton>
            </StyledButtonBlock>
        </Grid>
    </Grid>);
}

export default withNamespaces('settings, translation')(SettingsName);