interface ProductProps {
	params: {
		id: string
	}
}

export default function Product(props: ProductProps) {
	return <h1>Page Product: {props.params.id}</h1>
}
