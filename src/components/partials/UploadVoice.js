import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from "@material-ui/icons/Add";
import AudioPlayer from 'material-ui-audio-player';

import clsx from "clsx";
import {globalCss} from "assets/js/globalCss";
import {uploadStyles} from 'assets/js/partials/upload';
import AppContext from "../../contexts/AppContext";

const styles = makeStyles(uploadStyles);

const gClass=makeStyles(globalCss);

function UploadVoice({t,multiple, title, getFile, voices,removedFileId,sendIdAfterUpload}) {
    const classes = styles();
    const appContext = useContext(AppContext);
    const gClasses=gClass();
    const lang=i18next.language;
    const [voicePreviewUrl, setVoicePreviewUrl] = useState([]);
    const [files, setFiles] = useState([]);
    const [validation, setValidation] = useState('');
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        appContext.setLoading(false);
        if (voices && voices[0] !== undefined && voices.length > 0) {//for edit user
            let urls = [];
            for (let voice of voices) {
                urls.push(voice.url);
            }
            setVoicePreviewUrl([...urls]);
        }
    }, [voices]);

    useEffect(()=>{
        appContext.setLoading(false);

        if (sendIdAfterUpload !== undefined && sendIdAfterUpload !== "") {
            setCurrentId(prevState => {
                return [...prevState, sendIdAfterUpload.id]
            });
            let file = sendIdAfterUpload.file;
            let reader = new FileReader();
            reader.onload = () => {
                setFiles(prevState => {
                    return [...prevState, file];
                });
                setVoicePreviewUrl(prevState => {
                    return [...prevState, reader.result]
                });
            }
            reader.readAsDataURL(file);
         }
    },[sendIdAfterUpload]);

    let uploadFile = (e) => {
        appContext.setLoading(true);
        let extention = (e.currentTarget.files[0].name).split('.').pop();
        setValidation('');
        setFiles(prevState => {
            return [...prevState]
        });
        setVoicePreviewUrl(prevState => {
            return [...prevState]
        });
        if (extention !== ('mp3')) {
            setValidation(t('translation:voiceValidation'));
            appContext.setLoading(false);
            return
        }


        let arrayOfFiles = [];
        if (multiple) {//check mutliple voice or not
            arrayOfFiles = e.currentTarget.files;
        } else {
            setFiles([]);
            setVoicePreviewUrl([]);
            arrayOfFiles.push(e.currentTarget.files[0]);
        }
        getFile([...arrayOfFiles]);

    };

    let handleRemoveVoice = (e, src) => {
        let index = voicePreviewUrl.indexOf(src);
        let newVoicePreview = voicePreviewUrl.filter(item => item !== src);
        let deletedFile = files.splice(index, 1);
        let newFiles = files.filter(item => item !== deletedFile);
        setVoicePreviewUrl(newVoicePreview);
        setFiles(newFiles);
        removedFileId(e.currentTarget.id);
    }

    let $imagePreview = [];

    if (voicePreviewUrl.length > 0) {
        for (let i = 0; i < (voicePreviewUrl.length); i++) {
            $imagePreview.push(<div id="fileBlock">
                    <span className="cancelVoice" id={currentId[i]} onClick={e => handleRemoveVoice(e, voicePreviewUrl[i], files[i])}>
                        <CancelIcon/>
                    </span>
                <AudioPlayer src={voicePreviewUrl[i]}/>
            </div>);
        }
    } else {
        $imagePreview.push(<div className="previewText">{title}</div>);
    }
    return (
        <Box>
            <Box className={classes.uploadFile}>
                <input type='file' className="input" multiple={multiple} onChange={e => uploadFile(e)}/>
                <div className='file'>
                    <div className='blockPart'>
                        {$imagePreview.map((item, index) => (<span key={index}>{item}</span>))}
                        {$imagePreview[0].props.className === 'previewText' ? '' : <div className="addIcon">
                            <AddIcon/>
                        </div>}
                    </div>
                </div>
            </Box>
            <Typography className={clsx(gClasses.validation, lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>{validation}</Typography>
        </Box>
    );
}

export default withNamespaces('users')(UploadVoice);
