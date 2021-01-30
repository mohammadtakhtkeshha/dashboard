import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, Typography} from "@material-ui/core";
import {CardMedia} from '@material-ui/core/index';

import userImg from 'assets/media/image/user.jpg';
import dashboardService from "core/services/dashboard.service";
import {
    StyledPaper, StyledDashboardBlock
} from "assets/js/dashboard/dashboard";
import {
    StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell,

} from "assets/js/App";

function UserDashboardComponent({t,appContext}) {
    const [users, setUsers] = useState([]);
    const lang = i18next.language
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
                        <StyledTable>
                            <StyledTableHeadRow lang={lang}>
                                <StyledTableCell align="right">{t('translation:image')}</StyledTableCell>
                                <StyledTableCell align="right">{t('users:username')}</StyledTableCell>
                                <StyledTableCell align="right">{t('users:email')}</StyledTableCell>
                                <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>
                            </StyledTableHeadRow>
                            <StyledTableBody>
                                {users.map((user, index) =>
                                    <a key={index} href={user.view_user} target='_blank'>
                                    <StyledTableBodyRow key={index}>
                                        <StyledTableCell align="right">
                                            <Box className="imgBlock">
                                                <CardMedia id="img">
                                                    {user.picture ? <img src={user.picture} alt="user.name"/> :
                                                        <img src={userImg}/>}
                                                </CardMedia>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{user.user_name}</StyledTableCell>
                                        <StyledTableCell align="right">{user.mail}</StyledTableCell>
                                        <StyledTableCell align="right">{user.created}</StyledTableCell>
                                    </StyledTableBodyRow>
                                    </a>
                                )}
                            </StyledTableBody>
                        </StyledTable>
                    </StyledPaper>
                </StyledDashboardBlock> : <></>
            }</>
    );
}


export default withNamespaces('translation,users')(UserDashboardComponent);
