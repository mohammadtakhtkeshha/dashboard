import React, {useContext, useEffect, useState} from "react";
import {Box} from "@material-ui/core";
import {withNamespaces} from "react-i18next";
import {StyledInput} from 'assets/js/App';
import {StyledNewTerm} from 'assets/js/vocabs/terms';
import {StyledButton} from 'assets/js/App'
import {primary} from "components/partials/Colors";
import {registerTerm} from 'core/services/term.service';
import AppContext from "contexts/AppContext";
import TermsContext from "contexts/TermsContext";

function NewTermComponent({t,category}) {
    const appContext = useContext(AppContext);
    const termsContext = useContext(TermsContext);
    const [term, setTerm] = useState({
        vid: {
            "target_id": category
        },
        name: ""
    });

    const changeName = (e) => {
        const name = e.target.value;
        setTerm(prevState => {
            return {
                ...prevState, name: name
            }
        });
    }

    const register = () => {
        registerTerm(term, appContext.handleError).then((response) => {
            termsContext.getRegisteredTerm(response.data)
        });
    }

    console.log(term);

    useEffect(() => {

    }, [termsContext.id]);

    return (
        <StyledNewTerm>
            <Box>
                <StyledInput  onChange={changeName} placeholder={t('translation:name')}/>
                <StyledButton bg={primary} onClick={register}>{t('translation:register')}</StyledButton>
            </Box>
        </StyledNewTerm>
    );
}

export default withNamespaces('vocabs,translation')(NewTermComponent);
