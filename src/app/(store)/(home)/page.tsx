import Image from "next/image"
import Link from "next/link"

export default async function Home() {
	return (
		<div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-4">
			<Link href="/" className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex flex-col justify-center items-center align-middle">
				<Image
					src="/moletom-ai-side.png"
					alt="moletom ai side"
					width={750}
					height={750}
					quality={100}
					className="group-hover:scale-105 transition-transform duration-300 relative"
				/>

				<div className="absolute bottom-16 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
					<span className="text-sm truncate">Moletom AI Side</span>
					<span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">R$ 129</span>
				</div>
			</Link>

			<Link href="/" className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex flex-col justify-center items-center align-middle">
				<Image
					src="/moletom-ia-p-devs.png"
					alt="moletom ai side"
					width={300}
					height={300}
					quality={100}
					className="group-hover:scale-105 transition-transform duration-300"
				/>

				<div className="absolute bottom-10 right-2 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
					<span className="text-sm truncate">Moletom AI Side</span>
					<span className="flex h-full items-center truncate justify-center rounded-full bg-violet-500 px-4 font-semibold text-sm">R$ 129</span>
				</div>
			</Link>

			<Link href="/" className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex flex-col justify-center items-center align-middle">
				<Image
					src="/moletom-java.png"
					alt="moletom ai side"
					width={300}
					height={300}
					quality={100}
					className="group-hover:scale-105 transition-transform duration-300"
				/>

				<div className="absolute bottom-10 right-2 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
					<span className="text-sm truncate">Moletom AI Side</span>
					<span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">R$ 129</span>
				</div>
			</Link>
		</div>
	)
}