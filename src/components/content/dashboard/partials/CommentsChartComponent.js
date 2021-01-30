import Highcharts from "highcharts";
import dashboardService from "core/services/dashboard.service";

const highChartsRender = (dates, confirmComment, blockedComment) => {
    Highcharts.chart('commentchart', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'تعداد کامنت ها در ماه'
        },
        subtitle: {
            text: ' '
        },
        xAxis: {
            categories: dates
        },
        yAxis: {
            title: {
                text: 'تعداد کامنت ها'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [
            {
                name: 'تایید شده',
                data: confirmComment
            }, {
                name: 'بلاک شده',
                data: blockedComment
            }]
    });
};

export const getCommentChart = (setComments,handleError) => {
    dashboardService.getCommentChart(handleError).then((response) => {
        let currentComments = response.data;
        setComments(currentComments);
        let sortCommentsByDate = currentComments.sort((a, b) => (a.created > b.created) ? 1 : -1);
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
        setDateArray.map(function (item, index) {
            dates.push(item[0]);
            let num1=0;
            let num2=0;
            item[1].map(function (current, index) {//the same date
                if (current.status === "confirmed") {
                    num1++;
                } else {
                    num2++;
                }
            });
            confimedArr.push(num1);
            unConfimedArr.push(num2);
        });
        highChartsRender(dates,confimedArr,unConfimedArr);
    }).catch((error) => {
    });

};
