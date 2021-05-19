import Highcharts from 'highcharts';
import { getLastSeen } from 'core/services/matamo.service';
import i18next from 'i18next';

export const highChartsRender = (dates, numberOfLastSeens) => {
  if (numberOfLastSeens.length > 0) {
    Highcharts.chart('lastseenchart', {
      chart: {
        type: 'line',
      },
      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: dates,
      },
      yAxis: {
        title: {
          text: '',
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: i18next.t('matamo:visits'),
          data: numberOfLastSeens,
        },
      ],
    });
    Highcharts.color('red');
  }
};

const setDatesAndNumberOfLastSeen = (setLastSeen, lastSeens) => {
  let dates = [];
  let numberOflastSeens = [];
  let lastSeenArr = Object.entries(lastSeens);

  for (let item of lastSeenArr) {
    dates.push(item[0]);
    if (item[1].length === 0) {
      numberOflastSeens.push(0);
    } else {
      numberOflastSeens.push(item[1].nb_visits);
    }
  }
  setLastSeen(dates);
  highChartsRender(dates, numberOflastSeens);
};

export const getLastSeenMethod = (setLastSeen, setLoading) => {
  const params = {
    date: '2017-01-01,2021-12-31',
    expanded: 1,
    force_api_session: 1,
    format: 'JSON',
    format_metrics: 1,
    idSite: 2,
    module: 'API',
    period: 'year',
    filter_limit: -1,
    method: 'API.get',
    token_auth: '653b84ff84cdf3caee8d154809173949',
  };
  getLastSeen(setLoading, params).then(response => {
    setDatesAndNumberOfLastSeen(setLastSeen, response.data);
  });
};
