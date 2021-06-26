import React, {useState} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Box, Typography, withStyles, Grid, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import {StyledFilterBlock} from 'assets/js/user/users';
import {StyledAddButton, StyledInput, styledTextField} from 'assets/js/App';
import {StyledInsideGrid} from 'assets/js/library/pages/webform/formFilter';

const StyledTextField = withStyles(styledTextField)(TextField);

function FormsFilterComponent({t, forms, setForms, expandedFilter, setExpandedFilter,basicForms}) {
    const lang = i18next.language;
    const [searchedForm, setSearchedForm] = useState({
        title: '',
        author: '',
        status: ''
    });

    const doFilterHandler = () => {
        let currentTitle = searchedForm.title;
        // let currentAuthor = searchedForm.author;
        let currentStatus = searchedForm.status;
        let filteredForms = basicForms.filter(form => {
            let newForms = form['title'].includes(currentTitle) &&
                // form['author'].includes(currentAuthor) &&
                form['status'].includes(currentStatus)
            return newForms;
        });
        setForms(filteredForms)
    };


    const filterBy = (e, key) => {
        let keyValue = e.currentTarget.value;
        setSearchedForm(prevState => {
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
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content">
                    <Typography>{t('translation:filter')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StyledFilterBlock>
                        <Grid container>
                            <Grid item md={4} sm={4} xs={12}>
                                <StyledInsideGrid lang={lang}>
                                    <StyledInput
                                        className="filter-title"
                                        placeholder={t('translation:title')}
                                        onChange={e => filterBy(e, 'title')}/>
                                </StyledInsideGrid>
                            </Grid>
                            <Grid item md={4} sm={4} xs={12}>
                                <StyledInsideGrid lang={lang}>
                                    <StyledInput
                                        className="filter-author"
                                        placeholder={t('translation:author')}
                                        onChange={e => filterBy(e, 'author')}/>
                                </StyledInsideGrid>
                            </Grid>
                            <Grid item md={4} sm={4} xs={12}>
                                <StyledInsideGrid>
                                    <StyledTextField
                                        id="outlined-select-role-native"
                                        select
                                        value={searchedForm.status}
                                        className="filter-status"
                                        onChange={(e) => filterBy(e, 'status')}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined">
                                        <option value="">{t('translation:status')}</option>
                                        <option value="open">{t('translation:open')}</option>
                                        <option value="closed">{t('translation:close')}</option>
                                    </StyledTextField>
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

export default withNamespaces('users,translation')(FormsFilterComponent);
