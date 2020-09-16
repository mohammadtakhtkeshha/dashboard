import React from "react";

import {Box} from "@material-ui/core";
import {withNamespaces} from "react-i18next";
import {StyledInput} from 'assets/js/App';
import {StyledNewTerm} from 'assets/js/vocabs/terms';

function NewTermComponent({t}) {

    const changeName = (e) => {
        const name = e.currentTarget.value;
        console.log(name);
    }

    return (
        <StyledNewTerm>
            <Box>
                <StyledInput placeholder={t('translation:name')} onClick={changeName}/>
            </Box>
        </StyledNewTerm>
    );
}

export default withNamespaces('vocabs,translation')(NewTermComponent);
