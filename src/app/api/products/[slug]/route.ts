import { z } from 'zod'
import data from '../data.json'

// _ => pattern para quando não usa um variavel (ex: request)
export async function GET(
	_: Request,
	{ params }: { params: { slug: string } },
) {
	const slug = z.string().parse(params.slug)

	const product = data.products.filter((product) => product.slug === slug)

	// validation for bad requests
	if (!product) {
		return Response.json({
			message: 'Product not found!',
			status: 400,
		})
	}

	return Response.json(product)
}
