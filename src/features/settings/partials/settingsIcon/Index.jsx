import React, {useContext} from 'react';
import {withNamespaces} from 'react-i18next';

import {Grid} from '@material-ui/core';

import AppContext from 'contexts/AppContext';
import {StyledPadding, StyledButtonBlock, StyledSettingsButton} from 'assets/js/library/pages/settings';
import UploadImgComponent from './partials/SettingsUploadIcon.jsx';
import {uploadIcon, addSettingsMethod} from "./Index.js"
import {get} from "libraries/local-storage";

function Index({t, settingsIcons, setSettingsIcons}) {
    const {setLoading} = useContext(AppContext);
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER))

    return (<Grid container>
        <Grid item md={6} xl={6} xs={12}>
            <StyledPadding>
                <UploadImgComponent getFileInParent={(e) => uploadIcon(e, setSettingsIcons, setLoading, 'logo')}
                                    imgSrc={settingsIcons.logo}/>
            </StyledPadding>
        </Grid>
        <Grid item md={6} xl={6} xs={12}>
            <StyledPadding>
                <UploadImgComponent getFileInParent={(e) => uploadIcon(e, setSettingsIcons, setLoading, 'favicon')}
                                    imgSrc={settingsIcons.favicon}/>
            </StyledPadding>
        </Grid>
        <Grid item xs={12} md={12} xl={12}>
            <StyledButtonBlock>
                <StyledSettingsButton
                    permission={`${permissions['restful post base_icon_site_rest_resource'].access}`}
                    onClick={() => addSettingsMethod(setLoading, settingsIcons)}>
                    {t('translation:saveChanges')}
                </StyledSettingsButton>
            </StyledButtonBlock>
        </Grid>
    </Grid>);
}

export default withNamespaces('settings, translation')(Index);
