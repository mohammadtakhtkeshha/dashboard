import React, {useContext, useEffect, useState} from 'react';
import {withNamespaces} from 'react-i18next';
import ModalMenu from './partials/modal/Index.jsx';
import {useParams} from 'react-router-dom';

import AppContext from 'contexts/AppContext';
import {getMenuMethod, constMenu, getMenusMethod} from './Index.js';
import {Helmet} from 'react-helmet';
import MenuHeaderComponent from './partials/MenuHeaderComponent.jsx';
import MenuListComponent from './partials/MenuListComponent.jsx';

function Index({t}) {
    const [link, setLink] = useState('');
    const [openForm, setOpenForm] = useState({show: false, id: ''});
    const {setLoading} = useContext(AppContext);
    const [menus, setMenus] = useState([]);
    const [errors, setErrors] = useState({});
    const [menu, setMenu] = useState(constMenu);
    let {type} = useParams();
    const [dynamicHeight, setDynamicHeight] = useState(0);

    const closeForm = () => {
        setOpenForm({id: '', show: false});
        setErrors({});
        setMenu(constMenu);
        setLink('');
    };

    // const getMenu = useCallback((id) => {
    //     if (id !== "") {//edit
    //         getMenuMethod(id, appContext, setMenu, setLink)
    //     }
    // }, [appContext])

    const getMenus = () => {
        getMenusMethod(setLoading, setMenus, type, setDynamicHeight);
    }

    useEffect(() => {
        getMenusMethod(setLoading, setMenus, type, setDynamicHeight);
    }, [setLoading, type, setDynamicHeight]);

    useEffect(() => {
        if (openForm.id !== '') {//edit
            getMenuMethod(openForm.id, setLoading, setMenu, setLink);
        }
    }, [openForm.id, setLoading]);

    return (<>
        <Helmet>
            <title>{t('taxonomy:menus')}</title>
        </Helmet>
        <MenuHeaderComponent setOpenForm={setOpenForm}/>
        <MenuListComponent
            setOpenForm={setOpenForm}
            menus={menus}
            setDynamicHeight={setDynamicHeight}
            dynamicHeight={dynamicHeight}
            getMenus={getMenus}
            setMenus={setMenus}/>
        <ModalMenu
            menus={menus}
            openForm={openForm}
            link={link}
            setLink={setLink}
            setOpenForm={setOpenForm}
            setErrors={setErrors}
            errors={errors}
            closeForm={closeForm}
            menu={menu}
            setMenu={setMenu}
            getMenus={getMenus}
            handleCloseForm={closeForm}/>
    </>);
}

export default withNamespaces('translation,taxonomy')(Index);
