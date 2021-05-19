import { getLastVisit, getLiveVisits } from 'core/services/matamo.service';

export const visitsDetailsMethod = (setLoading, setVisitsDetails) => {
  setLoading(true);
  const params = {
    module: 'API',
    method: 'Live.getLastVisitsDetails',
    idSite: '2',
    period: 'day',
    date: '2021-01-22',
    format: 'JSON',
    token_auth: '653b84ff84cdf3caee8d154809173949',
    force_api_session: '1',
  };
  getLastVisit(setLoading, params).then(response => {
    setLoading(false);
    let currentArray = [];
    for (let i = 0; i < 8; i++) {
      currentArray.push(response.data[i]);
    }
    setVisitsDetails(currentArray);
  });
};

export const get30MinutesVisitsMethod = (setLoading, setLast30Minutes) => {
  setLoading(true);
  const params = {
    module: 'API',
    method: 'Live.getCounters',
    idSite: '2',
    lastMinutes: '30',
    format: 'JSON',
    token_auth: '653b84ff84cdf3caee8d154809173949',
    force_api_session: '1',
  };
  getLiveVisits(setLoading, params).then(response => {
    setLoading(false);
    setLast30Minutes(response.data);
  });
};

export const get24OursVisitsMethod = (setLoading, setLast24Ours) => {
  setLoading(true);
  const params = {
    module: 'API',
    method: 'Live.getCounters',
    idSite: '2',
    lastMinutes: '1440',
    format: 'JSON',
    token_auth: '653b84ff84cdf3caee8d154809173949',
    force_api_session: '1',
  };
  getLiveVisits(setLoading, params).then(response => {
    setLoading(false);
    setLast24Ours(response.data);
  });
};
