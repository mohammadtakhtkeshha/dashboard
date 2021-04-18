import React, {useState} from "react";

import { StyledDashboardBlock} from "assets/js/dashboard/dashboard";
import {
    StyledPaper,
    StyledTitle,
    StyledIcon,
    StyledTitleDescription,
    StyledDescriptionIcon
} from "assets/js/dashboard/partials/messageDashboardSetting";

import {ReactComponent as Exit} from "assets/svg/exit.svg";
import i18next from "i18next";

export default function WelcomeDashboardComponent() {
    const lang = i18next.language;
    const [show, setShow] = useState(true);

    const removeWelcome = () => {
        setShow(false);
    }

    return (
        <StyledDashboardBlock show={show}>
            <StyledPaper>
                <StyledTitle>
                    <StyledIcon lang={lang} onClick={removeWelcome}>
                        <Exit/>
                    </StyledIcon>
                    <StyledTitleDescription>
                        <StyledDescriptionIcon lang={lang}/>
                        لطفا هر چه سریعتر جهت تکمیل اطلاعات اهراز هویت خود از صفحه تنظیمات اقدام کنید!
                    </StyledTitleDescription>
                </StyledTitle>
            </StyledPaper>
        </StyledDashboardBlock>);
}
