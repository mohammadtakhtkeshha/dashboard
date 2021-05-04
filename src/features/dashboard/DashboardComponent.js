import React from "react";

import UserChartComponent from "./partials/UserChartComponent.jsx";
import CommentDashboardComponent from "./partials/CommentDashboardComponent.jsx";
import CommentsChartComponent from "./partials/CommentsChartComponent.jsx";
import ContentChartComponent from "./partials/ContentChartComponent.jsx";
import ContentDashboardComponent from "./partials/ContentDashboardComponent.jsx";
import UserDashboardComponent from "./partials/UserDashboardComponent.jsx";
import WelcomeDashboardComponent from "./partials/welcome/WelcomeDashboardComponent.jsx";

import MessageDashaboardSettingComponent from "./partials/MessageDashaboardSettingComponent.jsx";

export default function DashboardComponent() {
  return (
    <>
      <MessageDashaboardSettingComponent />
      <WelcomeDashboardComponent />
      <ContentChartComponent />
      <ContentDashboardComponent />
      <UserDashboardComponent />
      <UserChartComponent />
      <CommentDashboardComponent />
      <CommentsChartComponent />
    </>
  );
}
