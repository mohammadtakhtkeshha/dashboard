import Highcharts from "highcharts";
import {getUsers} from "core/services/dashboard.service";
import { toShamsiDate} from "methods/commons";

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
            categories: dates,
        },
        yAxis: {
            title: {
                text: t('users:usersList')
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
            name: t('users:usersNum'),
            data: numberOfUser,
        }]
    });
    Highcharts.color('red');
}

const setDatesAndNumberOfUsers = (t, setUsers, users, lang) => {
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
    let shamsiDates = []
    for (let date of dates) {
        shamsiDates.push(toShamsiDate(date))
    }
    let formatedDates = lang === "en" ? dates : shamsiDates
    formatedDates.length>0 && highChartsRender(t, formatedDates, userCount);

};

export const getUsersMethod = (t, setUsers, handleError, lang) => {
    const result = getUsers(handleError);
    result.then((response) => {
        const currentUsers = response.data
        const sortedUserByDate = currentUsers.sort((a, b) => (a.created > b.created) ? 1 : -1);
        setDatesAndNumberOfUsers(t, setUsers, sortedUserByDate, lang);
    });
}
