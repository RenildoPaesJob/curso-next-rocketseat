/* eslint-disable @next/next/no-img-element */
import { api } from '@/app/data/api'
import type { Product } from '@/app/data/types/product'
import { env } from '@/env'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
	const response = await api(`/products/${slug}`, {
		next: {
			revalidate: 60 * 60, // após 1hour essa requesição será refeita.
		},
	})

	const products = await response.json()

	return products
}

// Image generation
export default async function OgImage({
	params,
}: {
	params: { slug: string }
}) {
	const product = await getProduct(params.slug)

	const productImageURL = new URL(product.image, env.APP_BASE_URL).toString()

	// Font
	// const interSemiBold = fetch(
	// 	new URL('./Inter-SemiBold.ttf', import.meta.url),
	// ).then((res) => res.arrayBuffer())

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					background: colors.zinc[950],
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<img
					src={productImageURL}
					alt={product.title}
					style={{ width: '100%' }}
				/>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			// fonts: [
			// 	{
			// 		name: 'Inter',
			// 		data: await interSemiBold,
			// 		style: 'normal',
			// 		weight: 400,
			// 	},
			// ],
		},
	)
}
