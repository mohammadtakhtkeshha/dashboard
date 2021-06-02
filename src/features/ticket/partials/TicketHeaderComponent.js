import GuideBlockComponent from "infrastructure/authorized/partials/GuideBlockComponent";
import React from "react";

export const steps = [
    {
        selector: '.register-button',
        content: ({ goTo, inDOM }) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    }, {
        selector: '.user-elementsTable',
        content: ({ goTo, inDOM }) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }, {
        selector: '.tour-status',
        content: ({ goTo, inDOM }) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }, {
        selector: '.tour-department',
        content: ({ goTo, inDOM }) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }, {
        selector: '.tour-subject',
        content: ({ goTo, inDOM }) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }
]
