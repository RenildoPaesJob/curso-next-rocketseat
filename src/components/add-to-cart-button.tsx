'use client'

import { useCart } from './context/cart-context'
import { Button } from './ui/button'

export interface AddToCartButtoPrps {
	productId: number
}

function AddToCartButton({ productId }: AddToCartButtoPrps) {
	const { addToCart } = useCart()

	const handleAddProductToCart = () => {
		addToCart(productId)
	}

	return (
		<Button
			onClick={handleAddProductToCart}
			className="mt-8 flex h-12 items-center justify-center bg-emerald-600 rounded-full font-semibold"
		>
			Adicionar ao carrinho
		</Button>
	)
}

export default AddToCartButton
