import React, {useState} from "react";
import i18next from "i18next";
import ReactPlayer from 'react-player';

import {Typography} from "@material-ui/core";

import {StyledPaper, StyledTitle, StyledDescription, StyledFile} from "assets/js/dashboard/partials/welcomeDashboard"
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import {StyledIcon} from "assets/js/dashboard/partials/messageDashboardSetting";
import video from "assets/media/video/nature.mp4";
import {StyledDashboardBlock} from "assets/js/dashboard/dashboard";

export default function WelcomeDashboardComponent() {
    const lang = i18next.language
    const [show, setShow] = useState(true)

    const removeWelcome = () => {
        setShow(false)
    }

    return (
        <StyledDashboardBlock show={show}>
            <StyledPaper>
                <StyledFile>
                    <ReactPlayer
                        controls={true}
                        url={video}/>
                </StyledFile>
                <StyledDescription>
                    <StyledTitle>به خانواده بزرگ بهمن پرداز خوش آمدید!</StyledTitle>
                    <Typography>برای آشنایی بیشتر با خدمات بهمن پرداز این ویدیو را مشاهده فرمایید</Typography>
                </StyledDescription>
                <StyledIcon lang={lang} onClick={removeWelcome}>
                    <Exit/>
                </StyledIcon>
            </StyledPaper>
        </StyledDashboardBlock>);
}
