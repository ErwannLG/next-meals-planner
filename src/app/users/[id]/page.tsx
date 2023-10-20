import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface Props {
	params: {
		id: string
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const user = await prisma.user.findUnique({ where: { id: params.id } })
	return { title: `User profile of ${user?.name}` }
}

export default async function UserProfile({ params }: Props) {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/api/auth/signin')
	}

	if (session.user?.role !== 'OWNER') {
		return <div>Not authorized</div>
	}

	const user = await prisma.user.findUnique({ where: { id: params.id } })
	const { name, bio, image } = user ?? {}

	return (
		<div>
			<h1>{name}</h1>

			<img
				width={300}
				src={image ?? './default-avatar.png'}
				alt={`${name}'s avatar`}
			/>

			<h3>Bio</h3>
			<p>{bio}</p>
		</div>
	)
}
