import React, {useState} from "react"
import i18next from "i18next"

import {Typography} from "@material-ui/core"

import {
    StyledPaper,
    StyledTitle,
    StyledDescription,
    StyledFile
} from "assets/js/dashboard/partials/welcomeDashboard"
import {ReactComponent as Exit} from "assets/svg/exit.svg"
import {StyledIcon} from "assets/js/dashboard/partials/messageDashboardSetting"
import {StyledDashboardBlock} from "assets/js/dashboard/dashboard"
import Modal from "./modal/Index.jsx"
import playerIcon from "assets/svg/all/play.svg"
import imgBackground from "assets/media/image/khom.jpg"

export default function WelcomeDashboardComponent() {
    const lang = i18next.language
    const [show, setShow] = useState(true)
    const [openModal, setOpenModal] = useState(false)

    const removeWelcome = () => {
        setShow(false)
    }

    const clickPlayerIcon = () => {
        setOpenModal(true)
    }

    return (<StyledDashboardBlock show={show}>
            <StyledPaper lang={lang}>
                <StyledFile>
                    <img src={imgBackground} alt=""/>
                    <img src={playerIcon} alt="" onClick={clickPlayerIcon}/>
                    <Modal openModal={openModal} setOpenModal={setOpenModal}/>
                </StyledFile>
                <StyledDescription>
                    <StyledTitle>به خانواده بزرگ بهمن پرداز خوش آمدید!</StyledTitle>
                    <Typography>برای آشنایی بیشتر با خدمات بهمن پرداز این ویدیو را مشاهده فرمایید</Typography>
                </StyledDescription>
                <StyledIcon lang={lang} onClick={removeWelcome}>
                    <Exit/>
                </StyledIcon>
            </StyledPaper>
        </StyledDashboardBlock>)
}
