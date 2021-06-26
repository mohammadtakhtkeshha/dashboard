import React, {useState} from 'react';
import {withNamespaces} from 'react-i18next';

import {Grid} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

import SettingsStatusButton from "./partials/SettingsStatusButton";
import {green, blue, orange} from "assets/js/library/abstracts/colors"
import {StyledServiceBox, StyledImgBox, StyledSoon,styledGrid} from 'assets/js/library/pages/settings/settingsServices';

const StyledGrid = withStyles(styledGrid)(Grid)

function SettingsServices({t}) {
    const [chatStatus, setChatStatus] = useState(true)
    const [messageStatus, setMessageStatus] = useState(true)

    return (<StyledGrid container>
        <Grid item xs={6} md={3} xl={3}>
            <StyledServiceBox>
                <SettingsStatusButton setValue={setMessageStatus} value={messageStatus}/>
                <StyledImgBox backgroundColor={green[12]} soon={false} status={messageStatus}>
                    <span className="icon-message1"></span>
                    <span>سرویس پیامک</span>
                </StyledImgBox>
            </StyledServiceBox>
        </Grid>
        <Grid item xs={6} md={3} xl={3}>
            <StyledServiceBox>
                <SettingsStatusButton setValue={setChatStatus} value={chatStatus}/>
                <StyledImgBox backgroundColor="rgba(75, 225, 209, 0.4)" soon={false}  status={chatStatus}>
                       <span className="icon-chat"><span className="path1"></span><span
                           className="path2"></span><span
                           className="path3"></span><span className="path4"></span><span className="path5"></span><span
                           className="path6"></span><span className="path7"></span></span>
                    <span>سرویس چت آنلاین</span>
                    <StyledSoon className="icon-soon"></StyledSoon>
                </StyledImgBox>
            </StyledServiceBox>
        </Grid>
        <Grid item xs={6} md={3} xl={3}>
            <StyledServiceBox>
                <SettingsStatusButton setValue={setChatStatus} value={chatStatus}/>
                <StyledImgBox backgroundColor={orange[5]} soon={false} status={chatStatus}>
                       <span className="icon-chat1"><span className="path1"></span><span
                           className="path2"></span><span
                           className="path3"></span><span className="path4"></span><span className="path5"></span><span
                           className="path6"></span><span className="path7"></span></span>
                    <span>سرویس چت آنلاین</span>
                </StyledImgBox>
            </StyledServiceBox>
        </Grid>
        <Grid item xs={6} md={3} xl={3}>
            <StyledServiceBox>
                <SettingsStatusButton setValue={setChatStatus} value={chatStatus}/>
                <StyledImgBox backgroundColor={blue[22]} soon={false} status={chatStatus}>
                       <span className="icon-chat1"><span className="path1"></span><span
                           className="path2"></span><span
                           className="path3"></span><span className="path4"></span><span className="path5"></span><span
                           className="path6"></span><span className="path7"></span></span>
                    <span>سرویس چت آنلاین</span>
                </StyledImgBox>
            </StyledServiceBox>
        </Grid>
    </StyledGrid>);
}

export default withNamespaces('settings, translation')(SettingsServices);
