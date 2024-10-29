export interface ILatestActivity {
	id: string // uuid v4
	latest_question: string // latest question from user
	created_at: number // date the message was created by the user
}
