import React from 'react';
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'

import {StyledAutocomplete} from "assets/js/partials/autocomplete";

function AutocompleteComponent({t, array, selectedTags, changedTags, setSelectedTags, label}) {
    const lang = i18next.language;

    const handleChange = (e) => {
        if (e) {
            setSelectedTags([...e]);
        }
        changedTags(e)
    }

    return (
        <StyledAutocomplete lang={lang}>
            {array.length > 0 && <Autocomplete
                multiple
                id="tags-filled"
                // options={array.map((option) => option.name)}
                options={array}
                getOptionLabel={option => option.name}
                value={selectedTags}
                label={label}
                // defaultValue={selectedTags}
                onChange={(event, value) => handleChange(value)}
                // getOptionSelected={getCurrentOptionSelected}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option.name} {...getTagProps({index})} />
                    ))
                }
                renderInput={(params) => (
                    <TextField {...params} variant="filled" placeholder={label}/>
                )}
            />}
        </StyledAutocomplete>
    );
}


export default withNamespaces()(AutocompleteComponent);
