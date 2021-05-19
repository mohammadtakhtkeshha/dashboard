import { getTaxonomies } from 'core/services/taxonomy/taxonomy.service';

export const getTaxonomiesMethod = (setLoading, setTaxonomies) => {
  setLoading(true);
  getTaxonomies(setLoading).then(response => {
    setLoading(false);
    const taxonomies = response.data;
    setTaxonomies(taxonomies);
  });
};
