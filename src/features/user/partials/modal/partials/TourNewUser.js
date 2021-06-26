import GuideBlockComponent from "features/partials/GuideBlockComponent";
import React from "react";

export const steps = [
    {
        selector: '.first-name',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    },
    {
        selector: '.last-name',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    },
    {
        selector: '.username',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    },
    {
        selector: '.my-role',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    },
    {
        selector: '.email',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    },
    {
        selector: '.password',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    },
    {
        selector: '.confirm-pass',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    },
    {
        selector: '.status',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    },
    {
        selector: '.image-upload-block',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    }
]
