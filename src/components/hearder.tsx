import Image from 'next/image'
import Link from 'next/link'
import CartWidget from './cart-widget'
import { SearchForm } from './search-form'

export function Header() {
	return (
		<div className="flex items-center justify-between">
			{/* Search */}
			<div className="flex items-center gap-5">
				<Link
					href="/"
					className="text-2xl font-extrabold text-white cursor-pointer"
				>
					DevStore
				</Link>

				<SearchForm />
			</div>

			{/* Cart */}
			<div className="flex items-center gap-4">
				<CartWidget />

				<div className="w-px h-4 bg-zinc-700" />

				<Link href="/" className="flex items-center gap-2 hover:underline">
					<span className="text-sm">Conta</span>

					<Image
						src="https://github.com/RenildoPaesJob.png"
						className="rounded-full h-6 w-6"
						alt="Avatar user"
						width={24}
						height={24}
					/>
				</Link>
			</div>
		</div>
	)
}
