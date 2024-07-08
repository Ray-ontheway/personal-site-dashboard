const USER_BASE_API_PATH = '/api/user'

export enum UserApiPath {
  LOGIN = `${USER_BASE_API_PATH}/login`,
  OPT_CODE = `${USER_BASE_API_PATH}/opt/code`,
  PAGE = `${USER_BASE_API_PATH}/page`,
}
