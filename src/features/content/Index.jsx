import React, {useCallback, useContext, useEffect, useState} from 'react';
import {withNamespaces} from 'react-i18next';

import {Box} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Modal from './partials/modal/ModalComponent.jsx';
import ContentSearchExpansion from './partials/ContentsFilterComponent.jsx';
import TitleComponent from 'features/partials/TitleComponent';
import AppContext from 'contexts/AppContext';
import ContentActionComponent from './partials/ContentActionComponent.jsx';
import ContentTableComponent from './partials/table/ContentTableComponent.jsx';
import ContentsContext from 'contexts/ContentsContext';
import {StyledBox} from 'assets/js/library/base/box';
import ContentHeaderComponent from './partials/header/Index.jsx';
import {StyledPaginationBox} from 'assets/js/pagination';
import {
    setContentWhenEditButtonClicked,
    handleOpenContentFormMethod,
    getRegisteredContentMethod,
    handleCloseContentFormMethod,
    handlePaginationMethod,
    getContentsMethod,
    defaultNewPage,
    defaultContent,
    defaultNewNews,
    defaultNewSounds,
    defaultNewVideos,
    defaultNewImages,
    getTagsMethod,
    defaultNewArticle,
} from './Index.js';
import {
    getNewsCategoryMethod,
    getStatesMethod,
    changeContentWhenChangingContentType
} from './partials/modal/ModalComponent.js';

