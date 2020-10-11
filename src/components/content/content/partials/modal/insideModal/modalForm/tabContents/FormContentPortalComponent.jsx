import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, Typography} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { StyledAlignTypography} from "assets/js/App";
import {StyledRowBox, StyledRow, StyledCol} from "assets/js/content/partials/contents";
import ContentsContext from "contexts/ContentsContext";
import {handleAffiliateChangeMethod} from "./FormContentPortalComponent.js";

function FormContentPortalComponent({t}) {
    const lang = i18next.language;
    let currentAlign = (lang === 'en' ? 'left' : 'right');
    const contentsContext = useContext(ContentsContext);

    const handleAffiliateChange = (e) => {
        handleAffiliateChangeMethod(e, contentsContext);
    }

    return (<StyledRowBox>
        <StyledRow>
            <StyledCol>
                    <Box>
                        <StyledAlignTypography align={currentAlign}>{t('contents:sendToAllAffiliates')}</StyledAlignTypography>
                        <FormGroup row>
                            <Box>
                                <FormControlLabel
                                    control={<Checkbox checked={contentsContext.content.field_domain_all_affiliates}
                                                       onChange={(e) => handleAffiliateChange(e)}
                                    />}
                                    label={t('contents:availableOnAllDomain')}
                                />
                            </Box>
                        </FormGroup>
                    </Box>
            </StyledCol>
        </StyledRow>
    </StyledRowBox>);
}

export default withNamespaces('contents,translation')(FormContentPortalComponent);