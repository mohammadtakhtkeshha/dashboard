import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from 'react-i18next';

import {Box} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Modal from "./partials/modal/ModalComponent.jsx";
import ContentSearchExpansion from "./partials/ContentsFilterComponent";
import TitleComponent from "components/partials/TitleComponent";
import contentService from "core/services/content.service";
import AppContext from "contexts/AppContext";
import ContentActionComponent from "./partials/action/ContentActionComponent";
import ContentTableComponent from "./partials/ContentTableComponent";
import {success} from "methods/swal";
import ContentsContext from "contexts/ContentsContext";
import {StyledPaper, StyledBox} from "assets/js/App";
import ContentHeaderComponent from "./partials/ContentHeaderComponent";
import {StyledPaginationBox} from "assets/js/pagination";
import {chunkItem, handleTotalPage} from "structure/layout";

function ContentsComponent({t}) {
    const appContext = useContext(AppContext);
    const [openRegisterForm, setOpenRegisterForm] = useState(false);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [contents, setContents] = useState([]);
    const [contentTypeList, setContentTypeList] = useState([]);
    const [chunkContents, setChunkContents] = useState();
    const [id, setId] = useState('');
    const [errors, setErrors] = useState({});
    const [src, setSrc] = useState('');
    const [singleImgs, setSingleImgs] = useState([]);
    const [multiImgs, setMultiImgs] = useState([]);
    const [videos, setVideos] = useState([]);
    const [files, setFiles] = useState([]);
    const [voices, setVoices] = useState([]);
    const [urls, setUrls] = useState({});
    const [content, setContent] = useState({
        "type": {
            "target_id": ""
        },
        "title": "",
        "body": "",
        "field_domain_access": {},
        "field_domain_all_affiliates": true,
        "field_domain_source": {},
        "field_field_galeries": {},
        "field_files": {},
        "field_image": {},
        "field_rotitr": "",
        "field_sotitr": "",
        "field_sounds": {},
        "field_article_cat": {},
        "field_tags": {},
        "field_seo_list": {},
        "field_videos": {},
        "field_special_news_display": false,
        "status": false,
    });
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);//base64
    const [multiImagePreviewUrl, setMultiImagePreviewUrl] = useState([]);//base64
    const [videoPreviewUrl, setvideoPreviewUrl] = useState([]);

    const getContents = () => {
        appContext.setLoading(true);
        contentService.getContents(appContext.handleError).then((response) => {
                let contents = response.data;
                appContext.setLoading(false);
                handlePagination(contents);
            }
        );
    }

    const paginate = (e, value) => {
        setPage(value - 1);
        getContents(value);
        setSelectedCheckBoxes([]);
    }

    const handlePagination = (contents, action) => {
        setContents(contents);
        let currentTotalPage = handleTotalPage(contents);
        setTotalPage(currentTotalPage);
        const chunked = chunkItem(contents);
        setChunkContents(chunked)
        setSelectedCheckBoxes([]);
        action && success(t(`translation:${action}`), t('translation:ok'));
    }

    const getContentType = () => {
        appContext.setLoading(true);
        contentService.getContentTypeList(appContext.handleError).then((response) => {
            appContext.setLoading(false);
            setContentTypeList(response.data);
        });
    }

    const getRegisteredContent = (content) => {
        const newContent = {
            type: content.target_id,
            status: `${content.status}`,
            title: content.title,
            uid: content.uid.target_uuid,
            changed: content.changed,
            nid: `${content.nid}`,
            field_image: content.field_image?.url
        }
        contents.unshift(newContent);
        handlePagination(contents, t('translation:successRegistered'));
    }

    const handleOpenContentForm = (e) => {
        const value = e.currentTarget.value;
        setOpenRegisterForm(true);
        if (value !== "") {
            setId(value);
        }
    }

    const handleCloseContentForm = (id) => {
        setOpenRegisterForm(false);
        setId('');
    }

    useEffect(() => {
        getContents(page);
        getContentType();
    }, []);

    useEffect(() => {
        contentService.getContent(id).then((response) => {
            const item = response.data;
            setContent(item);
            /*
            * for making fid and url to show when push update button
            * */
            const makeArrayOfFidAndUrl=(fidString,urlString)=>{
                const fidArray = fidString.split(',');
                const urlArray = urlString.split(',');
                let arr=[];
                for (let i in fidArray) {
                    arr.push({fid: fidArray[i], url: urlArray[i]});
                }
                return arr;
            }
            // ------------- set multiimgs for the edit time -------------
            const multiImgFidString = item.field_field_galeries.target_id;
            const multiImgUrlString = item.field_field_galeries.url;
            const multiImgs=makeArrayOfFidAndUrl(multiImgFidString,multiImgUrlString);
            // ------------- set multiimgs for the edit time -------------
            const videoesFidString = item.field_videos.target_id;
            const videosUrlString = item.field_videos.url;
            const videos = makeArrayOfFidAndUrl(videoesFidString,videosUrlString)
            // ------------- set multiimgs for the edit time -------------
            const filesFidString = item.field_files.target_id;
            const filesUrlString = item.field_files.url;
            const files=makeArrayOfFidAndUrl(filesFidString,filesUrlString);
            // ------------- set multiimgs for the edit time -------------
            const voicesFidString = item.field_sounds.target_id;
            const voicesUrlString = item.field_sounds.url;
            const voices=makeArrayOfFidAndUrl(voicesFidString,voicesUrlString);
            debugger
            // ------------- sets -------------
            setSingleImgs([{fid: item.field_image.target_id, url: item.field_image.url}]);
            setMultiImgs(multiImgs);
            setVideos(videos);
            setVoices(voices);
            setFiles(files);
        }).catch((error) => {
            console.log(error)
        });
    }, [id]);

    // console.log(content);

    return (<ContentsContext.Provider value={{
            contents: contents,
            src: src,
            setSrc: setSrc,
            chunkContents: chunkContents,
            contentTypeList: contentTypeList,
            handlePagination: handlePagination,
            getRegisteredContent: getRegisteredContent,
            id: id,
            setId: setId,
            content: content,
            setContent: setContent,
            setErrors: setErrors,
            errors: errors,
            urls: urls,
            setUrls: setUrls,
            singleImgs: singleImgs,
            setSingleImgs: setSingleImgs,
            multiImgs: multiImgs,
            setMultiImgs: setMultiImgs,
            videos: videos,
            setVideos: setVideos,
            files: files,
            setFiles: setFiles,
            voices: voices,
            setVoices: setVoices,
            setImagePreviewUrl: setImagePreviewUrl,
            imagePreviewUrl: imagePreviewUrl,
            multiImagePreviewUrl: multiImagePreviewUrl,
            setMultiImagePreviewUrl: setMultiImagePreviewUrl,
            videoPreviewUrl: videoPreviewUrl,
            setvideoPreviewUrl: setvideoPreviewUrl,
        }}>
            <StyledPaper>
                <ContentHeaderComponent setOpenRegisterForm={handleOpenContentForm}/>
                <StyledBox>
                    <ContentSearchExpansion/>
                </StyledBox>
                <StyledBox>
                    <ContentTableComponent selectedCheckBoxes={selectedCheckBoxes}
                                           contents={contents}
                                           setSelectedCheckBoxes={setSelectedCheckBoxes}
                                           page={page}
                                           setContents={setContents}
                                           handleOpenContentForm={handleOpenContentForm}/>
                </StyledBox>
                <ContentActionComponent selectedCheckBoxes={selectedCheckBoxes}
                                        setSelectedCheckBoxes={setSelectedCheckBoxes}/>
                <StyledPaginationBox>
                    <Pagination count={(totalPage)} onChange={paginate}/>
                </StyledPaginationBox>
            </StyledPaper>
            <TitleComponent title="contents"/>
            <Box>
                <Modal handleCloseContentForm={handleCloseContentForm} openRegisterForm={openRegisterForm}/>
            </Box>
        </ContentsContext.Provider>
    );
}

export default withNamespaces('contents')(ContentsComponent);