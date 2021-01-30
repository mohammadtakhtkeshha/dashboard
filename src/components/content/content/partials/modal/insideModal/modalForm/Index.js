import React from "react";
import GuideBlockComponent from "components/partials/GuideBlockComponent";

export const handleContentStepsMethod = (contentType,setSteps) => {
    let stepArr = [];
    if (contentType === 'page') {
        setSteps([
            {
                selector: '.title',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent/>
                    </div>
                ),
                position: 'top',
                stepInteraction: false,
            }, {
                selector: '.description',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent/>
                    </div>
                ),
                position: 'top',
            },{
                selector: '.publishStatus',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent/>
                    </div>
                ),
                position: 'top',
                stepInteraction: false,
            },
        ]);
    }
    else if (contentType === 'article') {
        setSteps([
            {
                selector: '.title',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="title"/>
                    </div>
                ),
                position: 'top',
                stepInteraction: false,
            },
            {
                selector: '.comment',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="comment"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.tags',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="tags"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.image',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="image"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.description',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="description"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.publish-date',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="publish-date"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.unpublish-date',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="unpublish-date"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.publish-status',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="show-in-main-page"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-path',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-path"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-title',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-title"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-keywords',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-keywords"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-description',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-description"/>
                    </div>
                ),
                position: 'top',
            },

        ]);

    }
    else if(contentType === 'news'){
        setSteps([
            {
                selector: '.title',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="title"/>
                    </div>
                ),
                position: 'top',
                stepInteraction: false,
            },
            {
                selector: '.subtitle',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="subtitle"/>
                    </div>
                ),
                position: 'top',
                stepInteraction: false,
            },
            {
                selector: '.urgent-news',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="urgent news"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.comment',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="comment"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.tags',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="tags"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.image',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="image"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.news-category',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="news-category"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.states',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.description',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="description"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.images',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="images"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.publish-date',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="publish-date"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.unpublish-date',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="unpublish-date"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.show-in-main-page',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="show-in-main-page"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.publish-status',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="show-in-main-page"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.show-in-sidebar',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="show-in-sidebar"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-path',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-path"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-title',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-title"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-keywords',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-keywords"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-description',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-description"/>
                    </div>
                ),
                position: 'top',
            },

        ]);
    }
    else if(contentType === 'videos'){
        setSteps([
            {
                selector: '.title',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="title"/>
                    </div>
                ),
                position: 'top',
                stepInteraction: false,
            },
            {
                selector: '.chosen',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="chosen"/>
                    </div>
                ),
                position: 'top',
                stepInteraction: false,
            },
            {
                selector: '.highlight',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="highlight"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.special',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="special"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.comment',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="comment"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.tags',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="tags"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.image',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="image"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.description',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="description"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.videos',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="videos"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.publish-status',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="show-in-main-page"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.show-in-sidebar',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="show-in-sidebar"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-path',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-path"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-title',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-title"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-keywords',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-keywords"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-description',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-description"/>
                    </div>
                ),
                position: 'top',
            }
        ]);
    }
    else {
        setSteps([
            {
                selector: '.title',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="title"/>
                    </div>
                ),
                position: 'top',
                stepInteraction: false,
            },
            {
                selector: '.chosen',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="chosen"/>
                    </div>
                ),
                position: 'top',
                stepInteraction: false,
            },
            {
                selector: '.highlight',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="highlight"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.special',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="special"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.comment',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="comment"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.tags',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="tags"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.image',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="image"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.description',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="description"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.images',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="images"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.publish-status',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="publish-status"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.show-in-sidebar',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="show-in-sidebar"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-path',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-path"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-title',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-title"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-keywords',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-keywords"/>
                    </div>
                ),
                position: 'top',
            },
            {
                selector: '.seo-description',
                content: ({goTo, inDOM}) => (
                    <div>
                        <GuideBlockComponent title="seo-description"/>
                    </div>
                ),
                position: 'top',
            }
        ]);
    }
    return stepArr;
}

export const updateTourMethod = (contentsContext,setValue,curr) => {
    if (contentsContext.contentType === 'page') {
        if (curr === 1) {
            setValue(0) // value for current tab curr for current step
        } else if (curr === 2){
            setValue(1)
        }else{
            setValue(3)
        }
    }else if (contentsContext.contentType === 'news') {
        if (0<curr && curr<9) {
            setValue(0)
        } else if (curr === 9){
            setValue(1)
        }else if (curr === 10){
            setValue(2)
        }else if (curr > 10 && curr < 16){
            setValue(3)
        }else{
            setValue(4)
        }
    }else if (contentsContext.contentType === 'article') {
        if (0<curr && curr<5) {
            setValue(0)
        } else if (curr === 5){
            setValue(1)
        }else if (5<curr && curr<9){
            setValue(3)
        }else{
            setValue(4)
        }
    }else if (contentsContext.contentType === 'videos' || contentsContext.contentType === 'sounds' || contentsContext.contentType === 'images') {
        if (0<curr && curr<8) {
            setValue(0)
        } else if (curr === 8){
            setValue(1)
        } else if (curr === 9){
            setValue(2)
        }else if (9<curr && curr<12){
            setValue(3)
        }else{
            setValue(4)
        }
    }
}
