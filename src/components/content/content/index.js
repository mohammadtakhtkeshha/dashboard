import contentService from "core/services/content.service";

export function multiAction(selectedCheckBoxes,currentContents,status) {
    for (let selected of selectedCheckBoxes) {
        let currentContent = currentContents.filter(item => item.nid === selected);
        let index = currentContents.indexOf(currentContent[0]);
        switch(status) {
            case 'true':
                currentContents[index].status = status;
                break;
            case 'false':
                currentContents[index].status = status;
                break;
            default:
                currentContents.splice(index, 1);
        }
    }
    return currentContents;
}


/* description : fill content form for edit form
 *   @param(number) : id for the selected content
 */
export const setContentWhenEditButtonClicked = (id,setContent, setSingleImgs, setMultiImgs, setVideos, setVoices, setFiles,appContext,setErrors) => {
    contentService.getContent(id).then((response) => {
        appContext.setLoading(false);

        const item = response.data;
        setContent(item);
        /*
        * for making fid and url to show when hit update button
        * */
        const makeArrayOfFidAndUrl = (fidString, urlString) => {
            let arr = [];
                const fidArray = fidString.split(',');
                const urlArray = urlString.split(',');
                for (let i in fidArray) {
                    arr.push({fid: fidArray[i], url: urlArray[i]});
                }
                return arr;
        }
        // ------------- set multiimgs for the edit time -------------
        const singgleImgFidString = item.field_image?.target_id;
        // ------------- set multiimgs for the edit time -------------
        const multiImgFidString = item.field_field_galeries?.target_id;
        const multiImgUrlString = item.field_field_galeries?.url;
        const multiImgs = multiImgFidString !== undefined ? makeArrayOfFidAndUrl(multiImgFidString, multiImgUrlString):[];
        // ------------- set multiimgs for the edit time -------------
        const videoesFidString = item.field_videos?.target_id;
        const videosUrlString = item.field_videos?.url;
        const videos = videoesFidString !== undefined ? makeArrayOfFidAndUrl(videoesFidString, videosUrlString):[];
        // ------------- set multiimgs for the edit time -------------
        const filesFidString = item.field_files?.target_id;
        const filesUrlString = item.field_files?.url;
        const files = filesFidString !== undefined ? makeArrayOfFidAndUrl(filesFidString, filesUrlString):[];
        // ------------- set multiimgs for the edit time -------------
        const voicesFidString = item.field_sounds?.target_id;
        const voicesUrlString = item.field_sounds?.url;
        const voices = voicesFidString !== undefined ? makeArrayOfFidAndUrl(voicesFidString, voicesUrlString):[];
        // ------------- sets -------------
        setSingleImgs(singgleImgFidString !== undefined ?[{fid: item.field_image.target_id, url: item.field_image.url}] : []);
        setMultiImgs(multiImgs);
        setVideos(videos);
        setVoices(voices);
        setFiles(files);
    }).catch((error) => {
        console.log(error);
    });
}


export default {multiAction,setContentWhenEditButtonClicked};
