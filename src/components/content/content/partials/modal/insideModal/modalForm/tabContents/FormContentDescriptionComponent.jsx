import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";

import {Box} from "@material-ui/core";
import {Grid} from '@material-ui/core';

import EditorComponent from "components/partials/EditorComponent";
import NewContentContext from "contexts/NewContentContext";

function TextContentTabComponent({t}) {
    const newContentContext = useContext(NewContentContext);

    const clickEditorDescription = (e) => {
        newContentContext.setContent(prevState => {
            return {
                ...prevState, body: e
            }
        });
    }

    return (<Grid container>
            <Grid item xs={12}>
                <Box className="editor">
                    <EditorComponent title={t('translation:description')} onClick={(e) => {
                        clickEditorDescription(e)
                    }}/>
                </Box>
            </Grid>
        </Grid>
    );
}

export default withNamespaces('translation')(TextContentTabComponent);