import React, {useState, useEffect,useContext} from "react";
import {withNamespaces} from "react-i18next";

import {Box, Typography} from "@material-ui/core";
import {CardMedia} from '@material-ui/core/index';

import AppContext from 'contexts/AppContext';
import userImg from 'assets/media/image/user.jpg';
import dashboardService from "core/services/dashboard.service";
import {
    StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell,
    StyledPaper
} from "assets/js/dashboard/dashboard";

function UserDashboardComponent({t}) {
    const appContext = useContext(AppContext);
    const [users , setUsers]=useState([]);

    let getTenNumberOfUsers=()=>{
         dashboardService.getTenNumberOfUsers(appContext.token).then((response)=>{
            let users=response.data;
            setUsers([...users]);
        }).catch((error)=>{
        });
    };

    useEffect(()=>{
        getTenNumberOfUsers();
    },[]);

    return (
        <>
            <StyledPaper>
                <Typography variant="h4"> ______ {t('users:users')} _______ </Typography>
                <StyledTable>
                    <StyledTableHeadRow>
                            <StyledTableCell align="right">{t('translation:image')}</StyledTableCell>
                            <StyledTableCell align="right">{t('users:username')}</StyledTableCell>
                            <StyledTableCell align="right">{t('users:email')}</StyledTableCell>
                            <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {users.map((user, index) =>
                            <StyledTableBodyRow key={index}>
                                <StyledTableCell align="right">
                                    <Box className="imgBlock">
                                        <CardMedia id="img">
                                            { user.user_picture ? <img src={user.user_picture} alt="user.name"/>:<img src={userImg}/>}
                                        </CardMedia>
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="right">{user.name}</StyledTableCell>
                                <StyledTableCell align="right">{user.mail}</StyledTableCell>
                                <StyledTableCell align="right">{user.created}</StyledTableCell>
                            </StyledTableBodyRow>
                        )}
                    </StyledTableBody>
                </StyledTable>
            </StyledPaper>
        </>
    );
}


export default withNamespaces('translation,users')(UserDashboardComponent);
