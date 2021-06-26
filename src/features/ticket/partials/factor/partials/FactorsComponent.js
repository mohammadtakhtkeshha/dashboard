import { getFactors } from 'core/services/factor.service';

export const getFactorsMethod = (setLoading, setFactors, clientId) => {
  setLoading(true);
  getFactors(setLoading, clientId).then(response => {
    setLoading(false);
    let factors = response.data.invoices.invoice.length > 0 ? response.data.invoices.invoice : [];
    setFactors(factors);
  });
};
