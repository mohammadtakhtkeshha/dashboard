import { Method } from 'infrastructure/layout';

export const baseUrlMatamo = 'https://foroshgahsaz.ir/matomo/index.php';

export const getSiteSearchKeywords = (setLoading, params) => {
  return Method({ method: 'GET', url: baseUrlMatamo, setLoading: setLoading, params: params });
};

export const getLiveVisits = (setLoading, params) => {
  return Method({ method: 'get', url: baseUrlMatamo, setLoading: setLoading, params: params });
};

export const getDevices = (setLoading, params) => {
  return Method({ method: 'GET', url: baseUrlMatamo, params: params, setLoading: setLoading });
};

export const getModelDevices = (setLoading, params) => {
  return Method({ method: 'GET', url: baseUrlMatamo, params: params, setLoading: setLoading });
};

export const getResolution = (setLoading, params) => {
  return Method({ method: 'GET', url: baseUrlMatamo, params: params, setLoading: setLoading });
};

export const getLastVisit = (setLoading, params) => {
  return Method({ method: 'get', url: baseUrlMatamo, setLoading: setLoading, params: params });
};

export const getVisitsSummary = setLoading => {
  return Method({ method: 'get', url: baseUrlMatamo, setLoading: setLoading });
};

export const mostVisited = (setLoading, params) => {
  return Method({ method: 'get', url: baseUrlMatamo, setLoading: setLoading, params: params });
};

export const getLastSeen = (setLoading, params) => {
  return Method({ method: 'get', url: baseUrlMatamo, setLoading: setLoading, params: params });
};