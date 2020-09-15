import React, {useEffect, useState} from 'react';
import i18next from "i18next";

import makeStyles from "@material-ui/styles/makeStyles";
import LuxonUtils from '@date-io/luxon';
import {ThemeProvider} from '@material-ui/styles';
import { DatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';

import {myStyles, themeEnn, themeFaa} from "assets/js/partials/datePicker";
// ----------------------- jalali -------------------
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import {createMuiTheme} from '@material-ui/core/styles';

// ----------------------- jalali -------------------
jMoment.loadPersian({dialect: "persian-modern", usePersianDigits: true});

const styles = makeStyles(myStyles);
const themeFa = createMuiTheme(themeFaa);
const themeEn = createMuiTheme(themeEnn);

function DatePickerrComponent(props) {
    let lang = i18next.language;
    const classes = styles(props);
    const [selectedDate, setSelectedDate] = useState(props.selectedDate); //get the date from props

    const handleDateChange = (e) => {
        if (!props.selectedDate) {
            setSelectedDate(e);
        }
        if (typeof props.onChange === 'function') {
            props.onChange(e);
        }
    };

    useEffect(() => {
        setSelectedDate(props.selectedDate);
    }, [props.selectedDate]); // handle date from props

    return (<>
        {lang === 'fa' ?
            <ThemeProvider theme={themeFa}>
                <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                    <DatePicker
                        InputProps={{className: classes.input}}
                        className={classes.dateFa}
                        clearable
                        okLabel="تأیید"
                        cancelLabel="لغو"
                        clearLabel="پاک کردن"
                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                        value={selectedDate}
                        onChange={handleDateChange}
                        DialogProps={{
                            border: '10px solid red',
                            backgroundColor: 'pink',
                            PaperProps: {
                                elevation: 6,
                                backgroundColor: 'pink',
                            }
                        }}
                    />
                </MuiPickersUtilsProvider>
            </ThemeProvider>
            :
            <ThemeProvider theme={themeEn}>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <DatePicker value={selectedDate} onChange={handleDateChange} className={classes.dateEn}/>
                </MuiPickersUtilsProvider>
            </ThemeProvider>

        }


    </>);
}

export default DatePickerrComponent;
