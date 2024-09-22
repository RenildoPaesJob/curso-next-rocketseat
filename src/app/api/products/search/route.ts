import type { NextRequest } from 'next/server'
import { z } from 'zod'
import data from '../data.json'

// _ => pattern para quando não usa um variavel (ex: request)
export async function GET(request: NextRequest) {
	// so é possivel acessar a propriedade "nextUrl" pq a var. request é do tipo NextRequest
	const { searchParams } = request.nextUrl
	// diferença entre parse e safeparse
	// safeparse => não	retorna um erro
	// parse => retorna um erro
	const query = z.string().parse(searchParams.get('q'))

	const products = data.products.filter((product) => {
		return product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
	})

	return Response.json(products)
}
