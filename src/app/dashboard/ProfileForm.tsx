'use client'

export function ProfileForm({ user }: any) {
	const updateUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const body = {
			name: formData.get('name'),
			age: formData.get('age'),
			image: formData.get('image'),
		}

		const res = await fetch('/api/user', {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		})

		await res.json()
	}

	return (
		<div>
			<h2>Modifier Mon Profil</h2>
			<form onSubmit={updateUser}>
				<label htmlFor="name">Nom</label>
				<input
					type="text"
					name="name"
					id="name"
					defaultValue={user?.name ?? ''}
				/>
				<label htmlFor="age">Age</label>
				<input type="text" name="age" id="age" defaultValue={user?.age ?? 0} />
				<label htmlFor="image">URL de l'image de profil</label>
				<input
					type="text"
					name="image"
					id="image"
					defaultValue={user?.image ?? ''}
				/>

				<button type="submit">Enregistrer</button>
			</form>
		</div>
	)
}
