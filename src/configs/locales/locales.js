import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import sidebarEn from './../../assets/locales/en/features/sidebar.json';
import sidebarFa from './../../assets/locales/fa/features/sidebar.json';
import usersFa from './../../assets/locales/fa/features/users.json';
import usersEn from './../../assets/locales/en/features/users.json';
import translationEn from './../../assets/locales/en/features/translation.json';
import translationFa from './../../assets/locales/fa/features/translation.json';
import contentsFa from './../../assets/locales/fa/features/contents.json';
import contentsEn from './../../assets/locales/en/features/contents.json';
import termsEn from './../../assets/locales/en/features/terms.json';
import termsFa from './../../assets/locales/fa/features/terms.json';
import vocabsFa from './../../assets/locales/fa/features/vocabs.json';
import vocabsEn from './../../assets/locales/en/features/vocabs.json';
import tagsEn from './../../assets/locales/en/features/tags.json';
import tagsFa from './../../assets/locales/fa/features/tags.json';
import categoriesFa from './../../assets/locales/fa/features/categories.json';
import categoriesEn from './../../assets/locales/en/features/categories.json';
//localstorage
import storage from './../../libraries/local-storage'

// the translations
const resources = {
    en: {
        sidebar:sidebarEn,
        users:usersEn,
        translation:translationEn,
        contents:contentsEn,
        temrs:termsEn,
        vocabs:vocabsEn,
        categories:categoriesEn,
    },
    fa:{
        sidebar: sidebarFa,
        users:usersFa,
        translation:translationFa,
        contents:contentsFa,
        terms:termsFa,
        vocabs:vocabsFa,
        tags:tagsFa,
        categories:categoriesFa,

    }
};

i18n
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .use(detector)
    .init({
        resources,
        lng: storage.get('lang') || 'fa',
        ns: ['sidebar', 'users','translation'],
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;

// https://react.i18next.com/legacy-v9/step-by-step-guide