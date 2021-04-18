import React, {useContext, useEffect, useState} from "react"
import {withNamespaces} from "react-i18next"
import ModalMenu from "./partials/modal/Index.jsx"
import {useParams} from "react-router-dom";

import AppContext from "contexts/AppContext"
import {getMenuMethod, constMenu, getMenusMethod} from "./Index.js"
import {Helmet} from "react-helmet"
import MenuHeaderComponent from "./partials/MenuHeaderComponent.jsx"
import MenuListComponent from "./partials/MenuListComponent.jsx"

function Index({t}) {
    const [link, setLink] = useState("")
    const [openForm, setOpenForm] = useState({show: false, id: ''})
    const appContext = useContext(AppContext)
    const [menus, setMenus] = useState([])
    const [errors, setErrors] = useState({})
    const [menu, setMenu] = useState(constMenu)
    let {type} = useParams()

    const getMenus = () => {
        getMenusMethod(appContext, setMenus, t, type)
    }

    const getMenu = (id) => {
        if (id !== "") {//edit
            getMenuMethod(id, appContext, setMenu, setLink)
        }
    }

    const closeForm = () => {
        setOpenForm({id: "", show: false})
        setErrors({})
        setMenu(constMenu)
        setLink("")
    }

    useEffect(() => {
        getMenus()
    }, [])

    useEffect(() => {
        getMenu(openForm.id)
    }, [openForm.id])

    return (<>
        <Helmet>
            <title>
                {t('taxonomy:menus')}
            </title>
        </Helmet>
        <MenuHeaderComponent setOpenForm={setOpenForm}/>
        <MenuListComponent setOpenForm={setOpenForm}
                           menus={menus}
                           getMenus={getMenus}
                           setMenus={setMenus}/>
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
                   getMenus={getMenus}
                   handleCloseForm={closeForm}/>
    </>)
}

export default withNamespaces('translation,taxonomy')(Index)
