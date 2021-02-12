import GuideBlockComponent from "components/partials/GuideBlockComponent";
import React from "react";

export const constStepsComment =  [
    {
        selector: '.filter-subject',
        content: ({ goTo, inDOM }) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    }, {
        selector: '.filter-author',
        content: ({ goTo, inDOM }) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }
]
