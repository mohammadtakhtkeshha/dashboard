import { uploadVideo, uploadVoice } from 'core/services/content.service';
// import {uploadMultiImg,uploadMultiFile} from "core/services/content.service";

/* description : first request to upload img in server
 *                in response save the id in content like :
 *                field_field_galeries: {target_id: "1645", target_type: "file"}
 *
 *    @param(number) : id is uniqe ...
 *     ...
 *     @return (object) : like this: {id: 52, name: fdsf}
 */

// export const uploadMultiImgMethod = (file, contentsContext, setMultiImgFids, setLoading, setMultiImgToSendFid) => {
//     if (file.length > 0) {
//         for (let e of file) {
//             uploadMultiImg(e,setLoading).then((response) => {
//                 const item = response.data;
//                 setMultiImgToSendFid({id: item.fid, file: e});
//                 const lastPartOfImgUrl = item.uri.slice(9);
//                 const currentImgUrl = `http://dash.webrbp.ir/sites/default/files/${lastPartOfImgUrl}`;
//                 // contentsContext.setMultiImgs(prevState => {
//                 //     return [...prevState,{fid:item.fid,url:currentImgUrl}]
//                 // });
//                 setMultiImgFids(prevState => {
//                     return [...prevState, {fid: response.data.fid, name: e.name, url: currentImgUrl}];
//                 });
//                 contentsContext.setContent(prevState => {
//                     let fids = [];
//                     if (prevState.field_field_galeries.target_id !== undefined) {
//                         fids.push(prevState.field_field_galeries.target_id, response.data.fid);
//                     } else {
//                         fids.push(response.data.fid);
//                     }
//                     let lastFids = fids.toString();
//                     return {
//                         ...prevState, field_field_galeries: {
//                             "target_id": lastFids,
//                             "target_type": "file"
//                         }
//                     }
//                 });
//             });
//         }
//     } else {
//         contentsContext.setContent(prevState => {
//             return {
//                 ...prevState, multiImg: ''
//             }
//         });
//     }
// }

// export const uploadMultiFileMethod = (files, contentsContext, setMultiFileToSendId, setMultiImgFids, setLoading) => {
//     if (files.length > 0) {
//         let fids = [];
//         for (let e of files) {
//             uploadMultiFile(e).then((response) => {
//                 let item = response.data;
//                 let fidsString = fids.toString();
//                 setMultiFileToSendId({id: response.data.fid, file: e});
//                 setMultiImgFids(prevState => {
//                     return [...prevState, {fid: item.fid, name: e.name}];
//                 });
//                 contentsContext.setContent(prevState => {
//                     let fids = [];
//                     if (prevState.field_files.target_id !== undefined) {
//                         fids.push(prevState.field_files.target_id, item.fid);
//                     } else {
//                         fids.push(item.fid);
//                     }
//                     let lastFids = fids.toString();
//                     return {
//                         ...prevState, field_files: {
//                             "target_id": lastFids,
//                             "target_type": "file"
//                         }
//                     }
//                 });
//             }).catch((error) => {
//                 setLoading(false);
//             });
//         }
//     } else {
//         contentsContext.setContent(prevState => {
//             return {
//                 ...prevState, multiImg: ''
//             }
//         });
//     }
// }

export const uploadVideoMethod = (files, contentsContext, setLoading) => {
  for (let e of files) {
    setLoading(true);
    uploadVideo(e, setLoading).then(response => {
      setLoading(false);
      let item = response.data;
      contentsContext.setContent(prevState => {
        return {
          ...prevState,
          field_video: [
            ...prevState.field_video,
            {
              target_id: item.fid[0].value,
              target_type: 'file',
              url: item.uri[0].url,
            },
          ],
        };
      });
      contentsContext.setVideosAndUrl(prevState => {
        const baseUrl = process.env.REACT_APP_PICTURE_URL;
        const currentUrl = baseUrl + item.uri[0].url;
        return [...prevState, { id: item.fid[0].value, url: currentUrl }];
      });
    });
  }
};

export const uploadVoiceMethod = (files, contentsContext, setLoading) => {
  for (let e of files) {
    setLoading(true);
    uploadVoice(e, setLoading).then(response => {
      setLoading(false);
      let item = response.data;
      contentsContext.setVoicesAndUrl(prevState => {
        const baseUrl = process.env.REACT_APP_PICTURE_URL;
        const currentUrl = baseUrl + item.uri[0].url;
        return [...prevState, { id: item.fid[0].value, url: currentUrl }];
      });
      contentsContext.setContent(prevState => {
        return {
          ...prevState,
          field_sound: [
            ...prevState.field_sound,
            {
              target_id: item.fid[0].value,
              target_type: 'file',
            },
          ],
        };
      });
    });
  }
};

export const removeMultiFileMethod = (currentId, contentsContext) => {
  let fidsString = contentsContext.content.field_files.target_id;
  let fidsArray = fidsString.split(',');
  let currentIndex = fidsArray.indexOf(currentId);
  fidsArray.splice(currentIndex, 1);
  let field_file;
  if (fidsArray.length > 0) {
    field_file = { target_id: fidsArray.toString(), type: 'file' };
  } else {
    field_file = '';
  }
  contentsContext.setContent(prevState => {
    return {
      ...prevState,
      field_files: field_file,
    };
  });
};

export const removeVideoMethod = (currentId, contentsContext) => {
  let filteredFieldVideo = contentsContext.content.field_video.filter(video => video.target_id !== parseInt(currentId));
  let filteredVideosAndUrl = contentsContext.videosAndUrl.filter(item => item.id !== parseInt(currentId));
  contentsContext.setContent(prevState => {
    return {
      ...prevState,
      field_video: filteredFieldVideo,
    };
  });
  contentsContext.setVideosAndUrl(filteredVideosAndUrl);
};

export const removeVoiceMethod = (currentId, contentsContext) => {
  let filteredFieldSound = contentsContext.content.field_sound.filter(sound => sound.target_id !== parseInt(currentId));
  let filteredVoicesAndUrl = contentsContext.voicesAndUrl.filter(item => item.id !== parseInt(currentId));
  contentsContext.setContent(prevState => {
    return {
      ...prevState,
      field_sound: filteredFieldSound,
    };
  });
  contentsContext.setVoicesAndUrl(filteredVoicesAndUrl);
};

export const removeMultiImgMethod = (e, contentsContext) => {
  const id = parseInt(e.currentTarget.id);
  contentsContext.setContent(prevState => {
    let newImagesGallery = prevState['field_images_gallery'].filter(image => image.target_id !== id);
    return {
      ...prevState,
      field_images_gallery: newImagesGallery,
    };
  });
  contentsContext.setImgsAndUrls(prevState => {
    let idNumber = parseInt(id);
    let newImgsUrlAndId = prevState.filter(image => image.id !== idNumber);
    return [...newImgsUrlAndId];
  });
};
