import React, {useContext} from 'react';
import {withNamespaces} from 'react-i18next';

import {Grid} from '@material-ui/core';

import AppContext from 'contexts/AppContext';
import {StyledInput} from 'assets/js/App';
import {
    StyledPadding,
    StyledButtonBlock,
    StyledSettingsButton
} from 'assets/js/library/pages/settings';
import {StyledLabel} from 'assets/js/library/base/typography';
import MultiSelectComponent from "infrastructure/authorized/partials/MultiSelectComponent.jsx"
import {StyledPaddingRelative} from "assets/js/library/pages/settings/settingsTags";

import {addSettingsMethod, handleChangeMethod} from './Index.js';

function Index({t, settingsTags, setSettingsTags}) {
    const {setLoading} = useContext(AppContext);

    const handleChange = (e, field) => {
        handleChangeMethod(e, field, setSettingsTags);
    };

    // site_front_desc , //description
    // site_front_abs , //summary
    // site_front_keys , //keywords

    return (<Grid container>
        <Grid item xs={12} md={4} xl={4}>
            <StyledPaddingRelative>
                <StyledLabel>{t('contents:keywords')}</StyledLabel>
                <MultiSelectComponent field="site_front_keys"
                                     stringField={settingsTags.site_front_keys}
                                      placeholder={t('contents:keywords')}
                                     setStringField={setSettingsTags}/>

            </StyledPaddingRelative>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
            <StyledPadding>
                <StyledLabel>{t('translation:description')}</StyledLabel>
                <StyledInput value={settingsTags.site_front_desc}
                             type="text"
                             placeholder={t('translation:description')}
                             onChange={e => handleChange(e, 'site_front_desc')}
                />
            </StyledPadding>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
            <StyledPadding>
                <StyledLabel>{t('translation:summary')}</StyledLabel>
                <StyledInput
                    value={settingsTags.site_front_abs}
                    type="text"
                    placeholder={t('translation:summary')}
                    onChange={e => handleChange(e, 'site_front_abs')}
                />
            </StyledPadding>
        </Grid>

        <Grid item xs={12} md={12} xl={12}>
            <StyledButtonBlock>
                <StyledSettingsButton error={false} onClick={() => addSettingsMethod(setLoading, settingsTags)}>
                    {t('translation:saveChanges')}
                </StyledSettingsButton>
            </StyledButtonBlock>
        </Grid>
    </Grid>);
}

export default withNamespaces('settings, translation')(Index);
