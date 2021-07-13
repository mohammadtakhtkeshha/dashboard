import React, {useEffect, useState} from 'react';
import i18next from 'i18next';
import {withNamespaces} from "react-i18next";

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

import {StyledMultiSelect, styledTextField} from "assets/js/partials/autocomplete";

const StyledTextField = withStyles(styledTextField)(TextField)

function MultiAutoComplete({t, array, selectedTags, changedTags, setSelectedTags, selectedIndexes}) {
    const lang = i18next.language;

    const handleChange = (e) => {
        if (e) {
            setSelectedTags([...e]);
        }
        changedTags(e);
    }

    useEffect(() => {
        handleChange(selectedTags);
    }, [array]);

    return (<StyledMultiSelect lang={lang}>
        {selectedIndexes.length > 0 ?
            <Autocomplete
                multiple
                id="tags-filled"
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => handleChange(value)}
                options={array}
                defaultValue={() => {
                    let currentDefault = []
                    for (let index of selectedIndexes) {
                        currentDefault.push(array[index])
                    }
                    return currentDefault;
                }}
                fullWidth={true}
                renderInput={(params) => (
                    <StyledTextField
                        {...params}
                        variant="standard"
                        placeholder={t('translation:choose')}
                    />
                )}
            />
            : <div>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={array}
                    onChange={(event, value) => handleChange(value)}
                    getOptionLabel={(option) => option.name}
                    defaultValue={[]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            placeholder={t('translation:choose')}
                        />
                    )}
                />
            </div>}
    </StyledMultiSelect>);
};

export default withNamespaces('translation')(MultiAutoComplete);
