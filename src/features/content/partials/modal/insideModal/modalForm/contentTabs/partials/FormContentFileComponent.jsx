import React, { useContext } from 'react';
import { withNamespaces } from 'react-i18next';

import { Grid, withStyles } from '@material-ui/core';

import UploadFile from 'infrastructure/authorized/partials/UploadImgComponent.jsx';
import AppContext from 'contexts/AppContext';
import { removeMultiImgMethod, uploadVideoMethod, uploadVoiceMethod, removeVideoMethod, removeVoiceMethod } from './FormContentFileComponent.js';
import { uploadImgMethod } from './FormContentTitleAndImgComponent.js';

import ContentsContext from 'contexts/ContentsContext';
import { StyledAlignTypography } from 'assets/js/App';
import { styledGridSoundFile, styledGridVideoFile } from 'assets/js/content/partials/modal/insideModal/modalForm/contentTabs/contentTabs';
import UploadImgComponent from 'infrastructure/authorized/partials/UploadImgComponent';
import {
  styledGridMultiImgBlock,
  StyledImgsInputBlock,
} from 'assets/js/content/partials/modal/insideModal/modalForm/contentTabs/partials/formContentTitleAndImg';

const StyledGridSoundFile = withStyles(styledGridSoundFile)(Grid);
const StyledGridVideoFile = withStyles(styledGridVideoFile)(Grid);
const StyledGridMultiImgBlock = withStyles(styledGridMultiImgBlock)(Grid);

function FormContentFileComponent({ t, contentype }) {
  const {setLoading} = useContext(AppContext);
  const contentsContext = useContext(ContentsContext);

  const uploadVideo = files => {
    uploadVideoMethod(files, contentsContext, setLoading);
  };

  const uploadVoice = files => {
    uploadVoiceMethod(files, contentsContext, setLoading);
  };

  const removeVideo = e => {
    removeVideoMethod(e.currentTarget.id, contentsContext);
  };

  const removeVoice = e => {
    removeVoiceMethod(e.currentTarget.id, contentsContext);
  };

  const uploadImg = (e, multiple) => {
    uploadImgMethod(e, multiple, contentsContext, setLoading);
  };

  const removeImg = e => {
    removeMultiImgMethod(e, contentsContext);
  };
  return (
    <Grid container>
      <StyledGridVideoFile contentype={contentype} item xs={12} className="videos">
        <StyledAlignTypography>{t('contents:videoGallery')}</StyledAlignTypography>
        <UploadFile
          type="video"
          multiple={true}
          getFileInParent={e => uploadVideo(e, 'multiple')}
          imgsAndUrls={contentsContext.videosAndUrl}
          title={t('translation:chooseVideo')}
          removeImgInParent={removeVideo}
        />
      </StyledGridVideoFile>
      <StyledGridSoundFile contentype={contentype} item xs={12} className="sounds">
        <StyledAlignTypography>{t('contents:voiceGallery')}</StyledAlignTypography>
        <UploadFile
          type="voice"
          multiple={true}
          getFileInParent={e => uploadVoice(e, 'multiple')}
          imgsAndUrls={contentsContext.voicesAndUrl}
          title={t('translation:chooseVoice')}
          removeImgInParent={removeVoice}
        />
      </StyledGridSoundFile>

      <StyledGridMultiImgBlock contentype={contentype} item xs={12} className="images">
        <UploadImgComponent
          type="image"
          getFileInParent={e => uploadImg(e, 'multiple')}
          imgsAndUrls={contentsContext.imgsAndUrls}
          title={t('translation:choosePic')}
          removeImgInParent={e => removeImg(e)}
          multiple={true}
        />
        <StyledImgsInputBlock
          showImgInputs={
            (contentsContext.content.field_images_gallery !== undefined && contentsContext.content.field_images_gallery.length) > 0 ? true : false
          }></StyledImgsInputBlock>
      </StyledGridMultiImgBlock>
    </Grid>
  );
}

export default withNamespaces('contents,translation')(FormContentFileComponent);