function ContentsComponent({t}) {
    const {setLoading} = useContext(AppContext);
    const [openRegisterForm, setOpenRegisterForm] = useState(false);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [expandedFilter, setExpandedFilter] = useState(false);
    const [newsCategory, setNewsCategory] = useState([]);
    const [page, setPage] = useState(0);
    const [states, setStates] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [contents, setContents] = useState([]);
    const [contentType, setContentType] = useState('');
    const [chunkContents, setChunkContents] = useState([]);
    const [id, setId] = useState('');
    const [errors, setErrors] = useState({});
    const [src, setSrc] = useState('');
    const [urls, setUrls] = useState({});
    const [newPage, setNewPage] = useState(defaultNewPage);
    const [newArticle, setNewArticle] = useState(defaultNewArticle);
    const [newNews, setNewNews] = useState(defaultNewNews);
    const [newSounds, setNewSounds] = useState(defaultNewSounds);
    const [newImages, setNewImages] = useState(defaultNewImages);
    const [newVideos, setNewVideos] = useState(defaultNewVideos);
    const [content, setContent] = useState(defaultContent);
    const [imgsAndUrls, setImgsAndUrls] = useState([]);
    const [imgAndUrl, setImgAndUrl] = useState([]);
    const [videosAndUrl, setVideosAndUrl] = useState([]);
    const [voicesAndUrl, setVoicesAndUrl] = useState([]);
    const [filesPreviewUrl, setFilesPreviewUrl] = useState([]);
    const [tags, setTags] = useState([]);
    const handlePagination = useCallback((contents, setContentsState, action) => {
        handlePaginationMethod(setSelectedCheckBoxes, action, setContentsState, setContents, contents, setTotalPage, setChunkContents);
    }, []);
    const [author,setAuthor]=useState('')

    const paginate = (e, value) => {
        setPage(value - 1);
        setSelectedCheckBoxes([]);
    };

    const handleCloseContentForm = () => {
        handleCloseContentFormMethod(
            setOpenRegisterForm,
            setId,
            setContent,
            setImgsAndUrls,
            setImgAndUrl,
            setVideosAndUrl,
            setVoicesAndUrl,
            setFilesPreviewUrl,
            setErrors,
            setContentType,
            setSelectedTags
        );
    };

    const getRegisteredContent = content => {
        getRegisteredContentMethod(t, content, contents, id, handlePagination, handleCloseContentForm,author);
    };

    const handleOpenContentForm = (e,passedAuthor) => {
        handleOpenContentFormMethod(e, setOpenRegisterForm, setId, setLoading,passedAuthor,setAuthor);
    };

    useEffect(() => {
        getContentsMethod(setLoading, handlePagination);
        getTagsMethod(setLoading, setTags);
    }, [setLoading, handlePagination]);

    useEffect(() => {
        if (id !== '') {
            setErrors({});
            setContentWhenEditButtonClicked(id,setId,setOpenRegisterForm,setContent,setImgAndUrl,setImgsAndUrls,setVideosAndUrl,setVoicesAndUrl,
                setLoading,
                setContentType,
                setErrors,
                setSelectedTags
            );
        }
    }, [id, setLoading]); //id

    useEffect(() => {
        changeContentWhenChangingContentType(id, contentType, setContent, defaultNewPage, defaultNewNews, defaultNewArticle, defaultNewSounds, defaultNewVideos, defaultNewImages, defaultContent);
    }, [id, contentType]); //contentType

    useEffect(() => {
        getNewsCategoryMethod(contentType, setLoading, setNewsCategory);
        getStatesMethod(contentType, setLoading, setStates);
    }, [contentType, setLoading]); //contentType

    return (
        <ContentsContext.Provider
            value={{
                contents: contents,
                src: src,
                setSrc: setSrc,
                content: content,
                getRegisteredContent: getRegisteredContent,
                setContent: setContent,
                setTags: setTags,
                tags: tags,
                chunkContents: chunkContents,
                handlePagination: handlePagination,
                id: id,
                setId: setId,
                newPage: newPage,
                setNewPage: setNewPage,
                newArticle: newArticle,
                setNewArticle: setNewArticle,
                newNews: newNews,
                setNeNews: setNewNews,
                newSounds: newSounds,
                setNewSounds: setNewSounds,
                newVideos: newVideos,
                setNewVideos: setNewVideos,
                newImages: newImages,
                setNewImages: setNewImages,
                setErrors: setErrors,
                errors: errors,
                urls: urls,
                setUrls: setUrls,
                imgsAndUrls: imgsAndUrls,
                setImgsAndUrls: setImgsAndUrls,
                imgAndUrl: imgAndUrl,
                setImgAndUrl: setImgAndUrl,
                videosAndUrl: videosAndUrl,
                setVideosAndUrl: setVideosAndUrl,
                voicesAndUrl: voicesAndUrl,
                setVoicesAndUrl: setVoicesAndUrl,
                filesPreviewUrl: filesPreviewUrl,
                setFilesPreviewUrl: setFilesPreviewUrl,
                newsCategory: newsCategory,
                states: states,
                setContentType: setContentType,
                contentType: contentType,
                selectedTags: selectedTags,
                setSelectedTags: setSelectedTags,
            }}>
            <ContentHeaderComponent handleOpenContentForm={handleOpenContentForm} setExpandedFilter={setExpandedFilter}/>
            <StyledBox>
                <ContentSearchExpansion setExpandedFilter={setExpandedFilter} expandedFilter={expandedFilter}/>
            </StyledBox>
            <StyledBox>
                <ContentTableComponent
                    page={page}
                    selectedCheckBoxes={selectedCheckBoxes}
                    contents={contents}
                    setSelectedCheckBoxes={setSelectedCheckBoxes}
                    setContents={setContents}
                    handleOpenContentForm={handleOpenContentForm}
                />
            </StyledBox>
            <ContentActionComponent selectedCheckBoxes={selectedCheckBoxes}
                                    setSelectedCheckBoxes={setSelectedCheckBoxes}/>
            <StyledPaginationBox>
                <Pagination count={totalPage} onChange={paginate}/>
            </StyledPaginationBox>
            <TitleComponent title="contents"/>
            <Box>
                <Modal setContent={setContent} handleCloseContentForm={handleCloseContentForm}
                       openRegisterForm={openRegisterForm}/>
            </Box>
        </ContentsContext.Provider>
    );
}

export default withNamespaces('contents,translation')(ContentsComponent);
