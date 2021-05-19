import React, { useContext, useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';

import { getFactorsMethod } from './FactorsComponent.js';
import AppContext from 'contexts/AppContext';
import FactorsTableComponent from './partials/FactorsTableComponent.jsx';
import { get } from 'libraries/local-storage';

function FactorsComponent({ t }) {
  const { setLoading } = useContext(AppContext);
  const [factors, setFactors] = useState([]);
  const clientId = get(process.env.REACT_APP_USER_CLIENT_ID);

  useEffect(() => {
    getFactorsMethod(setLoading, setFactors, clientId);
  }, [clientId, setLoading]); //clientId

  return (
    <>
      <FactorsTableComponent factors={factors} />
    </>
  );
}

export default withNamespaces('tickets, translation')(FactorsComponent);
