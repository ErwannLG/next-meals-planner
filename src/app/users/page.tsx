import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Users() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/api/auth/signin')
	}

	if (session.user?.role !== 'OWNER') {
		return <div>Not authorized</div>
	}

	const users = await prisma.user.findMany()

	return (
		<div>
			{users.map((user) => {
				return (
					<div key={user.id}>
						<Link href={`/users/${user.id}`}>{user.name}</Link>
					</div>
				)
			})}
		</div>
	)
}
