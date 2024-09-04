import { api } from '@/app/data/api'
import type { Product } from '@/app/data/types/product'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

interface ProductProps {
	params: {
		slug: string
	}
}

async function getProduct(slug: string): Promise<Product> {
	const response = await api(`/products/${slug}`, {
		next: {
			revalidate: 60 * 60, // após 1hour essa requesição será refeita.
		},
	})

	const products = await response.json()

	return products
}

async function ProductPage({ params }: ProductProps) {
	const product = await getProduct(params.slug)

	return (
		<div className="flex flex-col gap-4 justify-center items-center md:flex-row max-h-[860px] md:gap-0">
			{/* Image */}
			<div className="cols-span-2 overflow-hidden">
				<Image
					src={product.image}
					alt={product.title}
					width={1000}
					height={1000}
					quality={100}
				/>
			</div>

			{/* Description */}
			<div className="flex flex-col justify-center px-12">
				<h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

				<p className="mt-2 leading-relaxed text-zinc-400 text-justify">
					{product.description}
				</p>

				<div className="mt-8 flex items-center gap-3">
					<span className="inline-block px-5 py-2.5 font-semibold rounded-full bg-violet-500">
						{formatCurrency(product.price)}
					</span>
					<span className="text-sm text-zinc-400">
						Em 12x s/ juros de R$10,75
					</span>
				</div>

				<div className="mt-8 space-y-8">
					<span className="block font-semibold">Tamanhos</span>

					<div className="flex gap-2">
						<button
							type="button"
							className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
						>
							P
						</button>
						<button
							type="button"
							className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
						>
							M
						</button>
						<button
							type="button"
							className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
						>
							G
						</button>
						<button
							type="button"
							className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
						>
							GG
						</button>
					</div>
				</div>

				<Button className="mt-8 flex h-12 items-center justify-center bg-emerald-600 rounded-full font-semibold">
					Adicionar ao carrinho
				</Button>
			</div>
		</div>
	)
}

export default ProductPage
