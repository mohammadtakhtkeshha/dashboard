import React, {useEffect, useState} from 'react';
import moment from 'jalali-moment';
import Highcharts from 'highcharts';
import {Box, Typography, Grid, Paper} from "@material-ui/core";
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
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers(custom());
    }, []);
    // ---------------- highchart --------------------


    let highChartsRender = () => {
        Highcharts.chart('userchart', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
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
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
    };
    useEffect(() => {
        highChartsRender();
    }, []);
    // ----------------- end highchart --------------------


    let getUsers = () => {
        let url = "http://sitesaz99.rbp/web/api/user/v2/dashboard";
        axios.get(url).then((response) => {
            // created: "2020-06-22"
            let sortUserByDate= response.data.sort((a,b)=>(a.created>b.created)?1:-1);
            customizeByDate(sortUserByDate);
        }).catch((error) => {
            console.log(error)
        });


    };

    let customizeByDate = (users) => {
        getUserByDate(users);
        let getUser=Object.entries(getDateOfUser(users));
        for(let user of getUser){
            // let dates
        }

    }
    let getUserByDate = (users) => {
        return users.reduce((initial, currentValue) => {
            let date = currentValue.created;
            let month = date.substr(5, 2);
            if (!initial[month]) {
                initial[month] = [];
            }
            initial[month].push(currentValue);
            return initial;
        }, {});
    };

    let getDateOfUser = (date) => {
        let mah;
        let year;
        let month;
        year = date.substr(0, 4);
        month = date.substr(5, 2);
        switch (month) {
            case '01':
                mah = 'فروردین';
                break;
            case '02':
                mah = 'اردیبهشت';
                break;
            case '03':
                mah = 'خرداد';
                break;
            case '04':
                mah = 'تیر';
                break;
            case '05':
                mah = 'مرداد';
                break;
            case '06':
                mah = 'شهریور';
                break;
            case '07':
                mah = 'مهر';
                break;
            case '08':
                mah = 'آبان';
                break;
            case '09':
                mah = 'آذر';
                break;
            case '10':
                mah = 'دی';
                break;
            case '11':
                mah = 'بهمن';
                break;
            case '12':
                mah = 'اسفند';
        }

        return (`${year} ${mah}`);
    }

    let custom = () => {
        let arr = Object.entries(numberOfUserWithSameDate());
        let newArr = [];
        for (let item of arr) {
            for (let part of item) {
                if (typeof part === 'object') {
                    part.name = getDateOfUser(part.name);
                    newArr.push(part);
                }
            }
        }
        return newArr;
    };

    return (
        <Paper className={classes.paper}>
            <figure className="highcharts-figure">
                <div id="userchart"></div>
                <p className="highcharts-description">
                    This chart shows how data labels can be added to the data series. This
                    can increase readability and comprehension for small datasets.
                </p>
            </figure>
        </Paper>
    );
}