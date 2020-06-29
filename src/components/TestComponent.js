import React from "react";
import { withNamespaces } from 'react-i18next';
import i18n from  './../configs/locales/locales';



// append app to dom
function TestComponent({ t }) {
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }
    return(
        <div>
            <button onClick={() => changeLanguage('fa')}>fa</button>
            <button onClick={() => changeLanguage('en')}>en</button>
            {t('dashboard')}
        </div>
    );
}


export default withNamespaces()(TestComponent);