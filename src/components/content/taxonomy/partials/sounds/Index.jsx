import React, {useContext, useEffect, useState} from "react"
import {withNamespaces} from "react-i18next"
import {Helmet} from "react-helmet"
import ModalState from "./partials/modal/Index.jsx"
import Pagination from "@material-ui/lab/Pagination"

import AppContext from "contexts/AppContext"
import {StyledPaper} from "assets/js/App"
import {StyledPaginationBox} from "assets/js/pagination"
import {handlePaginationMethod, getStateMethod, constState, emptyState, getStatesMethod} from "./Index.js"
import StateTableComponent from "./partials/StateTableComponent.jsx"
import StateHeaderComponent from "./partials/StateHeaderComponent.jsx"
import StateFilterComponent from "./partials/StateFilterComponent.jsx"

function Index({t}) {
    const [chunks, setChunks] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(0)
    const [openForm, setOpenForm] = useState({show: false, id: ''})
    const appContext = useContext(AppContext)
    const [states, setStates] = useState({})
    const [ids, setIds] = useState(['root'])
    const [errors, setErrors] = useState({})//{name: [], path: []}
    const [state, setState] = useState(constState)

    const handlePagination = (currentStates) => {
        handlePaginationMethod(currentStates, setStates, setTotalPage, setChunks, t)
    }

    const paginate = (e, value) => {
        setPage(value - 1)
    }

    const getStates = () => {
        getStatesMethod(appContext.handleError, setStates, handlePagination, setIds)
    }

    const getState = (id) => {
        if (id !== "") {
            getStateMethod(id, appContext, setState)
        }
    }

    const closeForm = () => {
        setOpenForm({id: "", show: false})
        setState(emptyState)
    }

    useEffect(() => {
        getStates()
    }, [])

    useEffect(() => {
        getState(openForm.id)
    }, [openForm.id])

    return (<StyledPaper>
        <Helmet>
            <title>
                {t('taxonomy:soundList')}
            </title>
        </Helmet>
        <StateHeaderComponent setOpenForm={setOpenForm}/>
        <StateTableComponent ids={ids}
                             setOpenForm={setOpenForm}
                             states={states}
                             chunks={chunks}
                             setChunks={setChunks}
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
                    state={state}
                    setState={setState}
                    setStates={setStates}
                    handleCloseForm={closeForm}/>
        <StyledPaginationBox>
            <Pagination count={(totalPage)} onChange={paginate}/>
        </StyledPaginationBox>
    </StyledPaper>)
}

export default withNamespaces('translation,taxonomy')(Index)
