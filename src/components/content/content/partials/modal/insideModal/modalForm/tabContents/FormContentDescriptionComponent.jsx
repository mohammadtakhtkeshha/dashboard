import React, {useContext,useState} from "react";
import {withNamespaces} from "react-i18next";

import {Box} from "@material-ui/core";
import {Grid} from '@material-ui/core';

import EditorComponent from "components/partials/EditorComponent.jsx";
import ContentsContext from "contexts/ContentsContext";

function TextContentTabComponent({t}) {
    const contentsContext = useContext(ContentsContext);

    const clickEditorDescription = (e,src) => {
        contentsContext.setContent(prevState => {
            return {
                ...prevState, body: e
            }
        });
    }

    return (<Grid container>
            <Grid item xs={12}>
                <Box className="editor">
                    <EditorComponent
                        descriptionFileSrc={contentsContext.descriptionFileSrc}
                        setDescriptionFileSrc={contentsContext.setDescriptionFileSrc}
                        title={t('translation:description')} onClick={clickEditorDescription}/>
                </Box>
            </Grid>
        </Grid>
    );
}

export default withNamespaces('translation')(TextContentTabComponent);