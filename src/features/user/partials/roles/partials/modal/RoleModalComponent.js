import GuideBlockComponent from "infrastructure/authorized/partials/GuideBlockComponent";
import React from "react";

export const constSteps = (permissionsLength,setSteps ) => {
    let steps = []
    steps.push( {
        selector: '.subject',
        content: ({goTo, inDOM}) => (
            <div>
                <GuideBlockComponent/>
            </div>
        ),
        position: 'top',
        stepInteraction: false,
    })
    for(let i=0;i<permissionsLength;i++){
        steps.push({
            selector: `.status-${i}`,
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        })
    }

    setSteps([...steps])
    // return [
    //     {
    //         selector: '.subject',
    //         content: ({goTo, inDOM}) => (
    //             <div>
    //                 <GuideBlockComponent/>
    //             </div>
    //         ),
    //         position: 'top',
    //         stepInteraction: false,
    //     },
    //     {
    //         selector: '.status',
    //         content: ({goTo, inDOM}) => (
    //             <div>
    //                 <GuideBlockComponent/>
    //             </div>
    //         ),
    //         position: 'top',
    //     }
    // ]
}

