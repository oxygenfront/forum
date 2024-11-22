export enum ApiTag {
	AUTH = 'auth',
	CHAPTERS = 'chapters',
	USERS = 'users',
	THEMES = 'themes',
	MESSAGE = 'message',
}

export enum RequestMethod {
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}

const CREATE = 'create'
const UPDATE = 'update'
const DELETE = 'delete'

const CHAPTERS = 'chapters'
const USERS = 'users'
const THEMES = 'themes'
const MESSAGE = 'message'

const LOGIN = 'auth'
const REGISTER = 'register'
const AUTH_ME = 'auth_me'

// Base URL
export const API_BASE_URL = 'http://localhost:3004/api'

// Authentication
export const AUTH_ME_API = `${AUTH_ME}`
export const AUTH_LOGIN_API = `${LOGIN}`
export const AUTH_REGISTER_API = `${REGISTER}`

// Chapters
export const GET_CHAPTERS = `${CHAPTERS}`
export const CREATE_CHAPTER_BY_ID = `${CHAPTERS}/${CREATE}/:id`
export const UPDATE_CHAPTER_BY_ID = `${CHAPTERS}/${UPDATE}/:id`
export const DELETE_CHAPTER_BY_ID = `${CHAPTERS}/${DELETE}/:id`

//Users
export const GET_USERS = `${USERS}`
export const GET_USERS_BY_ID = `${USERS}/:id`
export const GET_USERS_BY_USERNAME = `${USERS}/:username`
export const GET_USER_BY_EMAIL = `${USERS}/:email`
export const CREATE_USER = `${USERS}/${CREATE}`
export const UPDATE_USERS_BY_ID = `${USERS}/${UPDATE}/:id`
export const DELETE_USERS_BY_ID = `${USERS}/${DELETE}:id`

// Theme Chapter
export const GET_THEMES = `${THEMES}`
export const GET_THEME_ID = `${THEMES}/:id`
export const CREATE_THEME_BY_ID = `${THEMES}/${CREATE}`
export const DELETE_THEME_BY_ID = `${THEMES}/${DELETE}/:id`
export const UPDATE_THEME_BY_ID = `${THEMES}/${UPDATE}/:id`

// Message
export const UPDATE_MESSAGE_BY_ID = `${MESSAGE}/${UPDATE}/:id`
export const CREATE_MESSAGE = `${MESSAGE}/${CREATE}`
export const DELETE_MESSAGE_BY_ID = `${MESSAGE}/${DELETE}/:id`
export const GET_MESSAGE_BY_ID = `${MESSAGE}/:id`
