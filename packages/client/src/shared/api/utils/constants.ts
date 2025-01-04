// Base URL
export const API_BASE_URL = 'http://localhost:3004/api'

export enum ApiTag {
	AUTH = 'auth',
	CHAPTERS = 'chapters',
	USERS = 'users',
	THEMES = 'themes',
	MESSAGE = 'message',
	SEARCH = 'search',
	STATS = 'stats',
	PURCHASED = 'purchased',
	CHATS = 'chats',
}

export enum RequestMethod {
	POST = 'POST',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
	GET = 'GET',
}

const CREATE = 'create'
const UPDATE = 'update'
const DELETE = 'delete'

// Routes
const CHAPTERS = 'chapters'
const USERS = 'users'
const THEMES = 'themes'
const MESSAGE = 'message'
const AUTH = 'auth'
const LOGIN = 'login'
const REGISTER = 'register'
const AUTH_ME = 'auth_me'
const LOGOUT = 'logout'
const REFRESH = 'refresh'
const SEARCH = 'search'
const STATS = 'stats'
const PURCHASED = 'purchased'
const CHATS = 'chats'

// Authentication
export const AUTH_ME_API = `${AUTH}/${AUTH_ME}`
export const AUTH_LOGIN_API = `${AUTH}/${LOGIN}`
export const AUTH_REGISTER_API = `${AUTH}/${REGISTER}`
export const AUTH_LOGOUT = `${AUTH}/${LOGOUT}`
export const AUTH_REFRESH = `${AUTH}/${REFRESH}`

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
export const DELETE_THEME_BY_ID = `${THEMES}/${DELETE}`
export const UPDATE_THEME_BY_ID = `${THEMES}/${UPDATE}`

// Message
export const UPDATE_MESSAGE = `${MESSAGE}/${UPDATE}`
export const CREATE_MESSAGE = `${MESSAGE}/${CREATE}`
export const DELETE_MESSAGE_BY_ID = `${MESSAGE}/${DELETE}`
export const GET_MESSAGE_BY_ID = `${MESSAGE}`

// Search
export const SEARCH_ALL = `${SEARCH}/all`
export const SEARCH_USERS = `${SEARCH}/${USERS}`

// Stats
export const GET_STATS = `${STATS}`

// Latest purchased
export const GET_PURCHASED = `${PURCHASED}`

// Chats
export const CREATE_CHAT = `${CHATS}/${CREATE}`
export const GET_USER_CHATS = `${CHATS}`
export const GET_CHAT = `${CHATS}/current`
export const ADD_USER_IN_CHAT = `${CHATS}/addUser`
export const DELETE_USER_IN_CHAT = `${CHATS}/deleteUser`
