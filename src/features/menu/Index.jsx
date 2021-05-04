import React, {useContext, useEffect, useState } from "react"
import { withNamespaces } from "react-i18next"
import ModalMenu from "./partials/modal/Index.jsx"
import { useParams } from "react-router-dom";

import AppContext from "contexts/AppContext"
import { getMenuMethod, constMenu, getMenusMethod } from "./Index.js"
import { Helmet } from "react-helmet"
import MenuHeaderComponent from "./partials/MenuHeaderComponent.jsx"
import MenuListComponent from "./partials/MenuListComponent.jsx"

function Index({ t }) {
    const [link, setLink] = useState("")
    const [openForm, setOpenForm] = useState({ show: false, id: '' })
    const appContext = useContext(AppContext)
    const [menus, setMenus] = useState([])
    const [errors, setErrors] = useState({})
    const [menu, setMenu] = useState(constMenu)
    let { type } = useParams()


    const closeForm = () => {
        setOpenForm({ id: "", show: false })
        setErrors({})
        setMenu(constMenu)
        setLink("")
    }
    
    // const getMenu = useCallback((id) => {
    //     if (id !== "") {//edit
    //         getMenuMethod(id, appContext, setMenu, setLink)
    //     }
    // }, [appContext])

    useEffect(() => {
        getMenusMethod(appContext, setMenus, t, type)
    }, [appContext,t,type])

    useEffect(() => {
        if (openForm.id !== "") {//edit
            getMenuMethod(openForm.id, appContext, setMenu, setLink)
        }
    }, [openForm.id,appContext])

    return (<>
        <Helmet>
            <title>
                {t('taxonomy:menus')}
            </title>
        </Helmet>
        <MenuHeaderComponent setOpenForm={setOpenForm} />
        <MenuListComponent setOpenForm={setOpenForm}
            menus={menus}
            getMenus={getMenusMethod}
            setMenus={setMenus} />
        <ModalMenu menus={menus}
            openForm={openForm}
            link={link}
            setLink={setLink}
            setOpenForm={setOpenForm}
            setErrors={setErrors}
            errors={errors}
            closeForm={closeForm}
            menu={menu}
            setMenu={setMenu}
            getMenus={getMenusMethod}
            handleCloseForm={closeForm} />
    </>)
}

export default withNamespaces('translation,taxonomy')(Index)
