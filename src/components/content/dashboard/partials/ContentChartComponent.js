import React, {useState, useEffect} from "react";
import {Box, Typography, Paper} from "@material-ui/core";
import * as contentChart from './../../../../assets/js/dashboard/ContentChart';

export default function ContentDashboardComponent({contents}) {
    const [customContents, setCustomContents] = useState([]);

    const [totalNumberOfContents, setTotalNumberOfContents] = useState('');
    let setCustomContentHandler = (value) => {
        let getCustomContents = customizedContents(value);
        let contents = Object.entries(getCustomContents);
        let arr = [...contents];
        setCustomContents([...arr]);
        return arr;
    };
    useEffect(() => {
        setCustomContentHandler(contents);
    }, [contents]);
    let getTotalNumberOfContent = () => {
        let length = contents.length;
        setTotalNumberOfContents(length);
    };
    useEffect(() => {
        getTotalNumberOfContent();
    }, [contents]);

    let customizedContents = (value) => {
        return value.reduce((initial, currentValue) => {
            let key = currentValue.type;
            if (!initial[key]) {
                initial[key] = [];
            }
            initial[key].push(currentValue);
            return initial;
        }, {});
    };



    const classes = contentChart.useStyles();

    return (
        <>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>محتواها</Typography>
                <div className={classes.content}>
                    {customContents.map(function (content, index) {
                        let length = content[1].length;
                        return (
                            <Box key={index} className="block">
                                <Box className="text">
                                    <Box>
                                        <Typography>{content[0]}</Typography>
                                    </Box>
                                    <Box> {length}</Box>
                                </Box>
                                <Box className="chart">
                                    <Box className="number">
                                        {Math.round((length / totalNumberOfContents) * 100)}%
                                    </Box>
                                    <Box className="graphic">
                                        <div
                                            className="after"
                                            style={{width: `${Math.round((length / totalNumberOfContents) * 100)}%`}}>
                                        </div>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
                    }
                </div>
            </Paper>
        </>
    );

}
