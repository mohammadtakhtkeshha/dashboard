import GuideBlockComponent from "infrastructure/authorized/partials/GuideBlockComponent";
import React from "react";

export const steps = [
    {
        selector: '.form-title',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    },
    {
        selector: '.form-status',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    },
    {
        selector: '.form-machine-name',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    },
    {
        selector: '.form-description',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }
]
