import { NextResponse } from 'next/server'

const VEGETABLES = [
	{ id: 1, name: 'Asperge', seasons: ['spring'] },
	{ id: 2, name: 'Artichaut', seasons: ['spring', 'fall'] },
	{ id: 3, name: 'Brocoli', seasons: ['spring', 'fall'] },
	{ id: 4, name: 'Carotte', seasons: ['spring', 'summer', 'fall'] },
	{ id: 5, name: 'Chou-fleur', seasons: ['spring', 'fall'] },
	{ id: 6, name: 'Épinard', seasons: ['spring', 'fall'] },
	{ id: 7, name: 'Pois', seasons: ['spring'] },
	{ id: 8, name: 'Laitue', seasons: ['spring', 'fall'] },
	{ id: 9, name: 'Radis', seasons: ['spring', 'fall'] },
	{ id: 10, name: 'Concombre', seasons: ['summer'] },
	{ id: 11, name: 'Tomate', seasons: ['summer'] },
	{ id: 12, name: 'Courgette', seasons: ['summer'] },
	{ id: 13, name: 'Poivron', seasons: ['summer'] },
	{ id: 14, name: 'Aubergine', seasons: ['summer'] },
	{ id: 15, name: 'Maïs', seasons: ['summer'] },
	{ id: 16, name: 'Haricot Vert', seasons: ['summer'] },
	{ id: 17, name: 'Patate Douce', seasons: ['fall'] },
	{ id: 18, name: 'Citrouille', seasons: ['fall'] },
	{ id: 19, name: 'Courge Musquée', seasons: ['fall'] },
	{ id: 20, name: 'Betterave', seasons: ['fall'] },
	{ id: 21, name: 'Chou de Bruxelles', seasons: ['fall', 'winter'] },
	{ id: 22, name: 'Chou', seasons: ['fall', 'winter'] },
	{ id: 23, name: 'Chou Frisé', seasons: ['fall', 'winter'] },
	{ id: 24, name: 'Poireau', seasons: ['fall', 'winter'] },
	{ id: 25, name: 'Oignon', seasons: ['fall', 'winter'] },
	{ id: 26, name: 'Pomme de Terre', seasons: ['fall', 'winter'] },
	{ id: 27, name: 'Panais', seasons: ['fall', 'winter'] },
	{ id: 28, name: 'Navet', seasons: ['fall', 'winter'] },
	{ id: 29, name: 'Courge', seasons: ['fall', 'winter'] },
	{ id: 30, name: 'Ail', seasons: ['spring', 'summer', 'fall', 'winter'] },
	{
		id: 31,
		name: 'Oignon (Vert)',
		seasons: ['spring', 'summer', 'fall', 'winter'],
	},
	{
		id: 32,
		name: 'Champignon',
		seasons: ['spring', 'summer', 'fall', 'winter'],
	},
	{ id: 33, name: 'Céleri', seasons: ['spring', 'summer', 'fall', 'winter'] },
	{ id: 34, name: 'Pâtisson', seasons: ['fall', 'winter'] },
	{ id: 35, name: 'Salsifis', seasons: ['fall', 'winter'] },
]

export async function GET() {
	return NextResponse.json(VEGETABLES)
}
