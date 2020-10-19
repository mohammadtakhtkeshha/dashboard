import React from 'react';
import 'App.css';
import {Switch,Route} from "react-router-dom";
import {routes} from 'store/routes';
import AuthorizedContext from "contexts/AuthorizedContext";
import {ReactComponent as NewsSvg} from "../../assets/svg/contentType/news.svg";
import {ReactComponent as ArticleSvg} from "../../assets/svg/contentType/article.svg";
import {ReactComponent as VideoSvg} from "../../assets/svg/contentType/video.svg";
import {ReactComponent as SoundSvg} from "../../assets/svg/contentType/sound.svg";
import {ReactComponent as PhotoSvg} from "../../assets/svg/contentType/photo.svg";
import {ReactComponent as ContentSvg} from "../../assets/svg/contentType/content.svg";

function Index() {
    const contentTypeNameList=[
        {icon: <NewsSvg/>, name: 'خبر', machin_name: 'news', description: 'description'},
        {icon: <ArticleSvg/>, name: 'مقاله', machin_name: 'article', description: 'description'},
        {icon: <VideoSvg/>, name: 'ویدیو', machin_name: 'video', description: 'description'},
        {icon: <SoundSvg/>, name: 'صوت', machin_name: 'voice', description: 'description'},
        {icon: <PhotoSvg/>, name: 'گالری', machin_name: 'gallery', description: 'description'},
        {icon: <ContentSvg/>, name: 'صفحه ساده', machin_name: 'simple page', description: 'description'}
    ];
    return (
        <AuthorizedContext.Provider value={{
            contentTypeNameList:contentTypeNameList}}>
            <Switch>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </Switch>
        </AuthorizedContext.Provider>
    );
}

export default Index;



