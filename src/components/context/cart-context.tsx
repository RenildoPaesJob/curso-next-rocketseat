'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface CartItem {
	productId: number
	quantity: number
}

interface CartContextType {
	items: CartItem[]
	addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextType)

function CartProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	function addToCart(productId: number) {
		setCartItems((state) => {
			// verfica se o produto já existe pelo o id
			const productInCart = state.some((item) => item.productId === productId)

			if (productInCart) {
				// se o produto já existir no carrinho
				return state.map((item) => {
					if (item.productId === productId) {
						return { ...item, quantity: item.quantity + 1 }
					} else {
						return item
					}
				})
			} else {
				// se o produto não existir no carrinho
				return [...state, { productId, quantity: 1 }]
			}
		})
	}

	return (
		<CartContext.Provider value={{ items: cartItems, addToCart }}>
			{children}
		</CartContext.Provider>
	)
}

export default CartProvider

export const useCart = () => useContext(CartContext)
