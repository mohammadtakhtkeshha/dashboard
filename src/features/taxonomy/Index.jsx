import React, { useContext, useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { Helmet } from 'react-helmet';

import TaxonomyTableComponent from './partials/TaxonomyTableComponent.jsx';
import AppContext from 'contexts/AppContext';
import { getTaxonomiesMethod } from './Index.js';

function Index({ t }) {
  const [taxonomies, setTaxonomies] = useState([]);
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    getTaxonomiesMethod(setLoading, setTaxonomies);
  }, [setLoading, setTaxonomies]); //Once

  return (
    <>
      <Helmet>
        <title>{t('taxonomy:categoryList')}</title>
      </Helmet>
      <TaxonomyTableComponent taxonomies={taxonomies} />
    </>
  );
}

export default withNamespaces('translation,taxonomy')(Index);
