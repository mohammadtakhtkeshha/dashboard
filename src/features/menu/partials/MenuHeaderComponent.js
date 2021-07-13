import GuideBlockComponent from "features/partials/GuideBlockComponent";
import React from "react";

export  const steps = [{
        selector: '.menu-list',
        content: ({ goTo, inDOM }) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    },
]
