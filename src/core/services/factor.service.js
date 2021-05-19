import { Method } from 'infrastructure/layout';
import { registerTermUrl } from 'utils/urls/term.urls';
import { aacaauthHeader, cmHeader } from 'utils/headers';

export const getFactors = (setLoading, clientId) => {
  let formData = new FormData();
  formData.append('userId', clientId);
  return Method({
    url: 'http://crm.webrbp.ir/listInvoices.php',
    method: 'post',
    headers: cmHeader,
    body: formData,
    setLoading: setLoading,
  });
};

export function registerTerm(term, setLoading) {
  return Method({
    url: registerTermUrl,
    method: 'post',
    headers: aacaauthHeader(),
    body: term,
    setLoading: setLoading,
  });
}
