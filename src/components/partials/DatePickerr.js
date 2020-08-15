import React, {useEffect, useState, useCallback} from 'react';
import makeStyles from "@material-ui/styles/makeStyles";

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import MomentUtils from '@date-io/moment';
import LuxonUtils from '@date-io/luxon';
import {ThemeProvider} from '@material-ui/styles';

import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// ----------------------- jalali -------------------
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import i18next from "i18next";
import {createMuiTheme} from '@material-ui/core/styles';
import {primary} from "./Colors";

// ----------------------- jalali -------------------


jMoment.loadPersian({dialect: "persian-modern", usePersianDigits: true});

const styles = makeStyles({
    dateFa: {
        '& input': {
            fontFamily: 'primary-font!important'
        }
    },
    dateEn: {
        '& input': {
            fontFamily: 'byekan!important'
        }
    }
});

const themeFa = createMuiTheme({
    overrides: {
        MuiTypography: {
            root: {
                fontFamily: 'primary-font!important'

            }
        },
        MuiPickersToolbarText: {
            toolbarTxt: {
                fontFamily: 'primary-font!important'

            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: primary,
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: `${primary}!important`,
            }
        },
        MuiButton: {
            label: {
                color:primary
            }
        },
    },
});
const themeEn = createMuiTheme({
    overrides: {
        MuiTypography: {
            root: {
                fontFamily: 'byekan!important'
            }
        },
        MuiPickersToolbarText: {
            toolbarTxt: {
                fontFamily: 'byekan!important'

            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: primary,
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: `${primary}!important`,
            }
        },
        MuiButton: {
            label: {
                color:primary
            }
        },
    },
});

function DatePickerr(props) {
    let lang = i18next.language;
    const classes = styles(props);
    const [selectedDate, setSelectedDate] = useState(props.selectedDate); //get the date from props
    useEffect(() => {
        setSelectedDate(props.selectedDate);
    }, [props.selectedDate]); // handle date from props
    const handleDateChange = (e) => {
        if (!props.selectedDate) {
            setSelectedDate(e);
        }
        if (typeof props.onChange === 'function') {
            props.onChange(e);
        }
    };

    return (<>
        {props.lang === 'fa' ?
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

export default DatePickerr;