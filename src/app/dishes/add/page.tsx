import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function AddDish() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/api/auth/signin')
	}

	if (session.user?.role !== 'OWNER') {
		return <div>Not authorized</div>
	}

	const addDish = async (formData: FormData) => {
		'use server'
		console.log(formData)

		const seasons = formData.getAll('season')
		// convert seasons to an array of integers
		const seasonIds = seasons.map((season) => parseInt(season as string))
		console.log({ seasonIds })

		await prisma.dish.create({
			data: {
				name: formData.get('name') as string,
				seasons: {
					connect: seasonIds.map((id) => ({ id })),
				},
			},
		})

		revalidatePath(`/dishes/add`)
	}

	return (
		<div>
			<h1>Ajouter un plat</h1>

			<form action={addDish}>
				<label htmlFor="">Name</label>
				<input name="name" type="text" required />
				<fieldset>
					<legend>Seasons</legend>
					<div>
						<input type="checkbox" name="season" id="spring" value={2} />
						<label htmlFor="season">Printemps</label>
					</div>
					<div>
						<input type="checkbox" name="season" id="summer" value={3} />
						<label htmlFor="summer">Été</label>
					</div>
					<div>
						<input type="checkbox" name="season" id="fall" value={4} />
						<label htmlFor="fall">Automne</label>
					</div>
					<div>
						<input type="checkbox" name="season" id="winter" value={1} />
						<label htmlFor="winter">Hiver</label>
					</div>
				</fieldset>
				<button type="submit">Enregistrer un plat</button>
			</form>
		</div>
	)
}
