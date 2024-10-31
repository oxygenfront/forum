export enum ApiTag {
	AUTH = 'auth',
	CHAPTERS = 'chapters',
}

export enum RequestMethod {
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export const API_BASE_URL = 'https://a09ab73da26c002e.mokky.dev/'
const CHAPTERS = 'chapters'
const USERS = 'users'
const _CREATE = 'create'
const _UPDATE = 'update'
const _DELETE = 'delete'

const AUTH = 'auth'
const REGISTER = 'register'
const AUTH_ME = 'auth_me'

export const AUTH_ME_API = `${AUTH_ME}`
export const AUTH_LOGIN_API = `${AUTH}`
export const AUTH_API = `${AUTH}`
export const CHAPTERS_API = `${CHAPTERS}`
export const USER_REGISTER_API = `${REGISTER}`
export const GET_USERS_API = USERS
