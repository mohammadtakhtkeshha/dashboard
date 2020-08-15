import React, {useEffect, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import * as colors from './Colors.js';
import {withNamespaces} from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import {primary} from "./Colors";
import AudioPlayer from 'material-ui-audio-player';
import clsx from "clsx";
import {globalCss} from "../../assets/js/globalCss";
import i18next from "i18next";

const styles = makeStyles({
    uploadVoice: {
        '& input': {
            cursor: 'pointer',
        },
        position: 'relative',
        minHeight: '120px',
        border: `1px solid ${colors.primary}`,
        '& .file': {
            position: 'absolute',
            top: '0',
            bottom: '0',
            width: '100%',
            opacity: 0,
        },
        '& .voice': {
            minHeight: '120px',
            display: 'flex',
            // justifyContent:'center',
            alignItems: 'center',
            '& .blockPart': {
                width: '100%',
                textAlign: 'center',
                '& .addIcon': {
                    cursor: 'pointer',
                    zIndex: '100',
                    '& svg': {
                        borderRadius: '100%',
                        color: 'white',
                        backgroundColor: primary,
                    }
                },
                '& #voiceBlock': {
                    position: 'relative',
                    display: 'inline-block',
                    width: '100%',
                    '& > div': {
                        margin: '0!important',
                    },
                    '& #cancel': {
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '-13px',
                        left: '0',
                        color: colors.primary,
                    },
                    '& voice': {
                        width: '100%',
                        padding: '10px',
                        height: '120px',
                        boxSizing: 'border-box',
                    }
                },
                '& .previewText': {
                    textAlign: 'center',
                    width: '100%',
                }
            }
        }
    },
    validation:{
        color:'red',
    }
});

const gClass=makeStyles(globalCss);

function UploadVoice({t,multiple, title, getFile, voices}) {
    const classes = styles();
    const gClasses=gClass();
    const lang=i18next.language;
    const [voicePreviewUrl, setVoicePreviewUrl] = useState([]);
    const [files, setFiles] = useState([]);
    const [validation, setValidation] = useState('');

    useEffect(() => {
        if (voices && voices[0] !== undefined && voices.length > 0) {//for edit user
            let urls = [];
            for (let voice of voices) {
                urls.push(voice.url);
            }
            setVoicePreviewUrl([...urls]);
        }
    }, [voices]);

    let uploadFile = (e) => {
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
        for (let i = 0; i < arrayOfFiles.length; i++) {
            let reader = new FileReader();
            reader.onload = () => {
                setFiles(prevState => {
                    return [...prevState, arrayOfFiles[i]];
                });
                setVoicePreviewUrl(prevState => {
                    return [...prevState, reader.result]
                });
            }
            reader.readAsDataURL(arrayOfFiles[i]);
        }
    };

    let handleRemoveVoice = (e, src) => {
        let index = voicePreviewUrl.indexOf(src);
        let newVoicePreview = voicePreviewUrl.filter(item => item !== src);
        let deletedFile = files.splice(index, 1);
        let newFiles = files.filter(item => item !== deletedFile);
        setVoicePreviewUrl(newVoicePreview);
        setFiles(newFiles);
        getFile([...newFiles]);
    }

    let $imagePreview = [];

    if (voicePreviewUrl.length > 0) {
        for (let i = 0; i < (voicePreviewUrl.length); i++) {
            $imagePreview.push(<div id="voiceBlock">
                    <span id='cancel' onClick={e => handleRemoveVoice(e, voicePreviewUrl[i], files[i])}>
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
            <Box className={classes.uploadVoice}>
                <input type='file' className="file" multiple={multiple} onChange={e => uploadFile(e)}/>
                <div className='voice'>
                    <div className='blockPart'>
                        {$imagePreview.map((item, index) => (<span key={index}>{item}</span>))}
                        {$imagePreview[0].props.className === 'previewText' ? '' : <div className="addIcon">
                            <AddIcon/>
                        </div>}
                    </div>
                </div>
            </Box>
            <Typography className={clsx(classes.validation, lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>{validation}</Typography>
        </Box>
    );
}

export default withNamespaces('users')(UploadVoice);