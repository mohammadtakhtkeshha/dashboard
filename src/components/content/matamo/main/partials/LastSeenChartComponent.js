import Highcharts from "highcharts";
import {getLastSeen} from "core/services/matamo.service";

export const highChartsRender = (t, dates, numberOfLastSeens) => {
    Highcharts.chart('lastseenchart', {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: dates
        },
        yAxis: {
            title: {
                text: ''
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
            name: t('matamo:visits'),
            data: numberOfLastSeens
        }]
    });
    Highcharts.color('red');
}

const setDatesAndNumberOfLastSeen = (t, setLastSeen, lastSeens) => {
    let dates = [];
    let numberOflastSeens = [];
    let lastSeenArr=Object.entries(lastSeens)

    for (let item of lastSeenArr) {
       dates.push(item[0])
        if(item[1].length === 0){
            numberOflastSeens.push(0)
        }else{

            numberOflastSeens.push(item[1].nb_visits)
        }
    }
    setLastSeen(dates)
    highChartsRender(t, dates, numberOflastSeens);
};

export const getLastSeenMethod = (t, setLastSeen, appContext) => {

    const params = {
        'date': '2017-01-01,2021-12-31',
        'expanded' : 1,
        'force_api_session' : 1,
        'format' : 'JSON',
        'format_metrics' : 1,
        'idSite' : 2,
        'module' : 'API',
        'period' : 'year',
        'filter_limit' : -1,
        'method' : 'API.get',
        'token_auth' :'653b84ff84cdf3caee8d154809173949'
    }
    getLastSeen(appContext.handleError, params).then((response) => {
        setDatesAndNumberOfLastSeen(t, setLastSeen, response.data);
    });
}
