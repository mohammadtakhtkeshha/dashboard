import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces} from 'react-i18next';

import WebformsTableComponent from './partials/list/FormsTableComponent.jsx';
import FormsFilterComponent from './partials/FormsFilterComponent';
import AddWebformModalComponent from './partials/modal/Index.jsx';
import FormHeaderComponent from './partials/header/FormHeaderComponent.jsx';
import {StyledBox} from 'assets/js/library/base/box';

function Index({t}) {
    const [openWebform, setOpenWebform] = useState(false);
    const [errors, setErrors] = useState({}); //errorName: {},errorPass: {},specialChar: {},errorMail: {},confirmPass: {}
    const [expandedFilter, setExpandedFilter] = useState(false);
    const [forms, setForms] = useState([])
    const [isEditForm, setIsEditForm] = useState(false)
    const [basicForms, setBasicForms] = useState([]);
    const [webform, setWebform] = useState({
        "form_id": "",
        "description": "",
        "title": "",
        "status": 'closed'
    });

    const closeForm = () => {
        setOpenWebform(false);
        setErrors({});
        setWebform({
            "form_id": "",
            "description": "",
            "title": "",
            "status": 'closed'
        })
    };

    return (<>
        <Helmet>
            <title>{t('sidebar:forms')}</title>
        </Helmet>
        <FormHeaderComponent
            isEditForm={isEditForm}
            setIsEditForm={setIsEditForm}
            setOpenWebform={setOpenWebform}
            setExpandedFilter={setExpandedFilter}
        />
        <StyledBox>
            <FormsFilterComponent
                expandedFilter={expandedFilter}
                setExpandedFilter={setExpandedFilter}
                setForms={setForms}
                forms={forms}
                basicForms={basicForms}
            />
        </StyledBox>
        <WebformsTableComponent
            forms={forms}
            setForms={setForms}
            setBasicForms={setBasicForms}
            setOpenWebform={setOpenWebform}
            setWebform={setWebform}
            setIsEditForm={setIsEditForm}
        />
        <AddWebformModalComponent
            closeForm={closeForm}
            openWebform={openWebform}
            errors={errors}
            setErrors={setErrors}
            webform={webform}
            setWebform={setWebform}
            isEditForm={isEditForm}
            setForms={setForms}
        />
    </>);
}

export default withNamespaces('users')(Index);
