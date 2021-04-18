import React from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {Box} from "@material-ui/core"

import {StyledCarsoul} from "assets/js/dashboard/partials/carsoul"
import {
    StyledFlex,
    StyledFlexColumn,
    StyledFlexRow,
    StyledPercentLine,
    PercentageNumber,
    StyledFlexColumnNum,
    StyledIcon
} from "assets/js/dashboard/partials/contentChart";
import {Center} from "assets/js/App";


function CarsoulComponent({t, chunks, totalLength}) {
    const lang = i18next.language
    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1259},
            items: 4
        },
        tablet: {
            breakpoint: {max: 1259, min: 685},
            items: 3
        },
        mobile: {
            breakpoint: {max: 685, min: 0},
            items: 2
        }
    };

    return (<StyledCarsoul>
            <Carousel responsive={responsive}>
                {totalLength > 0 && chunks.map((content, i) => {
                    let length = content.number
                    const percentage =  Math.round((length / totalLength) * 100)
                    return (<StyledFlex key={i}>
                        <StyledFlexRow>
                            <StyledFlexColumn>
                                <Center>{content.name}</Center>
                                <Center>{length}</Center>
                            </StyledFlexColumn>
                            <StyledIcon>
                                {content.icon}
                            </StyledIcon>
                        </StyledFlexRow>
                        <StyledFlexColumnNum>
                            <PercentageNumber lang={lang} length={percentage}>
                                {percentage}%
                            </PercentageNumber>
                            <StyledPercentLine length={percentage}>
                                <Box/>
                            </StyledPercentLine>
                        </StyledFlexColumnNum>
                    </StyledFlex>)
                })}
            </Carousel>
        </StyledCarsoul>
    )

}

export default withNamespaces('translation,contents')(CarsoulComponent)
