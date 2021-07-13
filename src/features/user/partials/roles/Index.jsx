import React, {useEffect, useContext, useState} from 'react';
import {withNamespaces} from 'react-i18next';

import {getPermissionsMethod, getRolesMethod, constRole, defaultConstRole} from './Index.js';
import AppContext from 'contexts/AppContext';
import RoleHeaderComponent from './partials/RoleHeaderComponent.jsx';
import RoleTableComponent from './partials/RoleTableComponent.jsx';
import RoleModalComponent from './partials/modal/RoleModalComponent.jsx';

function Index() {
    const {setLoading} = useContext(AppContext);
    const [permissions, setPermissions] = useState([]);
    const [openForm, setOpenForm] = useState({show: false, id: ''});
    const [role, setRole] = useState(constRole);
    const [faRoles, setFaRoles] = useState([]);
    const [enRoles, setEnRoles] = useState([]);
    const [showPermission, setShowPermission] = useState([]);

    useEffect(() => {
        getPermissionsMethod(setLoading, setPermissions);
    }, [setLoading, setPermissions]); //Once

    useEffect(() => {
        getRolesMethod(setLoading, setFaRoles, setEnRoles);
    }, [setLoading, setFaRoles, setEnRoles]); //Once

    const handleClose = async () => {
        await setOpenForm({show: false, id: ''});
        setRole(defaultConstRole);
    };

    return (
        <>
            <RoleHeaderComponent setOpenForm={setOpenForm}/>
            <RoleTableComponent
                openForm={openForm}
                setOpenForm={setOpenForm}
                role={role}
                setRole={setRole}
                faRoles={faRoles}
                enRoles={enRoles}
                setShowPermission={setShowPermission}
                permissions={permissions}
                setEnRoles={setEnRoles}
                setFaRoles={setFaRoles}
            />
            <RoleModalComponent
                openForm={openForm}
                permissions={permissions}
                role={role}
                faRoles={faRoles}
                setFaRoles={setFaRoles}
                setEnRoles={setEnRoles}
                enRoles={enRoles}
                setPermissions={setPermissions}
                setRole={setRole}
                setShowPermission={setShowPermission}
                showPermission={showPermission}
                handleClose={handleClose}
            />
        </>
    );
}

export default withNamespaces('translation')(Index);
