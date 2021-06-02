import GuideBlockComponent from "infrastructure/authorized/partials/GuideBlockComponent";
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
    }, {
        selector: '.state-elementsTable',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }
]
