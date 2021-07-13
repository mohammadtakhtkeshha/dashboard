import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import CancelIcon from "@material-ui/icons/Cancel";

import {
    InputBlock,
    StyledAfterUploadBlock,
    StyledAfterUploadHere,
    StyledUploadedImgBlock,
    StyledUploadHereBlock,
    UploadedImgHoverBlock
} from "assets/js/partials/uploadImg";
import {StyledAlignTypography} from "assets/js/library/base/typography";
import {StyledValidError} from "assets/js/library/base/all";
import {ReactComponent as UploadImgSvg} from "assets/svg/uploadImgSvg.svg";
import ReactPlayer from "react-player";
import AudioPlayer from "material-ui-audio-player";

function UploadFileComponent({t, title, multiple, getFileInParent, imgsAndUrls, removeImgInParent, type}) {
    const lang = i18next.language;
    const [validation, setValidation] = useState('');

    const uploadImg = (e) => {
        let files = e.currentTarget.files;
        setValidation('');
        for (let file of files) {
            let extension = (file.name).split('.').pop();
            if (type === "image") {
                if (!['jpg', 'png', 'jpeg'].includes(extension)) {
                    setValidation(t('translation:imgValidation'));
                    return
                }
            } else if (type === "voice") {
                if (!['mp3'].includes(extension)) {
                    setValidation(t('translation:voiceValidation'));
                    return
                }
            } else {
                if (!['mp4'].includes(extension)) {
                    setValidation(t('translation:videoValidation'));
                    return
                }
            }
        }
        getFileInParent(e.currentTarget.files);
    }

    const handleRemoveImg = (e) => {
        removeImgInParent(e);
    }

    return (<>
        <InputBlock>
            {imgsAndUrls.length > 0 ?
                <>
                    <StyledAlignTypography align={lang}>
                        {type === 'image' ? t('translation:imgsList') : (
                            type === "video" ? t('translation:videosList') : t('translation:voicesList')
                        )}
                    </StyledAlignTypography>
                    <StyledAfterUploadBlock>
                        {imgsAndUrls.map((item, i) => {
                            return (<div key={i}>
                                <StyledUploadedImgBlock>
                                    {(type === 'image') ?
                                        <img src={item.url} alt={item.url}/>
                                        : (type === 'video' ?
                                                <ReactPlayer controls={true} url={item.url}/> :
                                                <AudioPlayer src={item.url}/>
                                        )}
                                    <UploadedImgHoverBlock>
                                    <span id={item.id} onClick={handleRemoveImg}>
                                    <CancelIcon/>
                                    </span>
                                    </UploadedImgHoverBlock>
                                </StyledUploadedImgBlock>
                            </div>)
                        })}
                        <StyledAfterUploadHere>
                            <input type='file' multiple={multiple} onChange={uploadImg}/>
                            <UploadImgSvg/>
                            <span>{type === 'image' ? t('translation:uploadNewImg') : (
                                type === "video" ? t('translation:uploadNewVideo') : t('translation:uploadNewVoice')
                            )}</span>
                        </StyledAfterUploadHere>
                    </StyledAfterUploadBlock>
                </>
                :
                <StyledUploadHereBlock>
                    <input type='file' multiple={multiple} onChange={uploadImg}/>
                    <UploadImgSvg/>
                    <p>{title}</p>
                    <button>{t('translation:choose')}</button>
                </StyledUploadHereBlock>
            }
        </InputBlock>
        <StyledValidError lang={lang}>
            {validation}
        </StyledValidError>
    </>);
}

export default withNamespaces('users,translation')(UploadFileComponent);

