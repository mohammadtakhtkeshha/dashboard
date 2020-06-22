import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import {makeStyles} from "@material-ui/styles";
import moment from 'jalali-moment';

import axios from "axios";
import {GraphicEqTwoTone} from "@material-ui/icons";


export default function Donut() {

    const [comments, setComments] = useState([]);
    const [yearAndMonth, setYearAndMonth] = useState([]);
    const [blockedComment, setBlockedComment] = useState([]);
    const [confirmComment, setConfirmComment] = useState([]);
    const [dateOfComment, setDateOfComment] = useState([]);
    const [numberOfBlockComment, setNumberOfBlockComment] = useState([]);
    const [numberOfConfirmComment, setNumberOfConfirmComment] = useState([]);


    useEffect(() => {
        getTenNumberOfComments();
    }, []);

    let getTenNumberOfComments = () => {
        // let url = 'http://sitesaz99.rbp/web/api/comment/v2/dashboard';
        let url = 'http://sitesaz99.rbp/web/last_comment/chart?_format=json';
        axios.get(url).then((response) => {
            let comments = response.data;
            setComments([...comments]);
            numberOfCommentInSameDate([...comments]);
            highChartsRender();
            // setYearAndMonth(getYearAndMonth());
        }).catch((error) => {
            console.log(error);
        });
    };


    let numberOfCommentInSameDate = (comments) => {
        let customArrayComment = sortCommentsByStatus(comments);
        sortCommentByDate(customArrayComment);
    };
    let sortCommentsByStatus = (mycomments) => {
        return mycomments.reduce((initial, current) => {
            if (current.status === "true") {
                if (!initial['confirmed']) {
                    initial['confirmed'] = [];
                }
                initial['confirmed'].push(current);
            } else {
                if (!initial['block']) {
                    initial['block'] = [];
                }
                initial['block'].push(current);
            }
            return initial;
        }, {});
    };

    let sortCommentByDate = (customArrayComment) => {
        let blockComment = customArrayComment['block'];
        let confirmedComment = customArrayComment['confirmed'];
        sortConfirmedCommmentByDate(confirmedComment);
        sortBlockedCommmentByDate(blockComment);
        setBlockedComment(Object.entries(sortBlockedCommmentByDate(blockComment)));
        setConfirmComment(Object.entries(sortConfirmedCommmentByDate(confirmedComment)));
        let blockCommentByDate = sortBlockedCommmentByDate(blockComment);
        let confirmCommentByDate = sortBlockedCommmentByDate(confirmedComment);
        getNumberComment(blockCommentByDate,confirmCommentByDate);
        // getDateConfirmComment(confirmCommentByDate);
    };
    let sortConfirmedCommmentByDate = (confirmed) => {
        return confirmed.reduce((initial, current) => {
            let date = current.created;
            let month = date.substr(5, 2);
            if (!initial[month]) {
                initial[month] = [];
            }
            initial[month].push(current);
            return initial;
        }, {});
    };
    let sortBlockedCommmentByDate = (blocked) => {
        return blocked.reduce((initial, current) => {
            let date = current.created;
            let month = date.substr(5, 2);
            if (!initial[month]) {
                initial[month] = [];
            }
            initial[month].push(current);
            return initial;
        }, {});
    };
    let getNumberComment = (blockCommentByDate,confirmCommentByDate) => {
debugger
        let sortByDate= confirmCommentByDate.sort((a, b) => b - a);
        debugger
        let arrDate = [];
        let lengthBlockArr = [];
        for (let comment of blockCommentByDate) {
            let date= comment[0];
            let length = comment[1];
            if(!arrDate[date]){
                arrDate.push(date);
            }
            lengthBlockArr.push(length.length);
        }
        setDateOfComment(arrDate);
        setNumberOfBlockComment(lengthBlockArr);


        // for (let comment of confirmCommentByDate) {
        //     let title = comment[0];
        //     let length = comment[1];
        //     // if(){
        //     //
        //     // }
        //     arr.push(title);
        //     lengthArr.push(length.length);
        // }
        // setDateOfConfirmComment(arr);
        // setNumberOfConfirmComment(lengthArr);
        // return arr;/
        return arrDate;
    };

    // --------------------- high charts -----------------------
    let highChartsRender = () => {
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
                // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                categories: ["05","03","04","01","02","06"]
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
                    data: numberOfBlockComment
                }, {
                    name: 'بلاک شده',
                    data: numberOfConfirmComment
                }]
        });
    };

    // useEffect(() => {
    //     highChartsRender();
    // }, []);
    // --------------------- End high chart ----------------------
    console.log(numberOfConfirmComment);

    // let getYearAndMonth = () => {
    //     let dates = [];
    //     for (let comment of comments) {
    //         let date = comment.last_updated;
    //         let splitString = date.split("-");
    //         let joinArray = splitString.join("/");
    //         let jalaliDate = moment(joinArray, 'YYYY/M/D');
    //         let year = jalaliDate.jYear();
    //         let month = jalaliDate.jMonth();
    //         let myMonth = convertMonthToFa(month);
    //         dates.push(`${year} ${myMonth}`);
    //     }
    //     return dates;
    // };
    //
    // let convertMonthToFa = (month) => {
    //     let mah;
    //     switch (month) {
    //         case 1:
    //             mah = 'فروردین';
    //             break;
    //         case 2:
    //             mah = 'اردیبهشت';
    //             break;
    //         case 3:
    //             mah = 'خرداد';
    //             break;
    //         case 4:
    //             mah = 'تیر';
    //             break;
    //         case 5:
    //             mah = 'مرداد';
    //             break;
    //         case 6:
    //             mah = 'شهریور';
    //             break;
    //         case 7:
    //             mah = 'مهر';
    //             break;
    //         case 8:
    //             mah = 'آبان';
    //             break;
    //         case 9:
    //             mah = 'آذر';
    //             break;
    //         case 10:
    //             mah = 'دی';
    //             break;
    //         case 11:
    //             mah = 'بهمن';
    //             break;
    //         case 12:
    //             mah = 'اسفند';
    //     }
    //     return mah;
    //
    // };

    // console.log(yearAndMonth);
    return (
        <figure className="highcharts-figure">
            <div id="commentchart"></div>
            <p className="highcharts-description">
                This chart shows how data labels can be added to the data series. This
                can increase readability and comprehension for small datasets.
            </p>
        </figure>
    );
}

