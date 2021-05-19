import { Method } from 'infrastructure/layout';
import { aacaauthHeader, chahauthHeader } from 'utils/headers';
import { registerTermUrl, deleteTermUrl } from 'utils/urls/term.urls';

export function registerTerm(term, setLoading) {
  return Method({
    url: registerTermUrl,
    method: 'post',
    headers: aacaauthHeader(),
    body: term,
    setLoading: setLoading,
  });
}

export function deleteTermService(id, setLoading) {
  return Method({
    url: deleteTermUrl(id),
    method: 'delete',
    headers: chahauthHeader(),
    setLoading: setLoading,
  });
}

export default { registerTerm, deleteTermService };
