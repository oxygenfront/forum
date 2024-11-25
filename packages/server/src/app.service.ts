import { Injectable } from '@nestjs/common'
import { Public } from '../decorators/public.decorator'

@Public()
@Injectable()
export class AppService {
	ping(): string {
		return 'pong'
	}
}
