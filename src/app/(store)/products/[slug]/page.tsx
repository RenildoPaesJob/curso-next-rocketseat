import { api } from '@/app/data/api'
import type { Product } from '@/app/data/types/product'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import type { Metadata } from 'next'
import Image from 'next/image'

interface ProductProps {
	params: {
		slug: string
	}
}

// repare que esta função	esta sendo chamada 2 vezes, porém através do conceito de MEMOIZAÇÃO
// o react com o server components identifica que as 2 request esta mesma pagina,
// ele evita que a chamada seja duplicada. (DEDUPLICAR)
async function getProduct(slug: string): Promise<Product> {
	const response = await api(`/products/${slug}`, {
		next: {
			revalidate: 60 * 60, // após 1hour essa requesição será refeita.
		},
	})

	const products = await response.json()

	return products
}

// esta function depende do Metadata configurado no layout
export async function generateMetadata({
	params,
}: ProductProps): Promise<Metadata> {
	const product = await getProduct(params.slug)

	return {
		title: product.title,
	}
}

// Uma função que gera estaticamente um página cacheada no momento da build,
// uma problema: somente faça o build com o servidor rodando
// para funcionar é indispensavel que NOME da função nao seja "generateStaticParams",
// se for diferente é possível que não funcione.
// dica: NAO use em todos os componentes da application
export async function generateStaticParams() {
	// A melhor formar de usar este recurso e quando, existe a página mais acessadaa ou umprodo.
	const response = await api('/products/featured')
	const products: Product[] = await response.json()

	return products.map((product) => {
		return {
			slug: product.slug,
		}
	})
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
						Em 12x s/ juros de{' '}
						{(product.price / 12).toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
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
