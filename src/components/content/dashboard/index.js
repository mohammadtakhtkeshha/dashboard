import React from "react";
import UserChart from "./partials/UserChartComponent";
import CommentDashboardComponent from "./partials/CommentDashboardComponent";
import CommentsChartComponent from "./partials/CommentsChartComponent";
import ContentChartComponent from "./partials/ContentChartComponent";
import ContentDashboardComponent from "./partials/ContentDashboardComponent";
import UserDashboardComponent from "./partials/UserDashboardComponent";
export default function index() {
    return(
        <div>
            <ContentDashboardComponent/>
            <CommentDashboardComponent/>
            <CommentsChartComponent/>
            <ContentChartComponent/>
            <UserDashboardComponent/>
            <UserChart/>
        </div>
    );
}