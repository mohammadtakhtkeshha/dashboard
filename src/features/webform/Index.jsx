import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces} from 'react-i18next';

import WebformsTableComponent from './partials/WebformsTableComponent.jsx';
import FormsFilterComponent from './partials/FormsFilterComponent';
import AddWebformModalComponent from './partials/modal/Index.jsx';
import UsersHeaderComponent from './partials/header/FormHeaderComponent.jsx';
import {StyledBox} from 'assets/js/App';

function Index({t}) {
    const [openWebform, setOpenWebform] = useState(false);
    const [errors, setErrors] = useState({}); //errorName: {},errorPass: {},specialChar: {},errorMail: {},confirmPass: {}
    const [expandedFilter, setExpandedFilter] = useState(false);
    const [forms, setForms] = useState([])
    const [basicForms, setBasicForms] = useState([])

    const closeForm = () => {
        setOpenWebform(false);
        setErrors({});
    };

    return (
        <>
            <Helmet>
                <title>{t('sidebar:forms')}</title>
            </Helmet>
            <UsersHeaderComponent setOpenWebform={setOpenWebform} setExpandedFilter={setExpandedFilter}/>
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
            />
            <AddWebformModalComponent
                closeForm={closeForm}
                openWebform={openWebform}
                errors={errors}
                setErrors={setErrors}
            />
        </>
    );
}

export default withNamespaces('users')(Index);
