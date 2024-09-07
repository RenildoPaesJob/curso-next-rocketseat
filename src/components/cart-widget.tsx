'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from './context/cart-context'

function CartWidget() {
	const { items } = useCart()

	return (
		<div className="flex items-center gap-2 cursor-pointer">
			<ShoppingBag />

			<span className="text-sm">Sacola ({items.length})</span>
		</div>
	)
}

export default CartWidget
