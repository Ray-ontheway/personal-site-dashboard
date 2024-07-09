const USER_BASE_API_PATH = '/api/user'

export enum UserApiPath {
  LOGIN = `${USER_BASE_API_PATH}/login`,
  OPT_CODE = `${USER_BASE_API_PATH}/opt/code`,
  PAGE = `${USER_BASE_API_PATH}/page`,
  SEARCH = `${USER_BASE_API_PATH}/search`,
  DENY = `${USER_BASE_API_PATH}/deny`,
  UPDATE_ROLES = `${USER_BASE_API_PATH}/update/roles`,
}
