import React, {useEffect, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import * as colors from './Colors.js';
import {withNamespaces} from "react-i18next";
import ReactPlayer from 'react-player';
import AddIcon from '@material-ui/icons/Add';
import {primary} from "./Colors";
import clsx from "clsx";
import {globalCss} from "../../assets/js/globalCss";
import i18next from "i18next";


const styles = makeStyles({
    UploadVideo: {
        '& input': {
            height: '100%',
            cursor: 'pointer',
        },
        position: 'relative',
        minHeight: '120px',
        border: `1px solid ${colors.primary}`,
        '& .file': {
            position: 'absolute',
            top: '0',
            bottom: 0,
            width: '100%',
            opacity: 0,
        },
        '& .video': {
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            '& .blockPart': {
                textAlign: 'center',
                width: '100%',
                '& .addIcon': {
                    cursor: 'pointer',
                    zIndex: '100',
                    '& svg': {
                        borderRadius: '100%',
                        color: 'white',
                        backgroundColor: primary,
                    }
                },
                '& #videoBlock': {
                    position: 'relative',
                    display: 'inline-block',
                    width: '100%',
                    '& #cancel': {
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '10px',
                        left: '12px',
                        color: colors.primary,
                        zIndex: '100',
                    },
                    '& div': {
                        boxSizing: 'border-box',
                        width: '100%!important',
                        padding: '10px',
                        height: '260px!important',
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

function UploadVideo({t,multiple, title, getFile, videos}) {
    const classes = styles();
    const gClasses=gClass();
    const lang=i18next.language;
    const [videoPreviewUrl, setvideoPreviewUrl] = useState([]);
    const [files, setFiles] = useState([]);
    const [validation, setValidation] = useState('');


    useEffect(() => {
        if (videos && videos[0] !== undefined && videos.length > 0) {//for edit user
            let urls = [];
            for (let video of videos) {
                urls.push(video.url);
            }
            setvideoPreviewUrl([...urls]);
        }
    }, [videos]);

    let uploadFile = (e) => {
        let extention = (e.currentTarget.files[0].name).split('.').pop();
        setValidation('');
        setFiles(prevState => {
            return [...prevState]
        });
        setvideoPreviewUrl(prevState => {
            return [...prevState]
        });
        if (extention !== ('mp4')) {
            setValidation(t('translation:videoValidation'));
            return
        }

        let arrayOfFiles = [];
        if (multiple) {//check mutliple video or not
            arrayOfFiles = e.currentTarget.files;
        } else {
            setFiles([]);
            setvideoPreviewUrl([]);
            arrayOfFiles.push(e.currentTarget.files[0]);
        }
        getFile([...arrayOfFiles]);
        for (let i = 0; i < arrayOfFiles.length; i++) {
            let reader = new FileReader();
            reader.onload = () => {
                setFiles(prevState => {
                    return [...prevState, arrayOfFiles[i]];
                });
                setvideoPreviewUrl(prevState => {
                    return [...prevState, reader.result]
                });
            }
            reader.readAsDataURL(arrayOfFiles[i]);
        }
    }

    let handleRemovevideo = (e, src, fileItem) => {
        debugger
        let index = videoPreviewUrl.indexOf(src);
        let newvideoPreview = videoPreviewUrl.filter(item => item !== src);
        let deletedFile = files.splice(index, 1);
        let newFiles = files.filter(item => item !== deletedFile);
        setvideoPreviewUrl(newvideoPreview);
        setFiles(newFiles);
        getFile([...newFiles]);
    }

    let $videoPreview = [];
    if (videoPreviewUrl.length > 0) {
        for (let i = 0; i < (videoPreviewUrl.length); i++) {
            $videoPreview.push(<div id="videoBlock">
                    <span id='cancel' onClick={e => handleRemovevideo(e, videoPreviewUrl[i], files[i])}>
                        <CancelIcon/>
                    </span>
                <ReactPlayer
                    controls={true}
                    url={videoPreviewUrl[i]}/>
            </div>);
        }
    } else {
        $videoPreview.push(<div className="previewText">{title}</div>);
    }
    console.log($videoPreview[0].props.className === 'previewText');
    return (
        <Box>
        <Box className={classes.UploadVideo}>
            <input type='file' className="file" multiple={multiple} onChange={e => uploadFile(e)}/>
            <div className='video'>
                <div className='blockPart'>
                    {$videoPreview.map((item, index) => (<span key={index}>{item}</span>))}
                    {$videoPreview[0].props.className === 'previewText' ? '' : <div className="addIcon">
                        <AddIcon/>
                    </div>}
                </div>
            </div>
        </Box>
    <Typography className={clsx(classes.validation, lang==='en'?gClasses.textLeft:gClasses.textRight) }>{validation}</Typography>
        </Box>
);
}

export default withNamespaces('users','translation')(UploadVideo);