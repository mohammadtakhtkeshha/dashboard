import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import clsx from "clsx";

import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {globalCss} from "assets/js/globalCss";
import EditorComponent from "components/partials/EditorComponent";
import NewContentContext from "contexts/NewContentContext";
import {StyledInput, StyledBoxMt1} from "assets/js/App";
import {StyledTypographyError} from "assets/js/App";
import {validateDate} from "./index";

const gClass = makeStyles(globalCss);

function TextContentTabComponent({t}) {
    const lang = i18next.language;
    const gClasses = gClass();
    const newContentContext = useContext(NewContentContext);

    let handleChange = (e, field) => {
        const currentName = e.currentTarget.value;
        if (field === "title") {
            if (currentName !== "") {
                newContentContext.setErrors({title: ''});
            }
        }
        newContentContext.setContent(prevState => {
            return {
                ...prevState, [field]: currentName
            }
        });
    };

    const clickEditorDescription = (e) => {
        newContentContext.setContent(prevState => {
            return {
                ...prevState, body: e
            }
        });
    };

    return (<>
        <Box className={clsx('items', lang === 'en' ? gClasses.ltr : gClasses.rtl)}>
            <Box className="inputBlock">
                <StyledInput
                    value={newContentContext.content.title}
                    type="text"
                    placeholder={t('translation:title')}
                    onChange={e => handleChange(e, "title")}
                />
                {newContentContext.errors?.title ?
                    <StyledTypographyError
                        align={lang === 'en' ? 'left' : 'right'}>{newContentContext.errors.title}</StyledTypographyError> : ''}
            </Box>
            <Box className="inputBlock">
                <StyledInput
                    value={newContentContext.content.field_rotitr || ''}
                    type="text"
                    placeholder={t('contents:rotitr')}
                    onChange={e => handleChange(e, "field_rotitr")}/>
            </Box>
        </Box>
        <Box className="editor">
            <EditorComponent textAlign={lang === 'en' ? gClasses.textLeft : gClasses.textRight}
                             title={t('translation:description')} onClick={(e) => {
                clickEditorDescription(e)
            }}/>
        </Box>
    </>);
}

export default withNamespaces('contents,translation')(TextContentTabComponent);