import React, {useEffect} from "react";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Highcharts from 'highcharts';
import moment from 'jalali-moment';
import './../../../../assets/css/yekanFont.css';
import dashboardService from "./../../../../core/services/dashboard.service";


const useStyles = makeStyles((theme) => (
    {
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
    }
));

export default function CommentsChartComponent() {
    const classes = useStyles();
    let getCommentChart = () => {
        dashboardService.getCommentChart().then((response) => {
            let comments = response.data;
            let sortCommentsByDate = comments.sort((a, b) => (a.created > b.created) ? 1 : -1);
            getCustomComment([...sortCommentsByDate]);

        }).catch((error) => {
        });
    };
    useEffect(() => {
        getCommentChart();
    }, []);

    let getCustomComment = (comments) => {
        sortCommentByDate(comments);
        let sortedCommentsByDate = sortCommentByDate(comments);
        getDateAndNumberOfCumments(sortedCommentsByDate);
    };
    let sortCommentByDate = (mycomments) => {
        return mycomments.reduce((initial, current) => {
            let customDate = current.created.substr(0, 7);
            if (!initial[customDate]) {
                initial[customDate] = [];
            }
            initial[customDate].push(current);
            return initial;
        }, {});
    };
    let getDateAndNumberOfCumments = (sortedComment) => {
        let arrayOfSortedComment = Object.entries(sortedComment);
        let arrayOfDates = [];
        let arrayOfBlockComments = [];
        let arrayOfConfirmComments = [];
        for (let comment of arrayOfSortedComment) {
            let date = getYearAndMonth(comment[0]);
            arrayOfDates.push(date);
            sortCommentByStatus(comment[1]);
            let sorted = Object.entries(sortCommentByStatus(comment[1]));
            if (sorted.length === 1) {
                for (let value of sorted) {
                    if (value[0] === 'confirm') {
                        arrayOfBlockComments.push(0);
                        arrayOfConfirmComments.push(value[1].length);
                    } else {

                        arrayOfBlockComments.push(value[1].length);
                        arrayOfConfirmComments.push(0);
                    }
                }
            } else {
                let confirm = 0;
                let block = 0;
                for (let item of sorted) {
                    if (item[0] === 'confirm') {
                        confirm = item[1].length;
                    } else {
                        block = item[1].length;
                    }
                }
                arrayOfBlockComments.push(block);
                arrayOfConfirmComments.push(confirm);
            }

        }
        highChartsRender(arrayOfDates, arrayOfConfirmComments, arrayOfBlockComments);
    }
    let sortCommentByStatus = (newComm) => {
        return newComm.reduce((initial, current) => {
            let key;
            if (current.status === "true") {
                key = 'confirm'
            } else {
                key = 'block'
            }
            if (!initial[key]) {
                initial[key] = [];
            }
            initial[key].push(current);
            return initial;
        }, {});
    }

    // --------------------- high charts -----------------------
    let highChartsRender = (dates, confirmComment, blockedComment) => {
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

    // --------------------- End high chart ----------------------


    let getYearAndMonth = (dates) => {
        let getYear = dates.substr(0, 4);
        let m = moment(getYear, 'YYYY');
        let sal = m.jYear();
        let getMonth = dates.substr(5, 2);
        let mah = convertMonthToFa(getMonth);
        return `${sal} ${mah}`;
    };

    let convertMonthToFa = (month) => {
        let mah;
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
        return mah;

    };

    return (
        <>
            <Paper className={classes.paper}>
                <figure className="highcharts-figure">
                    <div id="commentchart"></div>
                </figure>
            </Paper>
        </>
    );

}


