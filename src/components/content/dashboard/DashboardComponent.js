import React, {useState, useEffect} from "react";
import {Grid, Paper} from '@material-ui/core';
//components
import UserChartComponent from "./partials/UserChartComponent";
import CommentDashboardComponent from "./partials/CommentDashboardComponent";
import CommentsChartComponent from "./partials/CommentsChartComponent";
import ContentChartComponent from "./partials/ContentChartComponent";
import ContentDashboardComponent from "./partials/ContentDashboardComponent";
import UserDashboardComponent from "./partials/UserDashboardComponent";
import axios from "axios";


export default function DashboardComponent() {
    const [contents, setContents] = useState([]);
    useEffect(() => {
        getContentList();
    }, []);
    let getContentList = () => {
        let url = 'http://sitesaz99.rbp/web/api/all_content?_format=json'
        axios.get(url).then((response) => {
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