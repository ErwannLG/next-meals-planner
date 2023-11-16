import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function AddMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex h-10 rounded-md border px-1">
					<Plus className="self-center" />
					<ChevronDown className="self-center" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Ajouter</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href="/dishes/add">Un plat</Link>
				</DropdownMenuItem>
				<DropdownMenuItem disabled>Un légume</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
