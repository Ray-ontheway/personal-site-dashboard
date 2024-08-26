const USER_BASE_API_PATH = '/api/user'
const ROLE_BASE_API_PATH = '/api/role'

export enum UserApiPath {
  LOGIN = `${USER_BASE_API_PATH}/login`,
  OPT_CODE = `${USER_BASE_API_PATH}/opt/code`,
  PAGE = `${USER_BASE_API_PATH}/page`,
  SEARCH = `${USER_BASE_API_PATH}/search`,
  DENY = `${USER_BASE_API_PATH}/deny`,
  UPDATE_ROLES = `${USER_BASE_API_PATH}/update/roles`,
  ALL_ROLES = `${ROLE_BASE_API_PATH}/roles`,
}

const ARTICLE_BASE_API_PATH = '/api/article'
export enum ArticleApiPath {
  ALL_BY_USER = `${ARTICLE_BASE_API_PATH}/all/`,
  CREATE = `${ARTICLE_BASE_API_PATH}/create`,
  UPDATE = `${ARTICLE_BASE_API_PATH}/update`,
  DELETE = `${ARTICLE_BASE_API_PATH}/delete`,
  PAGE = `${ARTICLE_BASE_API_PATH}/page`,
  DETAIL = `${ARTICLE_BASE_API_PATH}/post`,
}

const ARTICLE_TAG_BASE_API_PATH = '/api/article/tag'
export enum ArticleTagApiPath {
  CREATE = `${ARTICLE_TAG_BASE_API_PATH}/create`,
  UPDATE = `${ARTICLE_TAG_BASE_API_PATH}/update`,
  DELETE = `${ARTICLE_TAG_BASE_API_PATH}/delete`,
  PAGE = `${ARTICLE_TAG_BASE_API_PATH}/page`,
  ALL = `${ARTICLE_TAG_BASE_API_PATH}/all`,
}

const ARTICLE_TYPE_BASE_API_PATH = '/api/article/type'
export enum ArticleTypeApiPath {
  CREATE = `${ARTICLE_TYPE_BASE_API_PATH}/create`,
  UPDATE = `${ARTICLE_TYPE_BASE_API_PATH}/update`,
  DELETE = `${ARTICLE_TYPE_BASE_API_PATH}/delete`,
  PAGE = `${ARTICLE_TYPE_BASE_API_PATH}/page`,
  ALL = `${ARTICLE_TYPE_BASE_API_PATH}/all`,
}
