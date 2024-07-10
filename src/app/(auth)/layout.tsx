import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<h1>Painel auth</h1>
			<div>{children}</div>
		</div>
	)
}
