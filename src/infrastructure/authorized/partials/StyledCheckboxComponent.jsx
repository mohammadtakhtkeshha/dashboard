import React from 'react';
import {StyledCheckBox} from "assets/js/partials/styledCheckbox";
import i18next from "i18next";

function StyledCheckboxComponent(props) {
    const lang = i18next.language
    return (<StyledCheckBox lang={lang}>{props.label}
            <input type="checkbox" value={props.value} checked={props.checked} onChange={props.change}/>
            <span></span>
        </StyledCheckBox>);
}

export default StyledCheckboxComponent;

