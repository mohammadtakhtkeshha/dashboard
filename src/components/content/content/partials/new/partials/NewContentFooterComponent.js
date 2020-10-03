import React from "react";
import {withNamespaces} from "react-i18next";
import {StyledFooterButton} from "assets/js/content/newContent";
import {StyledFooterRegisterContent} from "assets/js/content/partials/contentModal";
import i18next from "i18next";

function NewContentFooterComponent({t}) {
    const lang = i18next.language;
    const register = () => {

    }

    return(<>
        <StyledFooterRegisterContent>
            <StyledFooterButton lang={lang} onClick={register}>
                {t('translation:prevStep')}
            </StyledFooterButton>
            <StyledFooterButton lang={lang} onClick={register}>
                {t('translation:register')}
            </StyledFooterButton>
            <StyledFooterButton lang={lang} onClick={register}>
                {t('translation:nextStep')}
            </StyledFooterButton>
        </StyledFooterRegisterContent>
    </>);
}
export default withNamespaces('translation')(NewContentFooterComponent);