import { api } from '@/app/data/api'
import type { Product } from '@/app/data/types/product'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Cache & Memoization('useMemo' / 'memo' / 'useCallback')
 *
 * É um conceito e funcionalidade do REACT
 * Memoization do REACT garante que um método seja chamado SOMENTE UMA ÚNICA VEZ na mesma página.
 *
 * dentro do FETCH de dados, pode ser passado o parametros para dizer se o resultado do request deve ser
 * caheada ou não e além disso também é possivel definir um time para que a request seja feita novamente.
 *
 * 'force-cache' => true
 * 'no-store' => false
 *
 * next: {revalidate: 10} => A partir da primeira chamada da request sera cacheado por 10s o resultado.
 */
async function getFeaturedProducts(): Promise<Product[]> {
	const response = await api('/products/featured', {
		next: {
			revalidate: 60 * 60, // após 1hour essa requesição será refeita.
		},
	})

	const products = await response.json()

	return products
}

export default async function Home() {
	await new Promise((resolve) => setTimeout(resolve, 3000))

	const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

	return (
		<div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-4">
			<Link
				href={`/products/${highlightedProduct.slug}`}
				className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex flex-col justify-center items-center align-middle"
			>
				<Image
					src={highlightedProduct.image}
					alt={highlightedProduct.title}
					width={750}
					height={750}
					quality={100}
					className="group-hover:scale-105 transition-transform duration-300 relative"
				/>

				<div className="absolute bottom-16 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
					<span className="text-sm truncate">{highlightedProduct.title}</span>
					<span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
						{highlightedProduct.price.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})}
					</span>
				</div>
			</Link>

			{otherProducts.map((product) => {
				return (
					<Link
						key={product.id}
						href={`/products/${product.slug}`}
						className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex flex-col justify-center items-center align-middle"
					>
						<Image
							src={product.image}
							alt={product.title}
							width={300}
							height={300}
							quality={100}
							className="group-hover:scale-105 transition-transform duration-300"
						/>

						<div className="absolute bottom-10 right-2 h-12 truncate flex items-center gap-2 max-w-[180px] md:max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
							<span className="text-sm truncate">{product.title}</span>
							<span className="flex h-full items-center truncate justify-center rounded-full bg-violet-500 px-4 font-semibold text-sm">
								{product.price.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
									minimumFractionDigits: 0,
									maximumFractionDigits: 0,
								})}
							</span>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
