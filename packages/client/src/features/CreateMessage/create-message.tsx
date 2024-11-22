import { CustomTextarea } from '@/features/CreateMessage/CustomTextArea'
import { useCreateMessageMutation } from '@/features/CreateMessage/api'
import { selectMessage } from '@/features/CreateMessage/model'
import { useAppSelector } from '@/shared/lib/hooks.ts'
import styles from './create-message.module.sass'

interface ICreateMessageProps {
	themeId: string
}
export const CreateMessage = (props: ICreateMessageProps) => {
	const selectData = useAppSelector(selectMessage)
	const [createMessage] = useCreateMessageMutation()

	function handleCreateMessage() {
		createMessage(selectData)
	}

	return (
		<>
			<div className={styles.wrapper}>
				<CustomTextarea themeId={props.themeId} />
			</div>
			<div className={styles.button_wrapper}>
				<button
					type='button'
					className={styles.button}
					onClick={handleCreateMessage}
				>
					Отправить
				</button>
			</div>
		</>
	)
}
