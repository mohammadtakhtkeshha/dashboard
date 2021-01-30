import React, {useContext, useEffect, useState} from "react"
import {withNamespaces} from "react-i18next"
import {Helmet} from "react-helmet"
import ModalState from "./partials/modal/Index.jsx"
import Pagination from "@material-ui/lab/Pagination"

import AppContext from "contexts/AppContext"
import {StyledPaper} from "assets/js/App"
import {StyledPaginationBox} from "assets/js/pagination"
import {handlePaginationMethod, getCategoryMethod, constState, emptyCategory, getStatesMethod} from "./Index.js"
import StateTableComponent from "./partials/StateTableComponent.jsx"
import StateHeaderComponent from "./partials/StateHeaderComponent.jsx"
import StateFilterComponent from "./partials/StateFilterComponent.jsx"

function Index({t}) {
    const [chunks, setChunks] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(0)
    const [openForm, setOpenForm] = useState({show: false, id: ''})
    const appContext = useContext(AppContext)
    const [category, setCategory] = useState(constState)
    const [states, setStates] = useState({})
    const [ids, setIds] = useState(['root'])
    const [errors, setErrors] = useState({})//{name: [], path: []}

    const handlePagination = (currentStates) => {
        handlePaginationMethod(currentStates, setStates, setTotalPage, setChunks, t)
    }

    const paginate = (e, value) => {
        setPage(value - 1)
    }

    const getStates = () => {
        getStatesMethod(appContext.handleError, setStates, handlePagination, setIds)
    }

    const getCategory = (id) => {
        if (id !== "") {
            getCategoryMethod(id, appContext, setCategory)
        }
    }

    const closeForm = () => {
        setOpenForm({id: "", show: false})
        setErrors({})
        setCategory(emptyCategory)
    }

    useEffect(() => {
        getStates()
    }, [])

    useEffect(() => {
        getCategory(openForm.id)
    }, [openForm.id])
console.log(chunks)
    return (<StyledPaper>
        <Helmet>
            <title>
                {t('taxonomy:categoryList')}
            </title>
        </Helmet>
        <StateHeaderComponent setOpenForm={setOpenForm}/>
        <StateTableComponent ids={ids}
                             setOpenForm={setOpenForm}
                             states={states}
                             chunks={chunks}
                             setChunks={setChunks}
                             handlePagination={handlePagination}
                             setIds={setIds}
                             page={page}
                             setStates={setStates}/>
        <ModalState states={states}
                    openForm={openForm}
                    setIds={setIds}
                    handlePagination={handlePagination}
                    setOpenForm={setOpenForm}
                    setErrors={setErrors}
                    errors={errors}
                    closeForm={closeForm}
                    category={category}
                    setCategory={setCategory}
                    setStates={setStates}
                    handleCloseForm={closeForm}/>
        <StyledPaginationBox>
            <Pagination count={(totalPage)} onChange={paginate}/>
        </StyledPaginationBox>
    </StyledPaper>)
}

export default withNamespaces('translation,taxonomy')(Index)
