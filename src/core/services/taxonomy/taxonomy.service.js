import axios from 'axios';
import {
  getTaxonomiesUrl,
  getTermsUrl,
  getTaxonomyImagesUrl,
  getTaxonomySoundsUrl,
  getTaxonomyVideosUrl,
  getTaxonomyTagsUrl,
} from 'utils/urls/taxonomy.urls';
import { chahauthHeader, authHeader } from 'utils/headers';
import { Method } from 'infrastructure/layout.js';

export function getTaxonomies(setLoading) {
  return Method({ method: 'get', url: getTaxonomiesUrl, headers: authHeader(), setLoading: setLoading });
}

export function getTerms(term) {
  return axios.get(getTermsUrl(term), chahauthHeader());
}

export function getTaxonomyImages(setLoading) {
  return Method({ method: 'get', url: getTaxonomyImagesUrl, headers: authHeader(), setLoading: setLoading });
}

export function getTaxonomySounds(setLoading) {
  return Method({ method: 'get', url: getTaxonomySoundsUrl, headers: authHeader(), setLoading: setLoading });
}

export function getTaxonomyTags(setLoading) {
  return Method({ method: 'get', url: getTaxonomyTagsUrl, headers: authHeader(), setLoading: setLoading });
}

export function getTaxonomyVideos(setLoading) {
  return Method({ method: 'get', url: getTaxonomyVideosUrl, headers: authHeader(), setLoading: setLoading });
}
