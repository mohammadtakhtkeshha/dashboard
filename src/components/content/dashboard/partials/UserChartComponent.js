import React, {useEffect, useState} from 'react';

// import moment from 'jalali-moment';
import Highcharts from 'highcharts';

import {Box,Typography,Grid,Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
const useStyles=makeStyles(theme=>({
    paper:{
        padding:theme.spacing(2),
        margin:theme.spacing(2),
    }
}));
export default function TestComponent() {
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
    });
    // ----------------- end highchart --------------------
    const classes=useStyles();
    const users = [
        {id: '1', name: 'one', date: '1990/05/13'},
        {id: '2', name: 'two', date: '1990/02/01'},
        {id: '3', name: 'three', date: '1990/02/11'},
        {id: '4', name: 'behnaz', date: '1990/04/20'},
        {id: '5', name: 'akbar', date: '1990/11/15'},
        {id: '6', name: 'shahin', date: '1990/04/14'},
        {id: '7', name: 'shahin', date: '1990/04/14'},
        {id: '8', name: 'monir', date: '1990/06/9'},
        {id: '9', name: 'somaye', date: '1990/12/7'},
    ];
    const [data , setData]=useState([]);

    useEffect(() => {
        setData(custom());
    }, []);

    let numberOfUserWithSameDate = () => {
        return users.reduce((initial, currentValue) => {
            let date = currentValue.date;
            let month = date.substr(0, 7);
            if (!initial[month]) {
                initial[month] = {name:month,uv:1,pv: 2400, amt: 2400};
            }else{
                initial[month].uv++;
                // initial[month].pv++;
                // initial[month].amt++;
            }
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

    let custom=()=>{
        let arr=Object.entries(numberOfUserWithSameDate());
        let newArr=[];
        for(let item of arr){
            for(let part of item){
                if(typeof part === 'object'){
                    part.name=getDateOfUser(part.name);
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