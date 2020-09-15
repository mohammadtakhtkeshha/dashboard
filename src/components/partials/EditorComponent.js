import React, {useContext} from 'react';
import SunEditor from 'suneditor-react';
import axios from "axios";

import {Typography, Box} from "@material-ui/core";
import 'suneditor/dist/css/suneditor.min.css';
import {makeStyles} from "@material-ui/styles";

import storage from "libraries/local-storage";
import NewContentContext from "../../contexts/NewContentContext";

const useStyles = makeStyles({
    editorBox: {
        margin: '.5rem 0'
    }
});

function EditorComponent({title, onClick,textAlign}) {
    const classes = useStyles();
    // const [content,setContent]=useState('<div>in the name of god</div>');
    const newContentContext=useContext(NewContentContext);
    const canvas = document.createElement('canvas');
    let src="src";

    let beforeUploading = (files, info, uploadHandler) => {

        const uploadFile = files[0];


        const config = {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
                'Accept': 'application/vnd.api+json',
                "Content-Disposition": `file;filename="${uploadFile.name}"`,
            }
        };
        axios.post(`http://dash.webrbp.ir/file/upload/user/user/user_picture?_format=json`, uploadFile, config)
            .then((response) => {
                    let url = `http://dash.webrbp.ir/${response.data.uri[0].url}`;
                    src=url;
                    const img = document.createElement('img');
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        img.src = e.target.result
                        img.onload = function (url) {
                            let ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0);
                            const MAX_WIDTH = 200;
                            const MAX_HEIGHT = 100;
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
                }
            ).catch((error) => {
        });
    }

    let changeEditorContent = (e) => {
        onClick(e);
    }

    let imageUploadHandler = (xmlHttpRequest, info, core,url) => {
        xmlHttpRequest.setAttribute('src',src) ;
    }

    return (
        <div>
            {/*<div dangerouslySetInnerHTML={{__html:content}} />*/}
            <div id="editor">
                <Typography className={textAlign}>{title}</Typography>
                <Box className={classes.editorBox}>
                    <SunEditor
                        setContents={newContentContext.content.body}
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
                        lang="en" name="my-editor"
                        placeholder="Please type here..."
                    />
                </Box>
            </div>
        </div>

    );
}

export default EditorComponent;
