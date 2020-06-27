import React, {useEffect} from 'react';
import Highcharts from 'highcharts';
import { Paper} from "@material-ui/core";
import axios from "axios";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    }
}));
export default function UserChartComponent() {
    const classes = useStyles();
    let getUsers = () => {
        let url = "http://sitesaz99.rbp/web/api/user/v2/dashboard/chart";
        axios.get(url).then((response) => {
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
                text: 'لیست کاربران'
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