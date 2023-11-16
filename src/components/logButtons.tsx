'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

export function SignInButton() {
	const { data: session, status } = useSession()
	console.log(session, status)

	if (status === 'loading') {
		return <>...</>
	}

	if (status === 'authenticated') {
		return (
			<></>
			// <Link href={`/dashboard`}>
			// 	<Image
			// 		src={session.user?.image ?? '/default-avatar.png'}
			// 		width={32}
			// 		height={32}
			// 		alt="Your Name"
			// 	/>
			// </Link>
		)
	}

	return <Button onClick={() => signIn()}>Sign in</Button>
}

export function SignOutButton() {
	return <Button onClick={() => signOut()}>Sign out</Button>
}
