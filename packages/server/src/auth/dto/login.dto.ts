import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
	@ApiProperty()
	userEmail: string

	@ApiProperty()
	userPassword: string
}
