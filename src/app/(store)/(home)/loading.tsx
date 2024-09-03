import { Skeleton } from '@/components/skeleton'

export default function HomeLoading() {
	return (
		<div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-4">
			<Skeleton className="col-span-6 row-span-6 h-[760px]" />
			<Skeleton className="col-span-3 row-span-3" />
			<Skeleton className="col-span-3 row-span-3" />
		</div>
	)
}
