import React, {useContext, useEffect, useState} from "react";
import { withNamespaces } from "react-i18next";
import ReactPlayer from 'react-player';
import clsx from "clsx";
import i18next from "i18next";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';

import { globalCss } from "assets/js/globalCss";
import uploadStyles from 'assets/js/partials/upload';
import AppContext from "contexts/AppContext";


const styles = makeStyles(uploadStyles);

const gClass = makeStyles(globalCss);

function UploadVideo({ t, multiple, title, getFile,removedFileId, videos, sendIdAfterUpload ,videoPreviewUrl,setvideoPreviewUrl}) {
    const classes = styles();
    const gClasses = gClass();
    const appContext = useContext(AppContext);
    const lang = i18next.language;

    const [files, setFiles] = useState([]);
    const [validation, setValidation] = useState('');
    const [currentId, setCurrentId] = useState('');


    useEffect(() => {
        if (videos && videos[0] !== undefined && videos.length > 0) {//for edit user
            let urls = [];
            let fids = [];
            for (let video of videos) {
                urls.push(video.url);
                fids.push(video.fid);
            }
            setvideoPreviewUrl([...urls]);
            setCurrentId([...fids]);
        }
    }, [videos]);

    useEffect(() => {
        appContext.setLoading(false);
        if (sendIdAfterUpload !== undefined && sendIdAfterUpload !== "") {
            setCurrentId(prevState => {
                return [...prevState, sendIdAfterUpload.id]
            });

           let file=sendIdAfterUpload.file;
                let reader = new FileReader();
                reader.onload = () => {
                    setFiles(prevState => {
                        return [...prevState, file];
                    });
                    setvideoPreviewUrl(prevState => {
                        return [...prevState, reader.result]
                    });
                }
                reader.readAsDataURL(file);

        }
    }, [sendIdAfterUpload]);

    let uploadFile = (e) => {
        appContext.setLoading(true);
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
            appContext.setLoading(false);
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

    }

    let handleRemovevideo = (e, src, fileItem) => {
        let index = videoPreviewUrl.indexOf(src);
        let newvideoPreview = videoPreviewUrl.filter(item => item !== src);
        let deletedFile = files.splice(index, 1);
        let newFiles = files.filter(item => item !== deletedFile);
        setvideoPreviewUrl(newvideoPreview);
        setFiles(newFiles);
        removedFileId(e.currentTarget.id);
    }

    let $videoPreview = [];

    if (videoPreviewUrl.length > 0) {
        for (let i = 0; i < (videoPreviewUrl.length); i++) {
            $videoPreview.push(<div id="fileBlock" className={classes.video}>
                <span className="cancel" id={currentId[i]} onClick={e => handleRemovevideo(e, videoPreviewUrl[i], files[i])}>
                    <CancelIcon />
                </span>
                <ReactPlayer
                    controls={true}
                    url={videoPreviewUrl[i]} />
            </div>);
        }
    } else {
        $videoPreview.push(<div className="previewText">{title}</div>);
    }
    return (
        <Box>
            <Box className={classes.uploadFile}>
                <input type='file' className="input" multiple={multiple} onChange={e => uploadFile(e)} />
                <div className='file'>
                    <div className='blockPart'>
                        {$videoPreview.map((item, index) => (<span key={index}>{item}</span>))}
                        {$videoPreview[0].props.className === 'previewText' ? '' : <div className="addIcon">
                            <AddIcon />
                        </div>}
                    </div>
                </div>
            </Box>
            <Typography className={clsx(gClasses.validation, lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>{validation}</Typography>
        </Box>
    );
}

export default withNamespaces('users,translation')(UploadVideo);
