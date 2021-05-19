import React from "react"
import {withNamespaces} from "react-i18next";

import {StyledStatusSettingBlock,StyledStatusButton} from "assets/js/library/pages/settings/index"

function SettingsStatusButton({t,value,setValue}) {

    const changeCheckbox = () => {
        setValue(!value)
    }

    return (<StyledStatusSettingBlock >
        <StyledStatusButton status={value} onClick={changeCheckbox}></StyledStatusButton>
        <span>{value === true ? t('translation:active') : t('translation:notActive')}</span>
    </StyledStatusSettingBlock>)
}

export default withNamespaces('settings, translation')(SettingsStatusButton);
