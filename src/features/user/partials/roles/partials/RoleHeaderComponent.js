import GuideBlockComponent from "features/partials/GuideBlockComponent";
import React from "react";

export const steps =  [
    {
        selector: '.register-button',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    }, {
        selector: '.role-elementsTable',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }
]
