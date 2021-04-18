import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {StyledFooterButton} from "assets/js/content/partials/newContent";
import {StyledFooterRegisterContent} from "assets/js/content/partials/contentModal";
import ContentsContext from "contexts/ContentsContext";
import AppContext from "contexts/AppContext";
import {registerMethod, changeStepMethod} from "./FormContentFooterComponent.js";
import {isObjectEmpty} from "methods/commons";

const FormContentFooterComponent = React.memo(({t, value, setValue, contentype}) => {
    const lang = i18next.language;
    const contentsContext = useContext(ContentsContext);
    const appContext = useContext(AppContext);

    const register = () => {
        if (isObjectEmpty(contentsContext.errors)) {
            appContext.setLoading(true);
            registerMethod(t, lang, contentsContext, appContext, contentsContext.id, contentype);
        }
    }

    const changeStep = (step) => {
        changeStepMethod(step, contentype, value, setValue)
    }

    return (<StyledFooterRegisterContent>
        <StyledFooterButton lang={lang} onClick={() => changeStep('minus')}>
            {t('translation:prevStep')}
        </StyledFooterButton>
        <StyledFooterButton state={isObjectEmpty(contentsContext.errors)} lang={lang} onClick={register}>
            {t('translation:register')}
        </StyledFooterButton>
        <StyledFooterButton lang={lang} onClick={() => changeStep('plus')}>
            {t('translation:nextStep')}
        </StyledFooterButton>
    </StyledFooterRegisterContent>);
})

export default withNamespaces('translation')(FormContentFooterComponent);

