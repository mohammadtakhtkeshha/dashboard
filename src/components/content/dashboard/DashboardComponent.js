import React, {useState, useEffect} from "react";
import {Grid, Paper} from '@material-ui/core';
//components
import UserChartComponent from "./partials/UserChartComponent";
import CommentDashboardComponent from "./partials/CommentDashboardComponent";
import CommentsChartComponent from "./partials/CommentsChartComponent";
import ContentChartComponent from "./partials/ContentChartComponent";
import ContentDashboardComponent from "./partials/ContentDashboardComponent";
import UserDashboardComponent from "./partials/UserDashboardComponent";
import dashboardService from "../../../core/services/dashboard.service.js";
// import {Get} from "../../../utils/authFetch";


export default function DashboardComponent() {
    const [contents, setContents] = useState([]);
    useEffect(() => {
        getContentList();
    }, []);
    let getContentList =async () => {
    //     const data =await Get('rhrdhrd',);
    //     if(data){
    //
    //     }
            dashboardService.getContentLis().then((response) => {
            let contents = response.data;
            setContents([...contents]);
        }).catch((error) => {
            console.log(error);
        });
    };
    return (
        <>
            <ContentChartComponent contents={contents}/>
            <ContentDashboardComponent/>
            <UserDashboardComponent/>
            <UserChartComponent/>
            <CommentDashboardComponent/>
            <CommentsChartComponent/>
        </>
    );
}