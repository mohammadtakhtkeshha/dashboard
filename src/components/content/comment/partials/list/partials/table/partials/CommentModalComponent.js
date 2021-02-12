import GuideBlockComponent from "../../../../../../../partials/GuideBlockComponent";
import React from "react";

export const constSteps = [
    {
        selector: '.subject',
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
    },
    {
        selector: '.textarea',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }
]
