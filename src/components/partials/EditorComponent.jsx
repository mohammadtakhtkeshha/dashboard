import React, {useContext, useEffect,useState} from 'react';
import SunEditor from 'suneditor-react';
import {withNamespaces} from "react-i18next";

import {Typography, Box} from "@material-ui/core";
import 'suneditor/dist/css/suneditor.min.css';
import {makeStyles} from "@material-ui/styles";

import i18next from "i18next";
import contentService from "core/services/content.service";
import appContext from 'contexts/AppContext';
import ContentsContext from "contexts/ContentsContext";

const useStyles = makeStyles({
    editorBox: {
        margin: '.5rem 0',
        '& .se-wrapper': {
            '& span': {
                textAlign: props => props.align,
            }
        },
        '& .sun-editor-common': {
            textAlign: props => props.align,
        }
    }
});

function EditorComponent({t, title, onClick, textAlign, setDescriptionFileSrc, descriptionFileSrc}) {
    const align = i18next.language === 'en' ? 'left' : 'right';
    const classes = useStyles({align: align});
    const contentsContext = useContext(ContentsContext);
    const canvas = document.createElement('canvas');
    let src;
    const beforeUploading = (files, info, uploadHandler) => {
        const uploadFile = files[0];
        contentService.uploadSingImg(files).then((response) => {
            const str = response.data.uri.substring(9);
            let url = `http://dash.webrbp.ir/sites/default/files/${str}`;
            setDescriptionFileSrc(url);
            src=url;
            const img = document.createElement('img');
            const reader = new FileReader();
            reader.onload = function (e) {
                img.src = e.target.result
                img.onload = function (url) {
                    let ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    const MAX_WIDTH = 500;
                    const MAX_HEIGHT = 200;
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(function (blob) {
                        uploadHandler([new File([blob], uploadFile.name)])
                    }, uploadFile.type, 1);
                }
            }
            reader.readAsDataURL(uploadFile);
        }).catch((error) => {
            appContext.handleError(error);
        });
    }

    const changeEditorContent = (e) => {
        debugger
        onClick(e,src);
    }

    const imageUploadHandler = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
        if (state === "create") {
            targetImgElement.setAttribute('src', src);
        }
    }

    // console.log(descriptionFileSrc);

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
