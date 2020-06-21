import React, {useState, useEffect} from "react";
import Grid from '@material-ui/core/Grid';
//components
import UserChartComponent from "./partials/UserChartComponent";
import CommentDashboardComponent from "./partials/CommentDashboardComponent";
import CommentsChartComponent from "./partials/CommentsChartComponent";
import ContentChartComponent from "./partials/ContentChartComponent";
import ContentDashboardComponent from "./partials/ContentDashboardComponent";
import UserDashboardComponent from "./partials/UserDashboardComponent";
import HighChartsComponent from "./partials/HighChartsComponent";
import TestHighChartsComponent from "./partials/TestHighChartsComponent";
import axios from "axios";


export default function DashboardComponent() {
    const [contents,setContents]=useState([]);
    useEffect(() => {
        getContentList();
    }, []);
    let getContentList = () => {
        let url = 'http://sitesaz99.rbp/web/api/all_content?_format=json'
        axios.get(url).then((response) => {
            let contents = response.data;
            setContents([...contents]);
            // setCustomContentHandler(contents);
        }).catch((error) => {
            console.log(error);
        });
    };
// console.log(contents);

    return (
        <>

            <Grid container>
                <Grid item xs={12}>
                    <ContentChartComponent contents={contents}/>
                </Grid>
                <Grid item xs={12}>
                    <ContentDashboardComponent />
                </Grid>
                <Grid item xs={12}>
                    <UserDashboardComponent/>
                </Grid>
                <Grid item xs={12}>
                    <UserChartComponent/>
                </Grid>
                <Grid item xs={12}>
                    <CommentDashboardComponent/>
                </Grid>
                <Grid item xs={12}>
                    <CommentsChartComponent/>
                </Grid>
                <Grid item xs={12}>
                    <HighChartsComponent/>
                </Grid>
                <Grid item xs={12}>
                    <TestHighChartsComponent/>
                </Grid>


            </Grid>
        </>
    );
}