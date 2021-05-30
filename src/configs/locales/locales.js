import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import sidebarEn from 'assets/locales/en/features/sidebar.json';
import sidebarFa from 'assets/locales/fa/features/sidebar.json';
import usersFa from 'assets/locales/fa/features/users.json';
import usersEn from 'assets/locales/en/features/users.json';
import translationEn from 'assets/locales/en/features/translation.json';
import translationFa from 'assets/locales/fa/features/translation.json';
import contentsFa from 'assets/locales/fa/features/contents.json';
import contentsEn from 'assets/locales/en/features/contents.json';
import commentsEn from 'assets/locales/en/features/comments.json';
import commentsFa from 'assets/locales/fa/features/comments.json';
import taxonomyFa from 'assets/locales/fa/features/taxonomy.json';
import taxonomyEn from 'assets/locales/en/features/taxonomy.json';
import ticketsEn from 'assets/locales/en/features/tickets.json';
import ticketsFa from 'assets/locales/fa/features/tickets.json';
import menuFa from 'assets/locales/fa/features/menu.json';
import menuEn from 'assets/locales/en/features/menu.json';
import matamoEn from 'assets/locales/en/features/matamo.json';
import matamoFa from 'assets/locales/fa/features/matamo.json';
import roleFa from 'assets/locales/fa/features/roles.json';
import roleEn from 'assets/locales/en/features/roles.json';
import settingsEn from 'assets/locales/en/features/settings.json';
import settingsFa from 'assets/locales/fa/features/settings.json';
import webFormsFa from 'assets/locales/fa/features/webforms.json';
import webFormsEn from 'assets/locales/fa/features/webforms.json';

//localstorage
import storage from 'libraries/local-storage'

// the translations
const resources = {
    en: {
        comments:commentsEn,
        sidebar:sidebarEn,
        users:usersEn,
        translation:translationEn,
        contents:contentsEn,
        taxonomy:taxonomyEn,
        tickets:ticketsEn,
        menu:menuEn,
        matamo:matamoEn,
        roles:roleEn,
        settings:settingsEn,
        webforms:webFormsEn,
    },
    fa:{
        comments:commentsFa,
        sidebar: sidebarFa,
        users:usersFa,
        translation:translationFa,
        contents:contentsFa,
        taxonomy:taxonomyFa,
        tickets:ticketsFa,
        menu:menuFa,
        matamo:matamoFa,
        roles:roleFa,
        settings:settingsFa,
        webforms:webFormsFa,
    }
};

i18n
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .use(detector)
    .init({
        resources,
        lng: storage.get('lang') || 'fa',
        ns: ['sidebar', 'users','translation','menu'],
        keySeparator: false, // we do not use keys in elementTabs messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;

// https://react.i18next.com/legacy-v9/step-by-step-guide
