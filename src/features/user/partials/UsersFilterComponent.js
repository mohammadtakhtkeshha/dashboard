import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Box, Typography, withStyles, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { StyledFilterBlock } from 'assets/js/user/users';
import { StyledAddButton, StyledInput, styledTextField } from 'assets/js/App';
import { StyledInsideGrid } from 'assets/js/content/partials/contentFilter';
import i18next from 'i18next';

const StyledTextField = withStyles(styledTextField)(TextField);

function UsersFilterComponent({ t, users, handlePagination, faRoles, enRoles, expandedFilter, setExpandedFilter }) {
  const [role, setRole] = useState('');
  const lang = i18next.language;
  const [searchedUser, setSearcheUser] = useState({
    firs_name: '',
    last_name: '',
    user_name: '',
    mail: '',
    roles: '',
  });

  let changeRole = e => {
    let currentValue = e.currentTarget.value;
    setRole(currentValue);
  };

  let doFilterHandler = () => {
    let fieldName = searchedUser.firs_name;
    let fieldLastName = searchedUser.last_name;
    let name = searchedUser.user_name;
    let mail = searchedUser.mail;
    let filteredUser = users.filter(user => {
      let newUser = user['firs_name'].includes(fieldName) && user['last_name'].includes(fieldLastName) && user['user_name'].includes(name) && user['mail'].includes(mail) && user['roles'].includes(role);
      return newUser;
    });
    handlePagination(filteredUser, false);
  };

  let filterBy = (e, key) => {
    let keyValue = e.currentTarget.value;
    setSearcheUser(prevState => {
      return {
        ...prevState,
        [key]: keyValue,
      };
    });
  };

  const changeExpanding = (e, checked) => {
    setExpandedFilter(checked);
  };

  return (
    <Box>
      <Accordion expanded={expandedFilter} onChange={changeExpanding}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography>{t('translation:filter')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StyledFilterBlock>
            <Grid container>
              <Grid item md={4} xs={4}>
                <StyledInsideGrid lang={lang}>
                  <StyledInput className="filter-first-name" placeholder={t('translation:name')} onChange={e => filterBy(e, 'firs_name')} />
                </StyledInsideGrid>
              </Grid>
              <Grid item md={4} xs={4}>
                <StyledInsideGrid lang={lang}>
                  <StyledInput className="filter-last-name" placeholder={t('users:family')} onChange={e => filterBy(e, 'last_name')} />
                </StyledInsideGrid>
              </Grid>
              <Grid item md={4} xs={4}>
                <StyledInsideGrid lang={lang}>
                  <StyledInput className="filter-username" placeholder={t('users:username')} onChange={e => filterBy(e, 'user_name')} />
                </StyledInsideGrid>
              </Grid>
              <Grid item md={4} xs={6}>
                <StyledInsideGrid lang={lang}>
                  <StyledInput className="filter-email" placeholder={t('users:email')} onChange={e => filterBy(e, 'mail')} />
                </StyledInsideGrid>
              </Grid>
              <Grid item md={4} xs={6}>
                <StyledInsideGrid lang={lang}>
                  {faRoles ? (
                    <StyledTextField id="outlined-select-role-native" select className="user-filter-role" value={role} onChange={e => changeRole(e)} SelectProps={{ native: true }} variant="outlined">
                      <option value="">{t('translation:none')}</option>
                      {faRoles.map((current, index) => (
                        <option key={enRoles[index]} value={current}>
                          {current}
                        </option>
                      ))}
                    </StyledTextField>
                  ) : (
                    ''
                  )}
                </StyledInsideGrid>
              </Grid>
            </Grid>
            <StyledAddButton onClick={doFilterHandler}>{t('translation:do')}</StyledAddButton>
          </StyledFilterBlock>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default withNamespaces('users,translation')(UsersFilterComponent);
