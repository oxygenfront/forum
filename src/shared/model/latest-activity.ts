export interface ILatestActivity {
	user_id: string // uuid v4
	latest_question: string // latest question from user
	nickname: string // nickname user on forum
	created_at: string // date the message was created by the user
	image_user: string // avatar user in forum
}
