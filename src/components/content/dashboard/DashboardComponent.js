import React, {useContext} from "react";

import UserChartComponent from "./partials/UserChartComponent.jsx";
import CommentDashboardComponent from "./partials/CommentDashboardComponent.jsx";
import CommentsChartComponent from "./partials/CommentsChartComponent.jsx";
import ContentChartComponent from "./partials/ContentChartComponent.jsx";
import ContentDashboardComponent from "./partials/ContentDashboardComponent.jsx";
import UserDashboardComponent from "./partials/UserDashboardComponent.jsx";
import WelcomeDashboardComponent from "./partials/WelcomeDashboardComponent.jsx"
import MessageDashaboardSettingComponent from "./partials/MessageDashaboardSettingComponent.jsx";
import AppContext from "contexts/AppContext";

export default function DashboardComponent() {
    const appContext=useContext(AppContext);
    return (
        <>
            <MessageDashaboardSettingComponent/>
            <WelcomeDashboardComponent/>
            <ContentChartComponent appContext={appContext}/>
            <ContentDashboardComponent appContext={appContext}/>
            <UserDashboardComponent appContext={appContext}/>
            <UserChartComponent appContext={appContext}/>
            <CommentDashboardComponent appContext={appContext}/>
            <CommentsChartComponent appContext={appContext}/>
        </>
    );
}
