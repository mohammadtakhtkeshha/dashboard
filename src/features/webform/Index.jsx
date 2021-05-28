import React, {useState, useContext} from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces} from 'react-i18next';

import Pagination from '@material-ui/lab/Pagination';

import WebformsTableComponent from './partials/WebformsTableComponent.jsx';
import FormsFilterComponent from './partials/FormsFilterComponent';
import AddWebformModalComponent from './partials/modal/Index.jsx';
import UsersHeaderComponent from './partials/header/UserHeaderComponent.jsx';
import {StyledBox} from 'assets/js/App';
import {StyledPaginationBox} from 'assets/js/pagination';
import AppContext from 'contexts/AppContext';
import {
    constUser,
    handlePaginationMethod,
    getUsersMethod,
    getRolesMethod,
    getEditedUserMethod,
    getRegisteredUserMethod
} from './Index.js';

function Index({t}) {
    const {setLoading} = useContext(AppContext);
    const [element, setElement] = useState({})
    const [openWebform, setOpenWebform] = useState(false);
    const [errors, setErrors] = useState({}); //errorName: {},errorPass: {},specialChar: {},errorMail: {},confirmPass: {}
    const [expandedFilter, setExpandedFilter] = useState(false);

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
                />
            </StyledBox>
            <WebformsTableComponent
                setOpenWebform={setOpenWebform}
                openWebform={openWebform}
            />
            <AddWebformModalComponent
                setElement={setElement}
                closeForm={closeForm}
                openWebform={openWebform}
                errors={errors}
                setErrors={setErrors}
            />
        </>
    );
}

export default withNamespaces('users')(Index);
