import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import userImg from 'assets/media/image/user.jpg';
import dashboardService from "core/services/dashboard.service";
import {
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,

} from "assets/js/App";
import {
    StyledTableImg,
    StyledCheckboxImgInTable,
    StyledTableCell
} from "assets/js/library/components/table"
import {
    StyledPaper,
    StyledDashboardBlock,
    StyledDashboardTable
} from "assets/js/dashboard/dashboard"
import AppContext from "contexts/AppContext";

function UserDashboardComponent({t}) {
    const [users, setUsers] = useState([]);
    const lang = i18next.language
    let leftRightAlign = lang === "en" ? "left" : "right"
    const appContext=useContext(AppContext)

    let getTenNumberOfUsers = () => {
        dashboardService.getTenNumberOfUsers(appContext.handleError).then((response) => {
            let users = response.data;
            setUsers([...users]);
        }).catch((error) => {
        });
    };

    useEffect(() => {
        getTenNumberOfUsers();
    }, []);

    return (<>
            {users.length > 0 ?
                <StyledDashboardBlock>
                    <StyledPaper lang={lang}>
                        <Typography variant="h4"> ______ {t('users:users')} _______ </Typography>
                        <StyledDashboardTable>
                            <StyledTableHeadRow lang={lang}>
                                <StyledTableCell width="8" align={leftRightAlign}
                                                 minWidth={52}>{t('translation:image')}</StyledTableCell>
                                <StyledTableCell width="50" align={leftRightAlign}>{t('users:username')}</StyledTableCell>
                                <StyledTableCell width="45" align={leftRightAlign === 'left' ? "right":"left"}>{t('users:email')}</StyledTableCell>
                                <StyledTableCell width="5" align={leftRightAlign === 'left' ? "right":"left"} minWidth={68}>{t('translation:date')}</StyledTableCell>
                            </StyledTableHeadRow>
                            <StyledTableBody>
                                {users.map((user, index) =>
                                    <a key={index} href={user.view_user} target='_blank'>
                                        <StyledTableBodyRow key={index}>
                                            <StyledTableCell width="8" align={leftRightAlign} minWidth={52}>
                                                <StyledCheckboxImgInTable minWidth="90">
                                                    <StyledTableImg>
                                                        {user.picture ? <img src={user.picture} alt="user.name"/> :
                                                            <img src={userImg}/>}
                                                    </StyledTableImg>
                                                </StyledCheckboxImgInTable>
                                            </StyledTableCell>
                                            <StyledTableCell width="50" align={leftRightAlign}>{user.user_name}</StyledTableCell>
                                            <StyledTableCell width="45" align={leftRightAlign === 'left' ? "right":"left"}>{user.mail}</StyledTableCell>
                                            <StyledTableCell width="5" align={leftRightAlign === 'left' ? "right":"left"} minWidth={68}>
                                                {user.created}
                                            </StyledTableCell>
                                        </StyledTableBodyRow>
                                    </a>
                                )}
                            </StyledTableBody>
                        </StyledDashboardTable>
                    </StyledPaper>
                </StyledDashboardBlock> : <></>
            }</>
    );
}


export default withNamespaces('translation,users')(UserDashboardComponent);
