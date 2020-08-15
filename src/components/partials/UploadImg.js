import React, {useEffect, useState} from "react";
import {Box,Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import * as colors from './Colors.js';
import {withNamespaces} from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import {primary} from "./Colors";
import clsx from "clsx";
import {globalCss} from '../../assets/js/globalCss';
import i18next from "i18next";

const styles = makeStyles({
    uploadImg: {
        position: 'relative',
        minHeight: '120px',
        border: `1px solid ${colors.primary}`,
        '& input': {
            cursor: 'pointer',
        },
        '& .file': {
            position: 'absolute',
            top: '0',
            bottom: '0',
            width: '100%',
            opacity: 0,
        },
        '& .img': {
            minHeight: '120px',
            display: 'flex',
            // justifyContent:'center',
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
                '& #imgBlock': {
                    position: 'relative',
                    display: 'inline-block',
                    width: '100%',
                    '& #cancel': {
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '10px',
                        left: '12px',
                        color: colors.primary,
                    },
                    '& img': {
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
        },
    },
    validation:{
        color:'red',
    }
});

const gClass=makeStyles(globalCss);

function UploadImg({t,multiple, title, getFile, imgs}) {
    const classes = styles();
    const gClasses=gClass();
    const lang=i18next.language;
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [files, setFiles] = useState([]);
    const [validation, setValidation] = useState('');
    useEffect(() => {
        if (imgs && imgs[0] !== undefined && imgs.length > 0) {//for edit user
            let urls = [];
            for (let img of imgs) {
                urls.push(img.url);
            }
            setImagePreviewUrl([...urls]);
        }
    }, [imgs]);
    let uploadFile = (e) => {
        let extention = (e.currentTarget.files[0].name).split('.').pop();
        setValidation('');
        setFiles((prevState => {
            return [...prevState]
        }));
        setImagePreviewUrl((prevState => {
            return [...prevState]
        }));
        if (extention !== ('jpg' || 'jpeg' || 'png')) {
                setValidation(t('translation:imgValidation'));
            return
        }
        let arrayOfFiles = [];

        if (multiple) {//check mutliple img or not
            arrayOfFiles = e.currentTarget.files;
        } else {
            setFiles([]);
            setImagePreviewUrl([]);
            arrayOfFiles.push(e.currentTarget.files[0]);
        }
        getFile([...arrayOfFiles]);
        for (let i = 0; i < arrayOfFiles.length; i++) {
            let reader = new FileReader();
            reader.onload = () => {
                setFiles(prevState => {
                    return [...prevState, arrayOfFiles[i]];
                });
                setImagePreviewUrl(prevState => {
                    return [...prevState, reader.result]
                });
            }
            reader.readAsDataURL(arrayOfFiles[i]);
        }
    }

    let handleRemoveImg = (e, src) => {
        let index = imagePreviewUrl.indexOf(src);
        let newImgPreview = imagePreviewUrl.filter(item => item !== src);
        let deletedFile = files.splice(index, 1);
        let newFiles = files.filter(item => item !== deletedFile);
        setImagePreviewUrl(newImgPreview);
        setFiles(newFiles);
        getFile([...newFiles]);
    }

    let $imagePreview = [];
    if (imagePreviewUrl.length > 0) {
        for (let i = 0; i < (imagePreviewUrl.length); i++) {
            $imagePreview.push(<div id="imgBlock">
                    <span id='cancel' onClick={e => handleRemoveImg(e, imagePreviewUrl[i], files[i])}>
                        <CancelIcon/>
                    </span>
                <img src={imagePreviewUrl[i]}/>
            </div>);
        }
    } else {
        $imagePreview.push(<div className="previewText">{title}</div>);
    }
    return (
        <Box>
            <Box className={classes.uploadImg}>
                <input type='file' className="file" multiple={multiple} onChange={e => uploadFile(e)}/>
                <div className='img'>
                    <div className='blockPart'>
                        {$imagePreview.map((item, index) => (<span key={index}>{item}</span>))}
                        {$imagePreview[0].props.className === 'previewText' ? '' : <div className="addIcon">
                            <AddIcon/>
                        </div>}
                    </div>
                </div>
            </Box>
            <Typography className={clsx(classes.validation, lang==='en'?gClasses.textLeft:gClasses.textRight) }>{validation}</Typography>
        </Box>
    );
}

export default withNamespaces('users,translation')(UploadImg);