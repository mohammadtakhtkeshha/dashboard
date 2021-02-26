import Highcharts from "highcharts";
import dashboardService from "core/services/dashboard.service";

export const highChartsRender = (t, dates, numberOfUser) => {
    Highcharts.chart('userchart', {
        chart: {
            type: 'line'
        },
        title: {
            text: t('users:usersStatistic')
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: dates
        },
        yAxis: {
            title: {
                text: 'لیست کاربران'
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
        series: [{
            name: 'تعداد کاربران',
            data: numberOfUser
        }]
    });
    Highcharts.color('red');
}

const setDatesAndNumberOfUsers = (t,setUsers, users) => {
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
    highChartsRender(t, dates, userCount);
};

export const getUsers = (t,setUsers,handleError) => {
    const result=dashboardService.getUsers(handleError);
    result.then((response) => {
        const sortedUserByDate = response.data.sort((a, b) => (a.created > b.created) ? 1 : -1);
        setDatesAndNumberOfUsers(t,setUsers, sortedUserByDate);
    });
}
