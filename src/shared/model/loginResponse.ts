export interface ILoginResponse {
	token: string
	userData: {
		id: number
		email: string
		nickname: string
	}
}
