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
        selector: '.content-elementsTable',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }, {
        selector: '.filter-title',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }, {
        selector: '.filter-status',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }, {
        selector: '.filter-type',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
    }
];
