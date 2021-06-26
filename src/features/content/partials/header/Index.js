import GuideBlockComponent from "features/partials/GuideBlockComponent";
import React from "react";

export const steps = [
    {
        selector: '.register-button',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    },
    {
        selector: '.content-list',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    },
    {
        selector: '.filter-title',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }, {
        selector: '.filter-status',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }, {
        selector: '.filter-type',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }
];

export const checkPermissionAllTypeContent = (setAllContentPer,permissions) => {
    const imagesPer = permissions['create images content'].access;
    const soundPer = permissions['create sounds content'].access;
    const newsPer = permissions['create news content'].access;
    const videosPer = permissions['create videos content'].access;
    const articlePer = permissions['create article content'].access;
    if(imagesPer && soundPer && newsPer && videosPer && articlePer){
        setAllContentPer(true)
    }
}
