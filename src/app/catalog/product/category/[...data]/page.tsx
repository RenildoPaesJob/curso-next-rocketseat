interface CategoryProps {
	params: {
		data: string[]
	}
}

export default function Category({ params }: CategoryProps) {
	const [productId, size, color] = params.data

	return (
		<div>
			<p>Product: {productId}</p>
			<p>Size: {size}</p>
			<p>Color: {color}</p>
		</div>
	)
}
