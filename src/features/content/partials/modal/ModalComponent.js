import { getNewsCategory, getStates } from 'core/services/content.service';

export const getNewsCategoryMethod = (contentType, setLoading, setNewsCategory) => {
  if (contentType === 'news') {
    setLoading(true);
    getNewsCategory(setLoading).then(response => {
      setLoading(false);
      setNewsCategory(response.data);
    });
  }
};

export const getStatesMethod = (contentType, setLoading, setStates) => {
  if (contentType === 'news') {
    setLoading(true);
    getStates(setLoading).then(response => {
      setLoading(false);
      setStates(response.data);
    });
  }
};

export const changeContentWhenChangingContentType = (
  id,
  contentType,
  setContent,
  newPage,
  newNews,
  newArticle,
  newSounds,
  newVideos,
  newImages,
  defaultContent
) => {
  if (id === '') {
    switch (contentType) {
      case 'page':
        setContent(newPage);
        break;
      case 'news':
        setContent(newNews);
        break;
      case 'article':
        setContent(newArticle);
        break;
      case 'sounds':
        setContent(newSounds);
        break;
      case 'videos':
        setContent(newVideos);
        break;
      case 'images':
        setContent(newImages);
        break;
      default:
        setContent(defaultContent);
    }
  }
};
