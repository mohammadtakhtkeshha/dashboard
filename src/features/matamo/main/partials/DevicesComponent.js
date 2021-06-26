import { getDevices } from 'core/services/matamo.service';

export const getDevicesMethod = (setLoading, setDevices) => {
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
    let device = response.data;
    let tenNumberOfDevices = [];
    for (let i = 0; i < 10; i++) {
      let logo = device[i].logo.split('/').pop();
      let obj = { label: device[i].label, nb_visits: device[i].nb_visits, logo: logo };
      tenNumberOfDevices.push(obj);
    }
    setDevices(tenNumberOfDevices);
  });
};
