import React, {useEffect} from 'react';
import Highcharts from 'highcharts';
import { Paper} from "@material-ui/core";
import dashboardService from "./../../../../core/services/dashboard.service";
import {makeStyles} from "@material-ui/styles";
import {withNamespaces} from "react-i18next";

const useStyles = makeStyles(theme => ({
    paper: {
        '& text':{
            fontFamily:'primary-font',
        },
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        '@media(max-width:992px)': {
            margin: `${theme.spacing(2)}px 0`,
        }
    }
}));
function UserChartComponent({t}) {
    const classes = useStyles();
    let getUsers = () => {
        dashboardService.getUsers().then((response) => {
            let sortUserByDate= response.data.sort((a,b)=>(a.created>b.created)?1:-1);
            setDatesAndNumberOfUsers(sortUserByDate);
        }).catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        getUsers();
    }, []);
    // ---------------- highchart --------------------

    let highChartsRender = (dates,numberOfUser) => {
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
    };
    useEffect(() => {
        highChartsRender();
    }, []);
    // ----------------- end highchart --------------------



    let customizeByDate = (users) => {
        return users.reduce((initial,current)=>{
            if(!initial[current.created]){
                initial[current.created]=[];
            }
            initial[current.created].push(current);
            return initial;
        },{});

    };
    let setDatesAndNumberOfUsers = (users) => {
        let sortByDate=Object.entries(customizeByDate(users));
        let dates=[];
        let numberOfUsers=[];
        for(let item of sortByDate){
            dates.push(item[0]);
            numberOfUsers.push(item[1].length);
        }

        highChartsRender(dates,numberOfUsers);
    };

    return (
        <Paper className={classes.paper}>
            <figure className="highcharts-figure">
                <div id="userchart"></div>
            </figure>
        </Paper>
    );
}
export default withNamespaces('users')(UserChartComponent);