import React, {useContext, useEffect, useState} from 'react';
import SunEditor from 'suneditor-react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import 'suneditor/dist/css/suneditor.min.css';


import {Typography, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import contentService from "core/services/content.service";
import ContentsContext from "contexts/ContentsContext";
import {editorStyle} from "assets/js/partials/editorStyle";
import AppContext from "contexts/AppContext";
import {previewImgInEditorMethod} from "./EditorComponent.js";

const useStyles = makeStyles(editorStyle);

function EditorComponent({t, title, onClick, textAlign}) {
    const align = i18next.language === 'en' ? 'left' : 'right';
    const classes = useStyles({align: align});
    const contentsContext = useContext(ContentsContext);
    const appContext = useContext(AppContext);
    const canvas = document.createElement('canvas');
    let src;

    const beforeUploading = (files, info, uploadHandler) => {
        const uploadFile = files[0];
        contentService.uploadSingImg(files).then((response) => {
            const str = response.data.uri.substring(9);
            src = `http://dash.webrbp.ir/sites/default/files/${str}`;
           previewImgInEditorMethod(response,str,canvas,uploadHandler,uploadFile);
        }).catch((error) => {
            appContext.handleError(error);
        });
    }

    const changeEditorContent = (e) => {
        onClick(e, src);
    }

    const imageUploadHandler = (targetImgElement, index, state) => {
        if (targetImgElement && state === "create") {
            const { currentSrc } = targetImgElement;
            targetImgElement.setAttribute('src', currentSrc || src);
        }
    }

    return (
        <div>
            <div id="editor">
                <Typography className={textAlign}>{title}</Typography>
                <Box className={classes.editorBox}>
                    <SunEditor
                        setContents={contentsContext.content.body}
                        showToolbar={true}
                        enableToolbar={true}
                        setOptions={{
                            height: 200,
                            buttonList: [['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
                                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                                ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                                ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']] // Or Array of button list, eg. [['font', 'align'], ['image']]
                        }}
                        onImageUploadBefore={beforeUploading}
                        onImageUpload={imageUploadHandler}
                        onChange={(e) => changeEditorContent(e)}
                        name="my-editor"
                        placeholder={t('translation:typeHere')}
                    />
                </Box>
            </div>
        </div>

    );
}


export default withNamespaces()(EditorComponent);
