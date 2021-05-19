import Highcharts from 'highcharts';
import { getUsers } from 'core/services/dashboard.service';
import { toShamsiDate } from 'methods/commons';
import i18next from 'i18next';

export const highChartsRender = (dates, numberOfUser) => {
  Highcharts.chart('userchart', {
    chart: {
      type: 'line',
    },
    title: {
      text: i18next.t('users:usersStatistic'),
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: dates,
    },
    yAxis: {
      title: {
        text: i18next.t('users:usersList'),
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
        name: i18next.t('users:usersNum'),
        data: numberOfUser,
      },
    ],
  });
  Highcharts.color('red');
};

const setDatesAndNumberOfUsers = (setUsers, users, lang) => {
  let dates = [];
  let numberOfUsers = [];
  for (let item of users) {
    dates.push(item.date);
    numberOfUsers.push(item.number);
  }
  setUsers(numberOfUsers);
  let userCount = [];
  for (let number of numberOfUsers) {
    userCount.push(parseInt(number));
  }
  let shamsiDates = [];
  for (let date of dates) {
    shamsiDates.push(toShamsiDate(date));
  }
  let formatedDates = lang === 'en' ? dates : shamsiDates;
  formatedDates.length > 0 && highChartsRender(formatedDates, userCount);
};

export const getUsersMethod = (setUsers, setLoading, lang) => {
  const result = getUsers(setLoading);
  result.then(response => {
    const currentUsers = response.data;
    const sortedUserByDate = currentUsers.sort((a, b) => (a.created > b.created ? 1 : -1));
    setDatesAndNumberOfUsers(setUsers, sortedUserByDate, lang);
  });
};
