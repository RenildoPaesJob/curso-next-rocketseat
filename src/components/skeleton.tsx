import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// essa props significa que este componente recebe todas apropriedade que um 'div' receberia
// porém para isto acontecer da melhor forma é necessário que instale o 'tailwind-merge'
// feito isso é possível acessar pela a propriedade className
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={twMerge('bg-zinc-50/10 animate-pulse rounded-md', className)}
			{...props}
		/>
	)
}
