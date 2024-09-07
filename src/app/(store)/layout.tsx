import CartProvider from '@/components/context/cart-context'
import { Header } from '@/components/hearder'
import type { ReactNode } from 'react'

export default function StoreLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<CartProvider>
			<div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 p-8">
				<Header />
				{children}
			</div>
		</CartProvider>
	)
}
