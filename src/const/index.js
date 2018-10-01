
export const DEFAULT_QUERY = 'redux';
export const DEFAULT_HPP = '4';

export const PATH_BASE = 'https://hn.algolia.com/api/v1';
export const PATH_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';
export const PARAM_HPP = 'hitsPerPage=';

export const API_URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_HPP}${DEFAULT_HPP}&${PARAM_SEARCH}`
