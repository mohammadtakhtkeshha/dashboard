import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";

import {Box, Grid} from "@material-ui/core";

import EditorComponent from "features/partials/EditorComponent.jsx";
import ContentsContext from "contexts/ContentsContext";

function FormContentDescriptionComponent({t}) {
    const contentsContext = useContext(ContentsContext)

    const clickEditorDescription = (e) => {
        contentsContext.setContent(prevState => {
            return {
                ...prevState, body: [{value: e}]
            }
        })
    }

    return (<Grid container>
        <Grid item xs={12}>
            <Box className="editor">
                <EditorComponent
                    value={contentsContext.content.body ? (contentsContext.content.body.length > 0 && contentsContext.content.body[0].value) : ''}
                    title={t('translation:description')} onClick={clickEditorDescription}/>
            </Box>
        </Grid>
    </Grid>);
}

export default withNamespaces('translation')(FormContentDescriptionComponent);
