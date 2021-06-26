import Highcharts from 'highcharts';
import { getCommentChart } from 'core/services/dashboard.service';
import { toMiladiDate } from 'methods/commons';
import i18next from 'i18next';

const highChartsRender = (dates, confirmComment, blockedComment) => {
  Highcharts.chart('commentchart', {
    chart: {
      type: 'line',
    },
    title: {
      text: i18next.t('comments:commentInMonth'),
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: dates,
    },
    yAxis: {
      title: {
        text: i18next.t('comments:commentsNum'),
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
        name: i18next.t('translation:confirmed'),
        data: confirmComment,
      },
      {
        name: i18next.t('translation:block'),
        data: blockedComment,
      },
    ],
  });
};

export const getCommentChartMethod = (setComments, setLoading, lang) => {
  getCommentChart(setLoading).then(response => {
    let currentComments = response.data;
    setComments(currentComments);
    let sortCommentsByDate = currentComments.sort((a, b) => (a.created > b.created ? 1 : -1));
    let dates = [];
    const result = sortCommentsByDate.reduce((initial, current) => {
      let customDate = current.created;
      if (!initial[customDate]) {
        initial[customDate] = [];
      }
      initial[customDate].push(current);
      return initial;
    }, {});
    const setDateArray = Object.entries(result);
    let confimedArr = [];
    let unConfimedArr = [];
    setDateArray.forEach(item => {
      dates.push(item[0]);
      let num1 = 0;
      let num2 = 0;
      item[1].forEach(current => {
        if (current.status === 'confirmed') {
          num1++;
        } else {
          num2++;
        }
      });
      // item[1].map(function (current, index) {//the same date
      //     if (current.status === "confirmed") {
      //         num1++
      //     } else {
      //         num2++
      //     }
      // })
      confimedArr.push(num1);
      unConfimedArr.push(num2);
    });
    // setDateArray.map(function (item, index) {
    //     dates.push(item[0])
    //     let num1 = 0
    //     let num2 = 0
    //     item[1].map(function (current, index) {//the same date
    //         if (current.status === "confirmed") {
    //             num1++
    //         } else {
    //             num2++
    //         }
    //     })
    //     confimedArr.push(num1)
    //     unConfimedArr.push(num2)
    // })
    let miladiDates = [];
    for (let date of dates) {
      miladiDates.push(toMiladiDate(date));
    }
    let formatedDates = lang === 'en' ? miladiDates : dates;
    formatedDates.length > 0 && highChartsRender(formatedDates, confimedArr, unConfimedArr);
  });
};
