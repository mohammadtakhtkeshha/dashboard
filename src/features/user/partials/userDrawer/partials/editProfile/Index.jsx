import React, { useState, useContext, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import { Helmet } from 'react-helmet';

import EditProfileHeaderComponent from './partials/header/EditProfileHeaderComponent';
import EditProfileFormComponent from './partials/EditProfileFormComponent.jsx';
import { StyledBox } from 'assets/js/library/base/box';
import { constUser, getUserMethod } from './partials/EditProfileFormComponent.js';
import { get } from 'libraries/local-storage';
import AppContext from 'contexts/AppContext';

function EditProfileComponent({ t }) {
  const [user, setUser] = useState(constUser);
  const currentUser = JSON.parse(get(process.env.REACT_APP_USER));
  const [defaultRoles, setDefaultRoles] = useState([]);
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    getUserMethod(setLoading, currentUser.id, setUser, setDefaultRoles);
  }, [currentUser.id, setLoading, setUser, setDefaultRoles]); //change by currentUser.id

  return (
    <>
      <Helmet>
        <title>{t('sidebar:editProfile')}</title>
      </Helmet>
      <StyledBox>
        <EditProfileHeaderComponent user={user} setUser={setUser} />
        <EditProfileFormComponent user={user} setUser={setUser} defaultRoles={defaultRoles} setDefaultRoles={setDefaultRoles} />
      </StyledBox>
    </>
  );
}

export default withNamespaces('sidebar')(EditProfileComponent);
