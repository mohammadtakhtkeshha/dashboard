import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {StyledFooterButton} from "assets/js/content/partials/newContent";
import {StyledFooterRegisterContent} from "assets/js/content/partials/contentModal";
import ContentsContext from "contexts/ContentsContext";
import AppContext from "contexts/AppContext";
import {registerMethod} from "./FormContentFooterComponent.js";
import {isObjectEmpty} from "methods/commens";

function FormContentFooterComponent({t,value,setValue}) {
    const lang = i18next.language;
    const contentsContext=useContext(ContentsContext);
    const appContext=useContext(AppContext);
    const finalDataValidation = isObjectEmpty(contentsContext.errors)

    const register = () => {
        if(finalDataValidation){
            appContext.setLoading(true);
                registerMethod(t,contentsContext,appContext,contentsContext.id);
        }
    }

    const changeStep = (step) => {
        if(step === 'plus'){
            if(value === 5){
                setValue(0);
            }else{
                const currentValue = value+1;
                setValue(currentValue);
            }
        }else{
            if(value === 0){
                setValue(5);
            }else{
                const currentValue = value-1;
                setValue(currentValue);
            }
        }
    }

    return(<StyledFooterRegisterContent>
            <StyledFooterButton lang={lang} onClick={()=>changeStep('minus')}>
                {t('translation:prevStep')}
            </StyledFooterButton>
            <StyledFooterButton state={finalDataValidation} lang={lang} onClick={register}>
                {t('translation:register')}
            </StyledFooterButton>
            <StyledFooterButton lang={lang} onClick={()=>changeStep('plus')}>
                {t('translation:nextStep')}
            </StyledFooterButton>
        </StyledFooterRegisterContent>);
}
export default withNamespaces('translation')(FormContentFooterComponent);
