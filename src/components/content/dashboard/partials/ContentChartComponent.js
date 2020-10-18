import React, {useState, useEffect, useContext} from "react";
import {Box, Typography, Paper} from "@material-ui/core";
import * as contentChart from 'assets/js/dashboard/ContentChart';
import ContentsContext from "../../../../contexts/ContentsContext";

export default function ContentChartComponent({contents}) {
    const classes = contentChart.useStyles();
    const contentsContext = useContext(ContentsContext);
    const [customContents, setCustomContents] = useState([]);
    const [totalNumberOfContents, setTotalNumberOfContents] = useState('');

    let setCustomContentHandler = (value) => {
        let getCustomContents = customizedContents(value);
        let contents = Object.entries(getCustomContents);
        let arr = [...contents];
        setCustomContents([...arr]);
        debugger
        // for(let item in arr){
        //     for(let icon in contentsContext){
        //         if(){
        //
        //         }
        //     }
        // }
        return arr;
    }

    let getTotalNumberOfContent = () => {
        let length = contents.length;
        setTotalNumberOfContents(length);
    }

    let customizedContents = (value) => {
        return value.reduce((initial, currentValue) => {
            let key = currentValue.type;
            if (!initial[key]) {
                initial[key] = [];
            }
            initial[key].push(currentValue);
            return initial;
        }, {});
    }

    useEffect(() => {
        getTotalNumberOfContent();
    }, [contents]);

    useEffect(() => {
        setCustomContentHandler(contents);
    }, [contents]);

    return (
        <>
            {customContents.length>0 ? <Paper className={classes.myPaper}>
                <Typography variant="h4" className={classes.title}>______ محتواها ______</Typography>
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
            </Paper>:''}
        </>
    );

}
