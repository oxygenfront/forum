import { Injectable } from '@nestjs/common'

@Injectable()
export class PaginationService {
	paginate(data: any[], page: number, limit: number) {
		const totalItems = data.length
		const totalPages = Math.ceil(totalItems / limit)
		const offset = (page - 1) * limit

		const paginatedData = data.slice(offset, offset + limit)

		return {
			data: paginatedData,
			meta: {
				totalItems,
				totalPages,
				currentPage: page,
				itemsPerPage: limit,
			},
		}
	}
}
