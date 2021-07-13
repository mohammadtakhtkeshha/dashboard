import React from "react";
import GuideBlockComponent from "features/partials/GuideBlockComponent";

export const steps = [
    {
        selector: '.element-list',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    }
]

