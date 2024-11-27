export interface ICreateMessageReq {
	content: string
	themeId: string
	userId: string
}
export interface IMessageRes {
	id: string
	userId: string
	content: string
	themeId: string
	createdAt: string
	updateAt: string
}
