import React from 'react';
import {StyledCheckBox} from "assets/js/partials/styledCheckbox";
import i18next from "i18next";

function StyledCheckboxComponent(props) {
    const lang = i18next.language
    return (
        // <StyledFormControlLabel
        //     control={<Checkbox
        //         className={classes.root}
        //                        icon={<span className={classes.icon}/>}
        //                        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}/>}
        //                        name="checkedI"
        //                        color="white"
        //                        value={props.value}
        //                        checked={props.checked}
        //                        onChange={props.change}
        //                        />
        //     }
        //     label={props.label}
        // />
        <StyledCheckBox lang={lang}>{props.label}
            <input type="checkbox" value={props.value} checked={props.checked} onChange={props.change}/>
            <span></span>
        </StyledCheckBox>
    );
}

export default StyledCheckboxComponent;

