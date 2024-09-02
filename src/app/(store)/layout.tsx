import { Header } from "@/components/hearder"
import type { ReactNode } from "react"

export default function StoreLayout({children} : Readonly<{children: ReactNode}>){
	return (
		<div>
			<Header />
			{children}
		</div>
	)
}