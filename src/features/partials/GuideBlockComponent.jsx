import React from "react";
import {
    StyledFlexRow,
    StyledFlexColumn,
    StyledTitle,
    StyledDescription,
    IconBlock,
    TextBlock
} from "assets/js/partials/guideBlock";
import AddIcon from '@material-ui/icons/Add';
import i18next from "i18next";

function GuideBlockComponent({title}) {
    const lang = i18next.language;

    return (
        <div className='tour'>
            <StyledFlexRow>
                <StyledFlexColumn lang={lang}>
                    <IconBlock lang={lang}><AddIcon/></IconBlock>
                    <TextBlock lang={lang}>
                        <StyledTitle>{title}</StyledTitle>
                        <StyledDescription>با استفاده از این دکمه میتوانید یک محصول جدید به فروشگاه اضافه
                            کنید.</StyledDescription>
                    </TextBlock>
                </StyledFlexColumn>
                <StyledFlexColumn lang={lang}>

                </StyledFlexColumn>
            </StyledFlexRow>
        </div>);
}

export default GuideBlockComponent;
