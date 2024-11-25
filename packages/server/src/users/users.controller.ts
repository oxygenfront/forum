import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Route, SwaggerApiTag } from '../../global/constants'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags(SwaggerApiTag.USERS)
@Controller(Route.USERS)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post(Route.CREATE)
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Get(Route.GET_BY_ID)
	findOne(@Param('id') id: string) {
		return this.usersService.findById(id)
	}

	@Get(Route.GET_BY_USERNAME)
	findByUsername(@Param('username') username: string) {
		return this.usersService.findByEmail(username)
	}

	@Get(Route.GET_BY_EMAIL)
	findByEmail(@Param('email') email: string) {
		return this.usersService.findByEmail(email)
	}

	@Patch(Route.UPDATE_BY_ID)
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto)
	}

	@Delete(Route.DELETE_BY_ID)
	remove(@Param('id') id: string) {
		return this.usersService.remove(id)
	}
}
