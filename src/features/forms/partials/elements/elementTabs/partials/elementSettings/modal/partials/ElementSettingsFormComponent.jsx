import React, {useState, useEffect, useContext, useCallback} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {Box, Typography} from '@material-ui/core/index';
import AppContext from 'contexts/AppContext';
import {StyledInput} from 'assets/js/library/components/input';
import {StyledRadioButton} from 'assets/js/library/components/buttons';
import {StyledModalFooter, StyledModalHeader, StyledModalBody} from 'assets/js/library/components/modal';
import {StyledLabel, StyledTypographyError} from 'assets/js/library/base/typography';
import {Grid} from "@material-ui/core";
import AutocompleteComponent from "features/partials/AutocompleteComponent.jsx";

function ElementSetttingsFormComponent({t, errors}) {
    const lang = i18next.language;
    const [array, setArray] = useState([
        {id:0,title:'zero'},{id:1,title:'one'},{id:2,title:'two'}
        ])
    const [selectedTags, setSelectedTags] = useState([
        // {id:0,title:'zero'},{id:1,title:'one'},{id:2,title:'two'}
        ])
    const [email, setEmail] = useState({
        title: ''
    })

    const handleChange = () => {

    }

    const changedTags = () => {

    }

    return (
        <>
            <StyledModalHeader>{t('webforms:addEmail')}</StyledModalHeader>
            <StyledModalBody>
                <Grid container>
                    <Grid item xs={12}>
                        <StyledLabel>{t('translation:name')}</StyledLabel>
                        <StyledInput
                            className="tour-name"
                            value={email.title}
                            type="text"
                            placeholder={t('translation:name')}
                            onChange={handleChange}
                        />
                        {/*{errors.name && <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>*/}
                        {/*    {errors.name.required}*/}
                        {/*</StyledTypographyError>}*/}
                    </Grid>
                    <Grid item xs={12}>
                        <StyledLabel>{t('translation:name')}</StyledLabel>
                        {/*<AutocompleteComponent*/}
                        {/*    array={array}*/}
                        {/*    selectedTags={selectedTags}*/}
                        {/*    changedTags={changedTags}*/}
                        {/*    setSelectedTags={setSelectedTags}*/}
                        {/*    label={'label'}*/}
                        {/*/>*/}
                        {/*{errors.name && <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>*/}
                        {/*    {errors.name.required}*/}
                        {/*</StyledTypographyError>}*/}
                    </Grid>
                </Grid>
            </StyledModalBody>
        </>
    );
}

export default withNamespaces('webforms, translation')(ElementSetttingsFormComponent);
