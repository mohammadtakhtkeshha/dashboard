import { getSiteSearchKeywords } from 'core/services/matamo.service';
import { chunkItem, handleTotalPage } from 'infrastructure/layout';

export const handlePaginationMethod = (items, setChunks, setTotalPage, setMostSeen) => {
  setMostSeen(items);
  const chunks = chunkItem(items);
  setChunks(chunks);
  const totalPage = handleTotalPage(items);
  setTotalPage(totalPage);
};

export const getKeywordsMethod = (setLoading, handlePagination) => {
  setLoading(true);
  const params = {
    module: 'API',
    method: 'Actions.getSiteSearchKeywords',
    idSite: '2',
    period: 'range',
    date: '2021-01-22,2021-01-24',
    format: 'JSON',
    token_auth: '653b84ff84cdf3caee8d154809173949',
    force_api_session: '1',
  };
  getSiteSearchKeywords(setLoading, params).then(response => {
    setLoading(false);
    handlePagination(response.data);
  });
};
