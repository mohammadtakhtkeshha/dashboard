import React, {useContext, useEffect, useState} from "react"
import {withNamespaces} from "react-i18next"
import {Helmet} from "react-helmet"
import ModalState from "./partials/modal/Index.jsx"

import AppContext from "contexts/AppContext"
import {getCategoryMethod, constState, emptyCategory, getStatesMethod} from "./Index.js"
import StateTableComponent from "./partials/StateTableComponent.jsx"
import StateHeaderComponent from "./partials/StateHeaderComponent.jsx"
import {useParams} from "react-router-dom";

function Index({t}) {
    const [openForm, setOpenForm] = useState({show: false, id:''})
    const appContext = useContext(AppContext)
    const [states, setStates] = useState({})
    const [errors, setErrors] = useState({})//{name: [], path: []}
    const type = useParams()
    console.log(type.type)
    const [category, setCategory] = useState(constState(type.type))
    console.log(category.vid[0].target_id)


    const getStates = () => {
        getStatesMethod(appContext.handleError, setStates,type)
    }

    const getCategory = (id) => {
        if (id !== "") {
            getCategoryMethod(id, appContext, setCategory)
        }
    }

    const closeForm = () => {
        setOpenForm({id:"", show: false})
        setErrors({})
        setCategory(constState(type.type))
    }

    useEffect(() => {
        getStates()
    }, [])

    useEffect(() => {
        getCategory(openForm.id)
    }, [openForm.id])

    return (<>
        <Helmet>
            <title>
                {t('taxonomy:categoryList')}
            </title>
        </Helmet>
        <StateHeaderComponent setOpenForm={setOpenForm} type={type}/>
        <StateTableComponent setOpenForm={setOpenForm}
                             states={states}
                             type={type}
                             getStates={getStates}
                             setStates={setStates}/>
        <ModalState states={states}
                    openForm={openForm}
                    setOpenForm={setOpenForm}
                    setErrors={setErrors}
                    errors={errors}
                    closeForm={closeForm}
                    category={category}
                    getStates={getStates}
                    type={type}
                    setCategory={setCategory}
                    setStates={setStates}
                    handleCloseForm={closeForm}/>
    </>)
}

export default withNamespaces('translation,taxonomy')(Index)
