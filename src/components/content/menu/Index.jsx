import React, {useContext, useEffect, useState} from "react"
import {withNamespaces} from "react-i18next"
import ModalMenu from "./partials/modal/Index.jsx"
import {useParams} from "react-router-dom";

import Pagination from "@material-ui/lab/Pagination"
import AppContext from "contexts/AppContext"
import {StyledPaper} from "assets/js/App"
import {StyledPaginationBox} from "assets/js/pagination"
import {handlePaginationMethod, getMenuMethod, constMenu, getMenusMethod} from "./Index.js"
import {Helmet} from "react-helmet"
import MenuHeaderComponent from "./partials/MenuHeaderComponent.jsx"
import MenuListComponent from "./partials/MenuListComponent.jsx"

function Index({t}) {
    const [chunks, setChunks] = useState({})
    const [totalPage, setTotalPage] = useState(0)
    const [link, setLink] = useState("")
    const [page, setPage] = useState(0)
    const [openForm, setOpenForm] = useState({show: false, id: ''})
    const appContext = useContext(AppContext)
    const [menus, setMenus] = useState({})
    const [errors, setErrors] = useState({})
    const [menu, setMenu] = useState(constMenu)
    let {type} = useParams()

    const handlePagination = (currentMenus) => {
        handlePaginationMethod(currentMenus, setMenus, setTotalPage, setChunks, t)
    }

    const paginate = (e, value) => {
        setPage(value - 1)
    }

    const getMenus = () => {
        getMenusMethod(appContext, setMenus, handlePagination, t, setChunks, setTotalPage, type)
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
                           setChunks={setChunks}
                           setTotalPage={setTotalPage}
                           getMenus={getMenus}
                           handlePagination={handlePagination}
                           chunks={chunks}
                           page={page}
                           setMenus={setMenus}/>
        <ModalMenu menus={menus}
                   openForm={openForm}
                   link={link}
                   setLink={setLink}
                   handlePagination={handlePagination}
                   setOpenForm={setOpenForm}
                   setErrors={setErrors}
                   errors={errors}
                   closeForm={closeForm}
                   menu={menu}
                   setMenu={setMenu}
                   getMenus={getMenus}
                   handleCloseForm={closeForm}/>
        <StyledPaginationBox>
            <Pagination count={(totalPage)} onChange={paginate}/>
        </StyledPaginationBox>
    </>)
}

export default withNamespaces('translation,taxonomy')(Index)
