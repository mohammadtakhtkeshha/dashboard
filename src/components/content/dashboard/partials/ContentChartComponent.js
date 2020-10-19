import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from "react-i18next";

import {Box, Typography} from "@material-ui/core";

import {StyledPaper} from "assets/js/dashboard/dashboard";
import {ContentChartBlock,StyledBox} from "assets/js/dashboard/ContentChart";
import AuthorizedContext from "contexts/AuthorizedContext";

function ContentChartComponent({contents,t}) {
    const [customContents, setCustomContents] = useState([]);
    const [totalNumberOfContents, setTotalNumberOfContents] = useState('');
    const authorizedContext=useContext(AuthorizedContext);

    const setCustomContentHandler = (value) => {
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

    const getTotalNumberOfContent = () => {
        let length = contents.length;
        setTotalNumberOfContents(length);
    }

    const customizedContents = (value) => {
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

    console.log(authorizedContext.contentTypeNameList);

    return (<>
            {customContents.length>0 ? <StyledPaper>
                <Typography variant="h4">______ {t('contents:contents')} ______</Typography>
                <ContentChartBlock>
                    {customContents.map(function (content, index) {
                        let length = content[1].length;
                        return (
                            <StyledBox key={index}>
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
                            </StyledBox>
                        )
                    })
                    }
                </ContentChartBlock>
            </StyledPaper>:''}
        </>
    );

}
export default withNamespaces('translation,contents')(ContentChartComponent);
