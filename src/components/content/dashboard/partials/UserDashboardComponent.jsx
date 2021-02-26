import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, Typography} from "@material-ui/core";
import {CardMedia} from '@material-ui/core/index';

import userImg from 'assets/media/image/user.jpg';
import dashboardService from "core/services/dashboard.service";
import {
    StyledPaper, StyledDashboardBlock, StyledDashboardTable
} from "assets/js/dashboard/dashboard";
import {
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,

} from "assets/js/App";
import {StyledTr, StyledTableHeadTr, StyledTable, StyledTableImg,StyledCheckboxImgInTable,StyledTableCell} from "assets/js/library/components/table"


function UserDashboardComponent({t,appContext}) {
    const [users, setUsers] = useState([]);
    const lang = i18next.language
    let leftRightAlign = lang === "en" ? "left" : "right"
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
                                <StyledTableCell width="8" align={leftRightAlign} minWidth={52} >{t('translation:image')}</StyledTableCell>
                                <StyledTableCell width="37" align={leftRightAlign}>{t('users:username')}</StyledTableCell>
                                <StyledTableCell width="40" align="center">{t('users:email')}</StyledTableCell>
                                <StyledTableCell width="15" align="center">{t('translation:date')}</StyledTableCell>
                            </StyledTableHeadRow>
                            <StyledTableBody>
                                {users.map((user, index) =>
                                    <a key={index} href={user.view_user} target='_blank'>
                                    <StyledTableBodyRow key={index}>
                                        <StyledTableCell width="8" align={leftRightAlign} minWidth={52} >
                                            <StyledCheckboxImgInTable minWidth="90">
                                                <StyledTableImg>
                                                    {user.picture ? <img src={user.picture} alt="user.name"/> :
                                                        <img src={userImg}/>}
                                                </StyledTableImg>
                                            </StyledCheckboxImgInTable>
                                        </StyledTableCell>
                                        <StyledTableCell width="37" align={leftRightAlign}>{user.user_name}</StyledTableCell>
                                        <StyledTableCell width="40" align="center">{user.mail}</StyledTableCell>
                                        <StyledTableCell width="15" align="center">{user.created}</StyledTableCell>
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
