import React from "react";
import {withNamespaces} from "react-i18next";
import {
    StyledFixed,
    StyledAbsoluteOne,
    StyledAbsoluteTwo,
    StyledTour,
    StyledAbsoluteThree,
    StyledAbsoluteFour,
    StyledAbsoluteFive,
} from "assets/js/partials/tour";
import InsideTourComponent from "features/partials/InsideTourComponent";

function ContentTabsTourComponent({t, open, setClose, currentStep, steps, setSteps, currentOffset, title, description, buttonText, tourButtonWidth}) {

    return (<StyledTour open={open}>
            <StyledAbsoluteOne currentStep={currentStep}>
                <InsideTourComponent
                    tourButtonWidth={tourButtonWidth}
                    buttonText={buttonText} title={title}
                    description={description}
                    currentOffset={currentOffset}
                    setClose={setClose} setSteps={setSteps}/>
            </StyledAbsoluteOne>
            <StyledAbsoluteTwo currentStep={currentStep}>
                <InsideTourComponent
                    tourButtonWidth={tourButtonWidth}
                    buttonText={buttonText} title={title}
                    description={description}
                    currentOffset={currentOffset} setClose={setClose} setSteps={setSteps}/>
            </StyledAbsoluteTwo>
            <StyledAbsoluteThree currentStep={currentStep}>
                <InsideTourComponent
                    tourButtonWidth={tourButtonWidth}
                    buttonText={buttonText} title={title}
                    description={description}
                    currentOffset={currentOffset} setClose={setClose} setSteps={setSteps}/>
            </StyledAbsoluteThree>
            <StyledAbsoluteFour currentStep={currentStep}>
                <InsideTourComponent
                    tourButtonWidth={tourButtonWidth}
                    buttonText={buttonText} title={title}
                    description={description}
                    currentOffset={currentOffset} setClose={setClose} setSteps={setSteps}/>
            </StyledAbsoluteFour>
            <StyledAbsoluteFive currentStep={currentStep}>
                <InsideTourComponent
                    tourButtonWidth={tourButtonWidth}
                    buttonText={buttonText} title={title}
                    description={description}
                    currentOffset={currentOffset} setClose={setClose} setSteps={setSteps}/>
            </StyledAbsoluteFive>
            <StyledFixed onClick={setClose} open={open}>
            </StyledFixed>
        </StyledTour>);
}

export default withNamespaces('translation')(ContentTabsTourComponent);
