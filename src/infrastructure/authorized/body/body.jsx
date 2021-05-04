import React from 'react';
// import 'App.css';
import {Switch, Route} from "react-router-dom";
import {routes} from 'store/routes';
import AuthorizedContext from "contexts/AuthorizedContext";
import {ReactComponent as NewsSvg} from "assets/svg/contentType/news.svg";
import {ReactComponent as ArticleSvg} from "assets/svg/contentType/article.svg";
import {ReactComponent as VideoSvg} from "assets/svg/contentType/video.svg";
import {ReactComponent as SoundSvg} from "assets/svg/contentType/sound.svg";
import {ReactComponent as PhotoSvg} from "assets/svg/contentType/photo.svg";
import {ReactComponent as ContentSvg} from "assets/svg/contentType/content.svg";

function Index() {
    const contentTypeNameList = [
        {icon: <NewsSvg/>, name: 'خبر', machin_name: 'news', description: 'description', number: 0},
        {icon: <ArticleSvg/>, name: 'مقاله', machin_name: 'article', description: 'description', number: 0},
        {icon: <VideoSvg/>, name: 'ویدیو', machin_name: 'videos', description: 'description', number: 0},
        {icon: <SoundSvg/>, name: 'صوت', machin_name: 'sounds', description: 'description', number: 0},
        {icon: <PhotoSvg/>, name: 'گالری', machin_name: 'images', description: 'description', number: 0},
        {icon: <ContentSvg/>, name: 'صفحه ساده', machin_name: 'page', description: 'description', number: 0}
    ];

    return (
        <AuthorizedContext.Provider value={{
            contentTypeNameList: contentTypeNameList
        }}>
            <Switch>
                {routes.map((route) => (
                    <Route key={route.path}
                           path={route.path}
                           exact={route.exact}
                           component={route.component}/>
                ))}
            </Switch>
        </AuthorizedContext.Provider>
    );
}

export default Index;

