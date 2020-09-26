import React, {useEffect, useState} from 'react';
import i18next from "i18next";

import makeStyles from "@material-ui/styles/makeStyles";
import LuxonUtils from '@date-io/luxon';
import {ThemeProvider} from '@material-ui/styles';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

import {myStyles, themeEnn, themeFaa} from "assets/js/partials/datePicker";
// ----------------------- jalali -------------------
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import {createMuiTheme} from '@material-ui/core/styles';

import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
// ----------------------- jalali -------------------
jMoment.loadPersian({dialect: "persian-modern", usePersianDigits: true});

const styles = makeStyles(myStyles);
const themeFa = createMuiTheme(themeFaa);
const themeEn = createMuiTheme(themeEnn);

function DatePickerrComponent({placeholder,passedDate,selectedDate,setSelectedDate}) {
    let lang = i18next.language;
    const classes = styles();

    const handleDateChange = (e) => {
        let date;
        if( e === null){
            date=null;
        }else{
            date=e.format();
        }
        setSelectedDate(date);
        passedDate(date);
    }


    useEffect(() => {
        setSelectedDate(selectedDate);
    }, [selectedDate]); // handle date from props

    return (<>
        {lang === 'fa' ?
            <ThemeProvider theme={themeFa}>
                <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                    <DatePicker
                        placeholder={placeholder}
                        InputProps={{className: classes.input}}
                        className={classes.dateFa}
                        clearable
                        okLabel="تأیید"
                        cancelLabel="لغو"
                        clearLabel="پاک کردن"
                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>
            </ThemeProvider>
            :
            <ThemeProvider theme={themeEn}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        placeholder={placeholder}
                        value={selectedDate}
                        onChange={handleDateChange}
                        className={classes.dateEn}
                        // labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                        clearLabel="clear"
                        okLabel="ok"
                        cancelLabel="cancel"
                        clearable
                        />
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        }


    </>);
}

export default DatePickerrComponent;
