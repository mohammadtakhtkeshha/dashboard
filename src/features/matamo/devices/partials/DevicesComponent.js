import { getDevices, getModelDevices, getResolution } from 'core/services/matamo.service';
import { chunkItem, handleTotalPage } from 'infrastructure/layout';

export const handlePaginationMethod = (items, setChunks, setTotalPage) => {
  const chunks = chunkItem(items);
  setChunks(chunks);
  const totalPage = handleTotalPage(items);
  setTotalPage(totalPage);
};

export const getDevicesMethod = (setLoading, setDevices, handlePagination) => {
  const params = {
    module: 'API',
    method: 'DevicesDetection.getType',
    idSite: '2',
    period: 'day',
    date: 'yesterday',
    format: 'JSON',
    token_auth: '653b84ff84cdf3caee8d154809173949',
    force_api_session: '1',
  };
  setLoading(true);
  getDevices(setLoading, params).then(response => {
    setLoading(false);
    setDevices(response.data);
    handlePagination(response.data);
  });
};

export const getModelDevicesMethod = (setLoading, setModels, handlePagination) => {
  const params = {
    module: 'API',
    method: 'DevicesDetection.getModel',
    idSite: '1',
    period: 'year',
    date: 'today',
    format: 'JSON',
    token_auth: '653b84ff84cdf3caee8d154809173949',
    force_api_session: '1',
  };
  setLoading(true);
  getModelDevices(setLoading, params).then(response => {
    setLoading(false);
    handlePagination(response.data);
    setModels(response.data);
  });
};

export const getResolutionMethod = (setLoading, setResolutions, handlePagination) => {
  const params = {
    module: 'API',
    method: 'Resolution.getResolution',
    idSite: '1',
    period: 'year',
    date: 'today',
    format: 'JSON',
    token_auth: '653b84ff84cdf3caee8d154809173949',
    force_api_session: '1',
  };
  setLoading(true);
  getResolution(setLoading, params).then(response => {
    setLoading(false);
    setResolutions(response.data);
    handlePagination(response.data);
  });
};
